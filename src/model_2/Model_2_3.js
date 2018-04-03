
import React, { Component } from 'react'
import * as THREE from 'three'
import dat from 'dat.gui'

export default class Model extends Component {


    componentDidMount() {
        this.initModel()
    }

    initModel() {
        let scene = new THREE.Scene()
        //覆盖所有材质
        scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee })

        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)

        let webglRenderer = new THREE.WebGLRenderer()
        webglRenderer.setClearColor(new THREE.Color(0xffffff))
        webglRenderer.setSize(window.innerWidth, window.innerHeight)
        webglRenderer.shadowMap.enabled = true

        let planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
        let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.receiveShadow = true
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(15, 0, 0)
        scene.add(plane)

        let controls = {
            rotationSpeed: 0.02,
            numOfObjects: scene.children.length,
            addCube: function () {
                let size = Math.ceil(Math.random() * 3)
                let cubeGeometry = new THREE.BoxGeometry(size, size, size)
                let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
                let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
                cube.castShadow = true
                cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
                cube.position.y = Math.round((Math.random() * 5));
                cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));
                scene.add(cube)
                this.numOfObjects = scene.children.length
            },
            removeCube: function () {
                let last = scene.children[scene.children.length - 1]
                if (last instanceof THREE.Mesh) {
                    scene.remove(last)
                    this.numOfObjects = scene.children.length
                }
            }
        }

        let gui = new dat.GUI()
        gui.add(controls, "rotationSpeed", 0, 0.5)
        gui.add(controls, "addCube")
        gui.add(controls, "removeCube")
        gui.add(controls, "numOfObjects").listen()

        camera.position.set(-30, 40, 30)
        camera.lookAt(scene.position)

        let light = new THREE.PointLight({ color: 0xffffff })
        light.castShadow = true
        light.position.set(-30, 60, -20)
        scene.add(light)

        document.getElementById("web-gl").appendChild(webglRenderer.domElement)

        function renderScene() {
            scene.traverse((e) => {
                if (e instanceof THREE.Mesh && e != plane) {
                    e.rotation.x += controls.rotationSpeed
                    e.rotation.y += controls.rotationSpeed
                    e.rotation.z += controls.rotationSpeed
                }
            })

            requestAnimationFrame(renderScene)

            webglRenderer.render(scene, camera)
        }

        renderScene()
    }

    render() {
        return (
            <div id="web-gl"></div>
        )
    }
}
