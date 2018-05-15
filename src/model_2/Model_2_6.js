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

        let webglRender = new THREE.WebGLRenderer()
        webglRender.setClearColor(new THREE.Color(0xffffff))
        webglRender.setSize(window.innerWidth, window.innerHeight)
        webglRender.shadowMap.enabled = true

        let planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
        let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.receiveShadow = true
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(0, 0, 0)
        scene.add(plane)

        let material = new THREE.MeshLambertMaterial({ color: 0x44ff44 })
        let gome = new THREE.BoxGeometry(5, 8, 3)
        let cube = new THREE.Mesh(gome, material)
        cube.position.y = 4
        cube.castShadow = true
        scene.add(cube)

        camera.position.set(-30, 40, 30)
        camera.lookAt(0, 0, 0)

        let ambienLight = new THREE.AmbientLight(0x0c0c0c)
        scene.add(ambienLight)

        let light = new THREE.SpotLight({ color: 0xffffff })
        light.position.set(-40, 60, 20)
        light.castShadow = true
        scene.add(light)

        let controls = {
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,

            positionX: 0,
            positionY: 4,
            positionZ: 0,

            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            scale: 1,

            translateX: 0,
            translateY: 0,
            translateZ: 0,

            visible: true,

            //平移
            translate: function () {
                cube.translateX(controls.translateX);
                cube.translateY(controls.translateY);
                cube.translateZ(controls.translateZ);

                controls.positionX = cube.position.x;
                controls.positionY = cube.position.y;
                controls.positionZ = cube.position.z;
            }
        }

        let guiScale = gui.addFolder('scale')
        guiScale.add(controls, 'scaleX', 0, 5)
        guiScale.add(controls, 'scaleY', 0, 5)
        guiScale.add(controls, 'scaleZ', 0, 5)

        let guiPosition = gui.addFolder('position')
        let contX = guiPosition.add(controls, 'positionX', -10, 10)
        let contY = guiPosition.add(controls, 'positionY', -4, 20)
        let contZ = guiPosition.add(controls, 'positionZ', -10, 10)

        contX.listen()
        contX.onChange((vlaue) => {
            cube.position.x = controls.positionX
        })

        contY.listen()
        contY.onChange((vlaue) => {
            cube.position.y = controls.positionY
        })

        contZ.listen()
        contZ.onChange((vlaue) => {
            cube.position.z = controls.positionZ
        })

        let guiRotation = gui.addFolder('rotation')
        guiRotation.add(controls, 'rotationX', -4, 4)
        guiRotation.add(controls, 'rotationY', -4, 4)
        guiRotation.add(controls, 'rotationZ', -4, 4)

        gui.add(controls, 'visible')

        document.getElementById("web-gl").appendChild(webglRender.domElement)

        function renderScene() {

            cube.visible = controls.visible

            cube.rotation.x = controls.rotationX
            cube.rotation.y = controls.rotationY
            cube.rotation.z = controls.rotationZ

            //物体比例  沿坐标轴按比例缩放
            cube.scale.set(controls.scaleX, controls.scaleY, controls.scaleZ)

            requestAnimationFrame(renderScene)
            webglRender.render(scene, camera)
        }

        renderScene()
    }

    render() {
        return (
            <div id="web-gl"></div>
        )
    }
}
