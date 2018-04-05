import React, { Component } from 'react'
import * as THREE from 'three'
import ConvexGeometry from '../lib/ConvexGeometry'
import ParametricGeometries from '../lib/ParametricGeometries'

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

        let planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
        let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.receiveShadow = true
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(0, 0, 0)
        scene.add(plane)

        let light = new THREE.PointLight({ color: 0xffffff })
        light.position.set(-30, 40, 60)
        light.castShadow = true
        scene.add(light)

        camera.position.set(-50, 30, 20)
        camera.lookAt(-10, 0, 0)

        addGeometrys()

        document.getElementById("web-gl").appendChild(webglRenderer.domElement)

        webglRenderer.render(scene, camera)

        function addGeometrys() {
            let geoms = []

            geoms.push(new THREE.CylinderGeometry(1, 4, 4))

            geoms.push(new THREE.BoxGeometry(2, 2, 2))

            geoms.push(new THREE.SphereGeometry(2))

            geoms.push(new THREE.IcosahedronGeometry(4))

            let points = [
                new THREE.Vector3(2, 2, 2),
                new THREE.Vector3(2, 2, -2),
                new THREE.Vector3(-2, 2, -2),
                new THREE.Vector3(-2, 2, 2),
                new THREE.Vector3(2, -2, 2),
                new THREE.Vector3(2, -2, -2),
                new THREE.Vector3(-2, -2, -2),
                new THREE.Vector3(-2, -2, 2)
            ];
            geoms.push(new ConvexGeometry(points))

            let pts = []
            let detail = .1
            let radius = 3
            for (let angle = 0.0; angle < Math.PI; angle += detail) {
                pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
            }
            geoms.push(new THREE.LatheGeometry(pts, 12))

            geoms.push(new THREE.OctahedronGeometry(3))

            geoms.push(new THREE.ParametricGeometry(ParametricGeometries.mobius3d, 20, 10))

            geoms.push(new THREE.TetrahedronGeometry(3))

            geoms.push(new THREE.TorusGeometry(3, 1, 10, 10))

            geoms.push(new THREE.TorusKnotGeometry(3, 0.5, 50, 20))

            let j = 0

            for (let i = 0; i < geoms.length; i++) {
                let materials = [
                    new THREE.MeshLambertMaterial({ color: Math.random() * 0xeeeeee, shading: THREE.SmoothShading }),
                    new THREE.MeshBasicMaterial({ wireframe: true, color: 0x000000 })
                ]

                let mesh = createMultiMaterialObject(geoms[i], materials)
                mesh.traverse((e) => {
                    e.castShadow = true
                })

                mesh.position.x = -24 + ((i % 4) * 12);
                mesh.position.y = 4;
                mesh.position.z = -8 + (j * 12);

                if ((i + 1) % 4 == 0) j++;
                scene.add(mesh);
            }

        }

        function createMultiMaterialObject(geometry, materials) {

            var group = new THREE.Group();

            for (var i = 0, l = materials.length; i < l; i++) {

                group.add(new THREE.Mesh(geometry, materials[i]));

            }

            return group;

        }
    }

    render() {
        return (
            <div id="web-gl"></div>
        )
    }
}