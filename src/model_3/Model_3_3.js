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

        let webglRenderer = new THREE.WebGLRenderer({ antialias: true })
        //webglRenderer.setClearColor(new THREE.Color(0xffffff))
        webglRenderer.setSize(window.innerWidth, window.innerHeight)
        webglRenderer.shadowMap.enabled = true
        webglRenderer.shadowMap.type = THREE.PCFShadowMap

        let ax = new THREE.AxesHelper(10)
        scene.add(ax)

        let planeGeometry = new THREE.PlaneGeometry(60, 40)
        let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.receiveShadow = true
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(0, 0, 0)
        scene.add(plane)

        let cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
        let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff00ee })
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.position.set(-15, 5, 0)
        cube.castShadow = true
        scene.add(cube)

        let sphereGeometry = new THREE.SphereGeometry(4, 20, 20)
        let sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.position.set(15, 5, 0)
        sphere.castShadow = true
        scene.add(sphere)

        let light = new THREE.SpotLight(0xffffff)
        light.position.set(0, 30, 10)
        light.castShadow = true
        light.shadowCameraNear = 2
        light.shadowCameraFar = 200
        light.shadowCameraFov = 30
        light.target = plane//照射目标
        light.distance = 0//光锥的长度
        //light.angle = 0.4//射出的光锥的宽度
        scene.add(light)

        let debuge = new THREE.CameraHelper(light.shadow.camera)
        scene.add(debuge)

        let controls = {
            target: "Plane",
            angle: Math.PI / 3,
            distance: 0
        }

        gui.add(controls, "target", ['Plane', 'Sphere', 'Cube']).onChange((e) => {
            switch (e) {
                case "Plane":
                    light.target = plane
                    break;
                case "Sphere":
                    light.target = sphere
                    break;
                case "Cube":
                    light.target = cube
                    break;
            }
        })


        gui.add(controls, 'angle', 0, Math.PI * 2).onChange(function (e) {
            light.angle = e;
        })

        gui.add(controls, 'distance', 0, 200).onChange(function (e) {
            light.distance = e;
        })

        camera.position.set(0, 40, 100)
        camera.lookAt(0, 0, 0)

        document.getElementById("web-gl").appendChild(webglRenderer.domElement)

        renderScene()

        function renderScene() {

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