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
        camera.position.set(120, 60, 180)
        camera.lookAt(scene.position)

        let webglRender = new THREE.WebGLRenderer()
        webglRender.setClearColor(new THREE.Color(0xffffff))
        webglRender.setSize(window.innerWidth, window.innerHeight)
        webglRender.shadowMap.enabled = true

        let planeGeometry = new THREE.PlaneGeometry(180, 180)
        let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.receiveShadow = true
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(0, 0, 0)
        scene.add(plane)

        let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);

        for (let j = 0; j < (planeGeometry.parameters.height / 5); j++) {
            for (let i = 0; i < planeGeometry.parameters.width / 5; i++) {
                let rnd = Math.random() * 0.75 + 0.25;
                let cubeMaterial = new THREE.MeshLambertMaterial();
                cubeMaterial.color = new THREE.Color(rnd, 0, 0);
                let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

                cube.position.z = -((planeGeometry.parameters.height) / 2) + 2 + (j * 5);
                cube.position.x = -((planeGeometry.parameters.width) / 2) + 2 + (i * 5);
                cube.position.y = 2;

                scene.add(cube);
            }
        }

        let light = new THREE.DirectionalLight(0xffffff, 0.7)
        light.position.set(-20, 40, 60);
        scene.add(light)

        let ambientLight = new THREE.AmbientLight(0x292929);
        scene.add(ambientLight);

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

        gui.add(controls, 'switchCamera');
        gui.add(controls, 'perspective').listen();

        document.getElementById("web-gl").appendChild(webglRender.domElement)

        function renderScene() {
            requestAnimationFrame(renderScene)
            webglRender.render(scene, camera)
        }

        renderScene()
    }

    render() {
        return (
            <div id='web-gl'></div>
        )
    }
}