import React, { Component } from 'react'
import * as THREE from 'three'
import dat from 'dat.gui'

export default class Model extends Component {

    componentDidMount() {
        this.initMode()
    }

    initMode() {
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

        camera.position.set(-20, 25, 20)
        camera.lookAt(5, 0, 0)

        let light = new THREE.PointLight({ color: 0xffffff })
        light.position.set(-40, 60, 10)
        light.castShadow = true
        scene.add(light)

        document.getElementById("web-gl").appendChild(webglRender.domElement)

        let vertices = [
            new THREE.Vector3(1, 3, 1),
            new THREE.Vector3(1, 3, -1),
            new THREE.Vector3(1, -1, 1),
            new THREE.Vector3(1, -1, -1),
            new THREE.Vector3(-1, 3, -1),
            new THREE.Vector3(-1, 3, 1),
            new THREE.Vector3(-1, -1, -1),
            new THREE.Vector3(-1, -1, 1)
        ]

        let faces = [
            new THREE.Face3(0, 2, 1),
            new THREE.Face3(2, 3, 1),
            new THREE.Face3(4, 6, 5),
            new THREE.Face3(6, 7, 5),
            new THREE.Face3(4, 5, 1),
            new THREE.Face3(5, 0, 1),
            new THREE.Face3(7, 6, 2),
            new THREE.Face3(6, 3, 2),
            new THREE.Face3(5, 7, 0),
            new THREE.Face3(7, 2, 0),
            new THREE.Face3(1, 3, 4),
            new THREE.Face3(3, 6, 4)
        ]

        let geom = new THREE.Geometry()
        geom.vertices = vertices
        geom.verticesNeedUpdate
        geom.faces = faces
        geom.computeFaceNormals()

        let materials = [
            new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }),
            new THREE.MeshLambertMaterial({ opacity: 0.6, color: 0x44ff44, transparent: true })
        ]

        let mesh = this.createMultiMaterialObject(geom, materials)
        mesh.children.forEach(element => {
            element.castShadow = true
        })

        scene.add(mesh)

        function addControl(x, y, z) {
            let controls = {
                x, y, z
            }
            return controls
        }

        let controlPoints = []
        controlPoints.push(addControl(3, 5, 3))
        controlPoints.push(addControl(3, 5, 0))
        controlPoints.push(addControl(3, 0, 3))
        controlPoints.push(addControl(3, 0, 0))
        controlPoints.push(addControl(0, 5, 0))
        controlPoints.push(addControl(0, 5, 3))
        controlPoints.push(addControl(0, 0, 0))
        controlPoints.push(addControl(0, 0, 3))

        let gui = new dat.GUI()
        for (let i = 0; i < 8; i++) {
            let f1 = gui.addFolder("Vertices" + (i + 1))
            f1.add(controlPoints[i], "x", -10, 10)
            f1.add(controlPoints[i], "y", -10, 10)
            f1.add(controlPoints[i], "z", -10, 10)
        }

        renderScene()

        function renderScene() {

            var vertices = [];
            for (var i = 0; i < 8; i++) {
                vertices.push(new THREE.Vector3(controlPoints[i].x, controlPoints[i].y, controlPoints[i].z))
            }

            mesh.children.forEach((e) => {
                e.geometry.vertices = vertices
                e.geometry.verticesNeedUpdate = true//底层方法改变无效
                e.geometry.computeFaceNormals()
            });

            requestAnimationFrame(renderScene)
            webglRender.render(scene, camera)
        }
    }

    createMultiMaterialObject(geometry, materials) {

        var group = new THREE.Group();

        for (var i = 0, l = materials.length; i < l; i++) {

            group.add(new THREE.Mesh(geometry, materials[i]));

        }

        return group;

    }

    render() {
        return (
            <div id='web-gl'></div>
        )
    }
}