import React, { Component } from 'react'
import * as THREE from 'three'
import dat from 'dat.gui'

export default class Model extends Component {

    componentDidMount() {
        this.initMode()
    }

    initMode() {
        let scene = new THREE.Scene()
        scene.overrideMaterial = new THREE.MeshDepthMaterial()

        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 130)

        let webglRenderer = new THREE.WebGLRenderer({ antialias: true })
        webglRenderer.setClearColor(new THREE.Color(0x000000))
        webglRenderer.setSize(window.innerWidth, window.innerHeight)
        webglRenderer.shadowMap.enabled = true

        camera.position.set(-50, 40, 50)
        camera.lookAt(scene.position)

        let spotLight = new THREE.SpotLight({ colro: 0xffffff })
        spotLight.position.set(10, 10, 10)
        scene.add(spotLight)

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
                //添加场景的纵深效果
                let cubeMaterial = new THREE.MeshDepthMaterial()
                let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
                cube.castShadow = true
                cube.position.x = -60 + Math.round((Math.random() * 100))
                cube.position.y = Math.round((Math.random() * 10))
                cube.position.z = -100 + Math.round((Math.random() * 150))
                scene.add(cube)
            }
        }

        let gui = new dat.GUI()
        gui.add(controls, "cameraNear", 0, 50).onChange((e) => {
            camera.near = e
            camera.updateProjectionMatrix()
        })
        gui.add(controls, "cameraFar", 50, 5000).onChange((e) => {
            camera.far = e
            camera.updateProjectionMatrix()
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
    }

    render() {
        return (
            <div id='web-gl'></div>
        )
    }
}