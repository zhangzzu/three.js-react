import React, { Component } from 'react'
import * as THREE from 'three'
import dat from 'dat.gui'

let gui

export default class Model extends Component {

    componentDidMount() {
        gui = new dat.GUI()
        this.initModel()
    }

    componentWillUnmount() {
        gui.destroy()
    }

    initModel() {
        let scene = new THREE.Scene()

        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)

        let webGLRenderer = new THREE.WebGLRenderer()
        webGLRenderer.setClearColor(new THREE.Color(0xfffffff))
        webGLRenderer.setSize(window.innerWidth, window.innerHeight)
        webGLRenderer.shadowMap.enabled = true

        let axes = new THREE.AxesHelper(20)
        scene.add(axes)

        let planeGeometry = new THREE.PlaneGeometry(60, 30)
        let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.receiveShadow = true
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(10, 0, 0)
        scene.add(plane)

        let cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
        let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.position.set(-10, 5, 2)
        cube.castShadow = true
        scene.add(cube)


        camera.position.set(-30, 40, 30)
        camera.lookAt(scene.position)

        let light = new THREE.PointLight({ color: 0xffffff })
        light.position.set(-40, 30, -10)
        light.castShadow = true
        scene.add(light)


        document.getElementById("web-gl").appendChild(webGLRenderer.domElement)


        let controls = {
            rotationSpeed: 0.02,
            author: 'zhangzzu'
        }

        gui.add(controls, 'rotationSpeed', 0, 0.5)
        gui.add(controls, 'author', true)

        function renderScene() {
            cube.rotation.x += controls.rotationSpeed
            cube.rotation.y += controls.rotationSpeed
            cube.rotation.z += controls.rotationSpeed

            requestAnimationFrame(renderScene)

            webGLRenderer.render(scene, camera)
        }

        renderScene()
    }

    render() {
        return (
            <div id='web-gl'></div>
        )
    }
}