import React, { Component } from 'react'
import * as THREE from 'three'
import dat from 'dat.gui'

export default class Model extends Component {

    componentDidMount() {
        this.initModel()
    }

    initModel() {
        let scene = new THREE.Scene()

        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)

        let webglRenderer = new THREE.WebGLRenderer()
        webglRenderer.setClearColor(new THREE.Color(0xffffff))
        webglRenderer.setSize(window.innerWidth, window.innerHeight)
        webglRenderer.shadowMap.enabled = true

        let planeGeometry = new THREE.PlaneGeometry(100, 100)
        let planeMaterial = new THREE.MeshBasicMaterial({ color: 0xeeeeee })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.rotation.x = -Math.PI / 2
        plane.position.y = -20
        scene.add(plane)

        let baseMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff, wireframe: true })

        let cubeGeometry = new THREE.BoxGeometry(15, 15, 15)
        let sphereGeometry = new THREE.SphereGeometry(14, 20, 20)
        let platGeometry = new THREE.PlaneGeometry(14, 14)

        let cube = new THREE.Mesh(cubeGeometry, baseMaterial)
        let sphere = new THREE.Mesh(sphereGeometry, baseMaterial)
        let plat = new THREE.Mesh(platGeometry, baseMaterial)

        cube.position.set(0, 3, 2)
        sphere.position.copy(cube.position)
        plat.position.copy(cube.position)

        scene.add(cube)

        camera.position.set(-20, 50, 40)
        camera.lookAt(10, 0, 0)

        let ambientLight = new THREE.AmbientLight(0x0c0c0c)
        scene.add(ambientLight)

        let spotLight = new THREE.SpotLight(0xffffff)
        spotLight.position.set(-40, 60, -10)
        scene.add(spotLight)

        let gui = new dat.GUI()

        let controls = {
            selectedMesh: "cube"
        }

        gui.add(controls, 'selectedMesh', ["cube", "sphere", "plat"]).onChange(function (e) {

            scene.remove(plat);
            scene.remove(cube);
            scene.remove(sphere);

            switch (e) {
                case "cube":
                    scene.add(cube);
                    break;
                case "sphere":
                    scene.add(sphere);
                    break;
                case "plat":
                    scene.add(plat);
                    break;

            }

            scene.add(e);
        })

        document.getElementById("web-gl").appendChild(webglRenderer.domElement)

        let step = 0
        function renderScene() {

            step += 0.01
            cube.rotation.y = step
            sphere.rotation.y = step
            plat.rotation.y = step

            requestAnimationFrame(renderScene)
            webglRenderer.render(scene, camera)
        }

        renderScene()
    }

    render() {
        return (
            <div id='web-gl'></div>
        )
    }
}