import React, { Component } from 'react'
import * as THREE from 'three'
import dat from 'dat.gui'

export default class Model extends Component {

    componentDidMount() {
        this.initModel()
    }

    initModel() {
        let scene = new THREE.Scene()

        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10000)
        camera.position.set(-20, 30, 40)
        camera.lookAt(10, 0, 0)

        let webglRenderer = new THREE.WebGLRenderer({ antialias: true })
        webglRenderer.setClearColor(0xeeeeee, 1.0)
        webglRenderer.setSize(window.innerWidth, window.innerHeight)
        webglRenderer.shadowMap.enabled = true

        let groundGeometry = new THREE.PlaneGeometry(100, 100, 4, 4)
        let groundMaterial = new THREE.MeshBasicMaterial({ color: 0x777777 })
        let ground = new THREE.Mesh(groundGeometry, groundMaterial)
        ground.receiveShadow = true
        ground.rotation.x = -Math.PI / 2
        ground.position.y = -20
        scene.add(ground)

        let cubeGeometry = new THREE.BoxGeometry(15, 15, 15)
        //radius：半径 segmentsWidth：经度上的分段数  segmentsHeight：纬度上的分段数
        let sphereGeometry = new THREE.SphereGeometry(14, 80, 80)
        let planeGeometry = new THREE.PlaneGeometry(14, 14, 4, 4)

        //根据物体表面的法向量计算颜色 ,决定光的发射方向、在计算光照、阴影时提供信息、为物体表面上色
        //法向材质对光也是没有反应的
        let meshMaterial = new THREE.MeshNormalMaterial({ color: 0x7777ff })
        meshMaterial.shading = THREE.FlatShading
        let cube = new THREE.Mesh(cubeGeometry, meshMaterial)
        let sphere = new THREE.Mesh(sphereGeometry, meshMaterial)
        let plane = new THREE.Mesh(planeGeometry, meshMaterial)

        cube.position.set(0, 3, 2)
        sphere.position.copy(cube.position)
        plane.position.copy(cube.position)

        scene.add(cube)

        let ambientLight = new THREE.AmbientLight(0x0c0c0c)
        scene.add(ambientLight)

        let spotLight = new THREE.SpotLight(0xffffff)
        spotLight.position.set(-40, 60, -10)
        spotLight.castShadow = true
        scene.add(spotLight)

        let controls = {
            selectedMesh: 'cube',
            shading: "flat"
        }

        let gui = new dat.GUI()

        gui.add(controls, "shading", ["flat", "smooth"]).onChange(e => {
            switch (e) {
                case "flat":
                    meshMaterial.shading = THREE.FlatShading
                    break;
                case "smooth":
                    meshMaterial.shading = THREE.SmoothShading
                    break;
            }
            meshMaterial.needsUpdate = true
        })

        gui.add(controls, "selectedMesh", ["cube", "sphere", "plane"]).onChange(e => {
            scene.remove(cube)
            scene.remove(plane)
            scene.remove(sphere)
            switch (e) {
                case "cube":
                    scene.add(cube)
                    break;
                case "sphere":
                    scene.add(sphere)
                    break;
                case "plane":
                    scene.add(plane)
                    break;
            }
        })

        document.getElementById("web-gl").appendChild(webglRenderer.domElement)

        let step = 0

        renderScene()

        function renderScene() {
            step += 0.01
            cube.rotation.z = step
            cube.rotation.x = step
            sphere.rotation.y = step
            plane.rotation.z = step

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