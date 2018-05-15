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

        let webglRenderer = new THREE.WebGLRenderer()
        webglRenderer.setClearColor(new THREE.Color(0xffffff))
        webglRenderer.setSize(window.innerWidth, window.innerHeight)
        webglRenderer.shadowMap.enabled = true

        let planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
        let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(15, 0, 0)
        plane.receiveShadow = true
        scene.add(plane)

        let cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
        let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.position.set(-4, 3, 0)
        cube.castShadow = true
        scene.add(cube)

        let sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
        let sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.position.set(20, 0, 2)
        sphere.castShadow = true
        scene.add(sphere)

        let ambiColor = "#0c0c0c";
        let ambientLight = new THREE.AmbientLight(ambiColor)
        scene.add(ambientLight)

        let light = new THREE.SpotLight(0xffffff)
        light.position.set(-40, 60, -10)
        light.castShadow = true
        scene.add(light)

        camera.position.set(-25, 30, 25)
        camera.lookAt(10, 0, 0)

        document.getElementById("web-gl").appendChild(webglRenderer.domElement)

        let controls = {
            rotationSpeed: 0.02,
            bouncingSpeed: 0.03,
            ambiColor,
            disableLight: false
        }

        gui.addColor(controls, 'ambiColor').onChange((e) => {
            ambientLight.color = new THREE.Color(e)
        })

        gui.add(controls, "disableLight").onChange((e) => {
            light.visible = !e
        })

        let step = 0

        function renderScene() {
            cube.rotation.x += controls.rotationSpeed;
            cube.rotation.y += controls.rotationSpeed;
            cube.rotation.z += controls.rotationSpeed;

            // bounce the sphere up and down
            step += controls.bouncingSpeed;
            sphere.position.x = 20 + (10 * (Math.cos(step)));
            sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

            // render using requestAnimationFrame
            requestAnimationFrame(renderScene);
            webglRenderer.render(scene, camera);
        }

        renderScene()
    }

    render() {
        return (
            <div id="web-gl"></div>
        )
    }
}