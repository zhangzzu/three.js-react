import React, { Component } from 'react'
import * as THREE from 'three'
import dat from 'dat.gui'

export default class Model extends Component {

    componentDidMount() {
        this.initMode()
    }

    initMode() {
        let scene = new THREE.Scene()

        let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 500)

        let webglRenderer = new THREE.WebGLRenderer({ antialias: true })
        webglRenderer.setClearColor(0x000000, 1.0)
        webglRenderer.setPixelRatio(window.devicePixelRatio)
        webglRenderer.setSize(window.innerWidth, window.innerHeight)
        webglRenderer.shadowMap.enabled = true

        camera.position.set(-50, 40, 50)
        camera.lookAt(scene.position)

        let controls = {
            cameraNear: camera.near,
            cameraFar: camera.far,
            removeCube: () => {
                let last = scene.children[scene.children.length - 1]
                if (last instanceof THREE.Mesh) {
                    scene.remove(last)
                }
            },
            addCube: () => {
                let cubeSize = 5
                let cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
                let cubeMaterial = new THREE.MeshLambertMaterial({
                    color: '#aaffss'
                })
                let cubeDepth = new THREE.MeshDepthMaterial()
                let cube = new createMultiMaterialObject(cubeGeometry, [cubeMaterial, cubeDepth])
                cube.castShadow = true
                cube.position.x = -60 + Math.round((Math.random() * 100))
                cube.position.y = Math.round((Math.random() * 10))
                cube.position.z = -100 + Math.round((Math.random() * 150))
                scene.add(cube)
            }
        }

        let gui = new dat.GUI()
        gui.add(controls, "cameraNear", 0, 10).onChange((e) => {
            camera.near = e
        })
        gui.add(controls, "cameraFar", 50, 100).onChange((e) => {
            camera.far = e
        })
        gui.add(controls, "removeCube")
        gui.add(controls, "addCube")

        let i = 0
        while (i < 10) {
            controls.addCube()
            i++
        }

        document.getElementById("web-gl").appendChild(webglRenderer.domElement)

        renderScene()

        let step = 0.02

        function renderScene() {
            scene.traverse(e => {
                if (e instanceof THREE.Mesh) {
                    e.rotation.x += step
                    e.rotation.y += step
                    e.rotation.z += step
                }
            })
            requestAnimationFrame(renderScene)
            webglRenderer.render(scene, camera)
        }

        function createMultiMaterialObject(geometry, materials) {

            var group = new THREE.Group();

            for (var i = 0, l = materials.length; i < l; i++) {

                group.add(new THREE.Mesh(geometry, materials[i]));

            }

            return group;

        }
    }

    render() {
        return (
            <div id='web-gl'></div>
        )
    }
}