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

        //加入雾化效果呢
        scene.fog = new THREE.Fog(0xffffff, 0.015, 100)

        //Geometry(几何[dʒiˈɒmətri])
        let planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
        //Material(素材[məˈtɪəriəl])
        let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.receiveShadow = true
        plane.position.set(15, 0, 0)
        plane.rotation.x = -0.5 * Math.PI
        scene.add(plane)

        let controls = {
            cubeRotationSpeed: 0.02,
            numOfObjects: scene.children.length,
            addCube: function () {
                //ceil取整
                let cubeSize = Math.ceil(Math.random() * 3)
                let cubeGeomotry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
                let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff * Math.random() })
                let cube = new THREE.Mesh(cubeGeomotry, cubeMaterial)
                cube.castShadow = true
                cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
                cube.position.y = Math.round((Math.random() * 5));
                cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));
                scene.add(cube)

                this.numOfObjects = scene.children.length
            },
            removeCube: function () {
                let last = scene.children[scene.children.length - 1]
                if (last instanceof THREE.Mesh) {
                    scene.remove(last)
                    this.numOfObjects = scene.children.length
                }
            }
        }

        let gui = new dat.GUI()
        gui.add(controls, "cubeRotationSpeed", 0, 0.5)
        gui.add(controls, "addCube")
        gui.add(controls, "removeCube")
        gui.add(controls, "numOfObjects").listen()

        let light = new THREE.PointLight({ color: 0xffffff })
        light.position.set(-40, 50, -10)
        light.castShadow = true
        scene.add(light)

        camera.position.set(-30, 40, 30)
        camera.lookAt(scene.position)


        document.getElementById("web-gl").appendChild(webglRenderer.domElement)

        function renderScene() {
            scene.traverse((e) => {
                if (e instanceof THREE.Mesh && e != plane) {
                    e.rotation.x += controls.cubeRotationSpeed
                    e.rotation.y += controls.cubeRotationSpeed
                    e.rotation.z += controls.cubeRotationSpeed
                }
            })
            requestAnimationFrame(renderScene)

            webglRenderer.render(scene, camera)
        }

        renderScene()
    }

    render() {
        return (
            <div id="web-gl"></div>
        )
    }
}