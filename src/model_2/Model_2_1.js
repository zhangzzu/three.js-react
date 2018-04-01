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

        let webGLRenderer = new THREE.WebGLRenderer()
        webGLRenderer.setClearColor(new THREE.Color(0xffffff))
        webGLRenderer.setSize(window.innerWidth, window.innerHeight)
        webGLRenderer.shadowMap.enabled = true

        let planeGeometry = new THREE.PlaneGeometry(60, 40)
        let planeMaterial = new THREE.MeshPhysicalMaterial({ color: 0xeeeeee })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.position.set(10, 0, 0)
        plane.rotation.x = -0.5 * Math.PI
        plane.receiveShadow = true
        scene.add(plane)


        let light = new THREE.PointLight({ color: 0xffffff })
        light.position.set(-40, 30, -10)
        light.castShadow = true
        scene.add(light)

        camera.position.set(-30, 40, 30)
        camera.lookAt(scene.position)


        let controls = {
            rotationSpeed: 0.02,
            numberOfObjects: scene.children.length,
            addCube: function () {
                let cubeSize = Math.ceil(Math.random() * 3)
                let cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
                let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff * Math.random() })
                let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
                cube.castShadow = true
                cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
                cube.position.y = Math.round((Math.random() * 5));
                cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));
                scene.add(cube)

                this.numberOfObjects = scene.children.length
            },

            removeCube: function () {
                let allchildren = scene.children
                let lastchildren = allchildren[scene.children.length - 1]
                if (lastchildren instanceof THREE.Mesh) {
                    scene.remove(lastchildren)
                    this.numberOfObjects = scene.children.length
                }
            }
        }

        let gui = new dat.GUI()
        gui.add(controls, 'rotationSpeed', 0, 0.5)
        gui.add(controls, 'addCube');
        gui.add(controls, 'removeCube');
        gui.add(controls, 'numberOfObjects').listen();

        document.getElementById('web-gl').appendChild(webGLRenderer.domElement)

        function renderScene() {
            scene.traverse((e) => {
                if (e instanceof THREE.Mesh && e !== plane) {
                    e.rotation.x += controls.rotationSpeed
                    e.rotation.y += controls.rotationSpeed
                    e.rotation.z += controls.rotationSpeed
                }
            })
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