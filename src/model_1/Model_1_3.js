import React, { Component } from 'react'
import * as THREE from 'three'

export default class Model extends Component {

    componentDidMount() {
        this.initModel()
    }

    initModel() {
        let scene = new THREE.Scene()

        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)

        let webGLRenderer = new THREE.WebGLRenderer()
        webGLRenderer.setClearColor(new THREE.Color(0xEEEEEe))
        webGLRenderer.setSize(window.innerWidth, window.innerHeight)
        webGLRenderer.shadowMap.enabled = true//告诉渲染器 生成阴影

        let planGeomerty = new THREE.PlaneGeometry(60, 20)
        let planMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
        let plan = new THREE.Mesh(planGeomerty, planMaterial)
        plan.rotation.x = -0.5 * Math.PI
        plan.position.set(15, 0, 0)
        plan.receiveShadow = true//告诉平面 接受阴影
        scene.add(plan)

        let cubeGeomerty = new THREE.BoxGeometry(4, 4, 4)
        let cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 })
        let cube = new THREE.Mesh(cubeGeomerty, cubeMaterial)
        cube.position.set(-4, 3, 0)
        cube.castShadow = true//告诉物体需要投影
        scene.add(cube)


        camera.position.set(-30, 40, 30)
        camera.lookAt(0, 0, 0)

        let spotLight = new THREE.PointLight(0xffffff)
        spotLight.position.set(-50, 60, -10)
        spotLight.castShadow = true//告诉灯光 需要阴影
        scene.add(spotLight)

        document.getElementById("web-gl").appendChild(webGLRenderer.domElement)
        webGLRenderer.render(scene, camera)
    }

    render() {
        return (
            <div id="web-gl"></div>
        )
    }
}