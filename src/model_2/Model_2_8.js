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
        camera.position.set(120, 60, 180)

        let webglRnderer = new THREE.WebGLRenderer()
        webglRnderer.setClearColor(new THREE.Color(0xffffff))
        webglRnderer.setSize(window.innerWidth, window.innerHeight)

        let planeGeometry = new THREE.PlaneGeometry(180, 180)
        let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(0, 0, 0)
        scene.add(plane)

        let cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
        let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0X00ee22 })
        for (let j = 0; j < (planeGeometry.parameters.height / 5); j++) {
            for (let i = 0; i < (planeGeometry.parameters.width / 5); i++) {
                let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

                cube.position.z = -((planeGeometry.parameters.height) / 2) + 2 + (j * 5);
                cube.position.x = -((planeGeometry.parameters.width) / 2) + 2 + (i * 5);
                cube.position.y = 2;

                scene.add(cube);
            }
        }

        let lookAtGeometry = new THREE.SphereGeometry(2)
        let lookAtMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
        let lookAtCamera = new THREE.Mesh(lookAtGeometry, lookAtMaterial)
        scene.add(lookAtCamera)

        let directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
        directionalLight.position.set(-20, 40, 60);
        scene.add(directionalLight);

        let controls = {
            perspective: 'Perspective',
            switchCamera: function () {
                if (camera instanceof THREE.PerspectiveCamera) {
                    //left right top bottom near far
                    camera = new THREE.OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16, -200, 500);
                    camera.position.x = 120;
                    camera.position.y = 60;
                    camera.position.z = 180;
                    camera.lookAt(scene.position);
                    this.perspective = "Orthographic";
                } else {
                    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                    camera.position.x = 120;
                    camera.position.y = 60;
                    camera.position.z = 180;
                    camera.lookAt(scene.position);
                    this.perspective = "Perspective";
                }
            }
        }

        let gui = new dat.GUI()
        gui.add(controls, 'switchCamera');
        gui.add(controls, 'perspective').listen();


        let step = 0

        function renderScene() {

            step += 0.02

            if (camera instanceof THREE.Camera) {
                let x = 10 + (100 * (Math.sin(step)))
                camera.lookAt(x, 10, 0)
                lookAtCamera.position.set(x, 10, 0)
            }

            requestAnimationFrame(renderScene)
            webglRnderer.render(scene, camera)
        }

        document.getElementById('web-gl').appendChild(webglRnderer.domElement)

        renderScene()

    }

    render() {
        return (
            <div id='web-gl'></div>
        )
    }
}