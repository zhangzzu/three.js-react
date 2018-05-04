import React, { Component } from 'react'
import * as THREE from 'three'

export default class Molde extends Component {

    componentDidMount() {
        this.initModel()
    }

    initModel() {
        let scene = new THREE.Scene()

        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)
        camera.position.set(-40, 40, 40)
        camera.lookAt(scene.position)

        let webglRnederer = new THREE.WebGLRenderer({ antialias: true })
        webglRnederer.setClearColor(0xffffff, 1.0)
        webglRnederer.setSize(window.innerWidth, window.innerHeight)

        let planeGeometry = new THREE.PlaneGeometry(60, 40, 4, 4)
        let planMaterial = new THREE.MeshBasicMaterial({ color: 0x3c3c3c })
        let plane = new THREE.Mesh(planeGeometry, planMaterial)
        plane.rotation.x = -Math.PI / 2
        plane.position.y = -5
        scene.add(plane)

        let mats = []
        mats.push(new THREE.MeshBasicMaterial({ color: 0x009e60 }))
        mats.push(new THREE.MeshBasicMaterial({ color: 0x0051ba }))
        mats.push(new THREE.MeshBasicMaterial({ color: 0xffd500 }))
        mats.push(new THREE.MeshBasicMaterial({ color: 0xff5800 }))
        mats.push(new THREE.MeshBasicMaterial({ color: 0xC41E3A }))
        mats.push(new THREE.MeshBasicMaterial({ color: 0xffffff }))

        let faceMaterial = new THREE.MeshFaceMaterial(mats)

        let group = new THREE.Mesh()

        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                for (let z = 0; z < 3; z++) {
                    let cubeGeom = new THREE.BoxGeometry(2.9, 2.9, 2.9);
                    let cube = new THREE.Mesh(cubeGeom, faceMaterial);
                    cube.position.set(x * 3 - 3, y * 3, z * 3 - 3);
                    group.add(cube);
                }
            }
        }

        scene.add(group)

        document.getElementById("web-gl").appendChild(webglRnederer.domElement)

        let step = 0

        renderScene()

        function renderScene() {
            step += 0.01

            group.rotation.y = step

            requestAnimationFrame(renderScene)

            webglRnederer.render(scene, camera)
        }
    }

    render() {
        return (
            <div id='web-gl'></div>
        )
    }
}