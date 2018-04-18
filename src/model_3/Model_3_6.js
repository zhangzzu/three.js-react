import React, { Component } from 'react'
import * as THREE from 'three'
import dat from 'dat.gui'
import img from '../image/grasslight-big.jpg'
import img0 from '../image/lensflare0.png'
import img3 from '../image/lensflare3.png'


export default class Model extends Component {

    componentDidMount() {
        this.initMode()
    }

    initMode() {

        let scene = new THREE.Scene()

        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)

        let webglRenderer = new THREE.WebGLRenderer({ antialias: true })
        webglRenderer.setClearColor(new THREE.Color(0xffffff))
        webglRenderer.setSize(window.innerWidth, window.innerHeight)
        webglRenderer.shadowMap.enabled = true
        webglRenderer.shadowMap.type = THREE.PCFShadowMap



        let textTure = THREE.ImageUtils.loadTexture(img)
        textTure.wrapS = THREE.RepeatWrapping
        textTure.wrapT = THREE.RepeatWrapping
        textTure.repeat.set(4, 4)


        let planeGeometry = new THREE.PlaneGeometry(600, 400)
        let planeMaterial = new THREE.MeshLambertMaterial({ map: textTure })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.receiveShadow = true
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(15, 0, 0)
        scene.add(plane)

        let cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
        let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff3333 })
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.castShadow = true
        cube.rotation.x = 0.2 * Math.PI
        cube.rotation.y = -0.2 * Math.PI
        cube.rotation.z = -0.2 * Math.PI
        cube.position.set(-4, 3, 0)
        scene.add(cube)

        let sphereGeometry = new THREE.SphereGeometry(4, 25, 25)
        let sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff })
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.castShadow = true
        sphere.position.set(10, 5, 10)
        scene.add(sphere)

        let spotLight = new THREE.SpotLight(0xffffff)
        spotLight.position.set(-40, 60, -10)
        spotLight.castShadow = true
        scene.add(spotLight)

        let light = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6)
        light.position.set(0, 500, 0)
        scene.add(light)

        let flare0 = THREE.ImageUtils.loadTexture(img0)
        let flare3 = THREE.ImageUtils.loadTexture(img3)

        let flareColor = new THREE.Color(0xffaacc)
        let lenFlare = new THREE.LensFlare(flare0, 350, 0.0, THREE.AdditiveBlending, flareColor)
        lenFlare.add(flare3, 60, 0.6, THREE.AdditiveBlending)
        lenFlare.add(flare3, 70, 0.7, THREE.AdditiveBlending)
        lenFlare.add(flare3, 120, 0.9, THREE.AdditiveBlending)
        lenFlare.add(flare3, 70, 1.0, THREE.AdditiveBlending)

        lenFlare.position.copy(spotLight.position)
        scene.add(lenFlare)

        let controls = {
            intensity: 0.6
        }

        let gui = new dat.GUI()

        gui.add(controls, "intensity", 0, 1).onChange((e) => {
            light.intensity = e
        })

        camera.position.set(-20, 15, 45)
        camera.lookAt(10, 0, 0)

        document.getElementById("web-gl").appendChild(webglRenderer.domElement)


        renderScene()

        function renderScene() {

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