import React, { Component } from 'react'
import * as THREE from 'three'
import Stats from './lib/stats'
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

    initState() {
        let stats = new Stats()
        stats.setMode(0)

        stats.domElement.style.position = 'absolute'
        stats.domElement.style.left = '0px'
        stats.domElement.style.right = '0px'

        document.getElementById("Stats-output").appendChild(stats.domElement)

        return stats
    }

    initModel() {
        let stats = this.initState()

        let scene = new THREE.Scene()
        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)

        let webGLRenderer = new THREE.WebGLRenderer()
        webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE))
        webGLRenderer.setSize(window.innerWidth, window.innerHeight)
        webGLRenderer.shadowMap.enabled = true

        let plane = createMesh(new THREE.PlaneGeometry(10, 14, 4, 4))
        scene.add(plane)

        camera.position.x = -20
        camera.position.y = 30
        camera.position.z = 40
        camera.lookAt(new THREE.Vector3(10, 0, 0))

        let spotLight = new THREE.SpotLight(0xffffff)
        spotLight.position.set(-40, 60, -10)
        scene.add(spotLight)

        document.getElementById("web-gl").appendChild(webGLRenderer.domElement)

        let step = 0

        let controls = new function () {
            this.width = plane.children[0].geometry.parameters.width
            this.height = plane.children[0].geometry.parameters.height

            this.widthSegments = plane.children[0].geometry.parameters.widthSegments
            this.heightSegments = plane.children[0].geometry.parameters.heightSegments

            this.redraw = function () {
                scene.remove(plane)
                debugger
                plane = createMesh(new THREE.PlaneGeometry(controls.width, controls.height,
                    Math.round(controls.widthSegments), Math.round(controls.heightSegments)))
                scene.add(plane)
            }

        }

        function render() {
            stats.update()

            plane.rotation.y = step += 0.01
            requestAnimationFrame(render)
            webGLRenderer.render(scene, camera)
        }

        gui.add(controls, 'width', 0, 40).onChange(controls.redraw)
        gui.add(controls, 'height', 0, 40).onChange(controls.redraw)
        gui.add(controls, 'widthSegments', 0, 10).onChange(controls.redraw)
        gui.add(controls, 'heightSegments', 0, 10).onChange(controls.redraw)
        render()

        function createMesh(geometry) {
            debugger
            let meshMaterial = new THREE.MeshNormalMaterial()
            meshMaterial.side = THREE.DoubleSide
            let wireFrameMaterial = new THREE.MeshBasicMaterial()
            wireFrameMaterial.wireframe = true

            function mesh(geometry, materials) {

                var group = new THREE.Group()

                for (var i = 0, l = materials.length; i < l; i++) {

                    group.add(new THREE.Mesh(geometry, materials[i]))

                }

                return group

            }

            return mesh(geometry, [meshMaterial, wireFrameMaterial])
        }
    }



    render() {
        return (
            <div>
                <div id="Stats-output" />
                <div id="web-gl"></div>
            </div>

        )
    }
}