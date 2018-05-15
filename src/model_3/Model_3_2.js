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

        let planeGeometry = new THREE.PlaneGeometry(60, 40)
        let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.receiveShadow = true
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(15, 0, 0)
        scene.add(plane)

        let cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
        let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff00ee })
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.position.set(-4, 3, 0)
        cube.castShadow = true
        scene.add(cube)

        let sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
        let sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.position.set(20, 0, 2)
        sphere.castShadow = true
        scene.add(sphere)

        let pointColor = "#ccffcc"
        let pointLight = new THREE.PointLight(pointColor)
        pointLight.distance = 100
        pointLight.castShadow = true
        scene.add(pointLight)

        let lightGeometry = new THREE.SphereGeometry(0.2)
        let lightMaterial = new THREE.MeshLambertMaterial({ color: 0xac6c25, wireframe: true })
        let lightSphere = new THREE.Mesh(lightGeometry, lightMaterial)
        lightSphere.position.set(3, 0, 3)
        lightSphere.castShadow = true
        scene.add(lightSphere)

        let controls = {
            pointColor,
            distance: 100,
            intensity: 1
        }


        gui.addColor(controls, "pointColor").onChange((e) => {
            pointLight.color = new THREE.Color(e)
        })

        gui.add(controls, "distance", 1, 100).onChange((e) => {
            pointLight.distance = e
        })

        gui.add(controls, "intensity", 1, 5).onChange((e) => {
            pointLight.intensity = e
        })

        camera.position.set(-25, 30, 25)
        camera.lookAt(10, 0, 0)

        document.getElementById("web-gl").appendChild(webglRenderer.domElement)

        renderScene()

        let step = 0
        let invert = 1
        let phase = 0

        function renderScene() {

            cube.rotation.x += 0.02
            cube.rotation.y += 0.02
            cube.rotation.z += 0.02

            step += 0.02
            sphere.position.x = 20 + (10 * (Math.cos(step)))
            sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)))

            // move the light simulation
            if (phase > 2 * Math.PI) {
                invert = invert * -1
                phase -= 2 * Math.PI
            } else {
                phase += 0.02
            }
            lightSphere.position.z = +(7 * (Math.sin(phase)))
            lightSphere.position.x = +(14 * (Math.cos(phase)))
            lightSphere.position.y = 5

            if (invert < 0) {
                var pivot = 14
                lightSphere.position.x = (invert * (lightSphere.position.x - pivot)) + pivot
            }

            pointLight.position.copy(lightSphere.position)

            requestAnimationFrame(renderScene)
            webglRenderer.render(scene, camera)
        }
    }

    render() {
        return (
            <div id="web-gl"></div>
        )
    }
}