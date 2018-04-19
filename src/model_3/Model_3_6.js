import React, { Component } from 'react'
import * as THREE from 'three'
import dat from 'dat.gui'
import { Lensflare, LensflareElement } from '../lib/Lensflare'
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
        //webglRenderer.setClearColor(new THREE.Color(0xffffff))
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
        spotLight.position.set(40, 20, -40)
        spotLight.castShadow = true
        scene.add(spotLight)

        let debuge = new THREE.CameraHelper(spotLight.shadow.camera)
        scene.add(debuge)

        let textureLoader = new THREE.TextureLoader()
        let flare0 = textureLoader.load(img0)
        let flare3 = textureLoader.load(img3)

        let lensflare = new Lensflare()

        lensflare.addElement(new LensflareElement(flare0, 512, 0))
        lensflare.addElement(new LensflareElement(flare3, 512, 0))

        spotLight.add(lensflare)


        let controls = {
            intensity: 0.6,
            debuge: true,
            stopLightMove: false
        }

        let stopMove = false

        let gui = new dat.GUI()

        gui.add(controls, "intensity", 0, 1).onChange((e) => {
            spotLight.intensity = e
        })

        gui.add(controls, "debuge").onChange((e) => {
            if (e) {
                scene.add(debuge)
            } else {
                scene.remove(debuge)
            }
        })

        gui.add(controls, "stopLightMove").onChange((e) => {
            stopMove = e
        })

        camera.position.set(-20, 15, 45)
        camera.lookAt(10, 0, 0)

        document.getElementById("web-gl").appendChild(webglRenderer.domElement)


        renderScene()

        let step = 0

        function renderScene() {
            if (!stopMove) {
                step += 0.02

                spotLight.position.z = -8
                spotLight.position.y = +(27 * (Math.sin(step / 3)))
                spotLight.position.x = 10 + (26 * (Math.cos(step / 3)))
            }

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