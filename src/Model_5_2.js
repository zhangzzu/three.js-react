import React, { Component } from 'react'
import * as THREE from 'three'

export default class Model extends Component {

    componentDidMount(props) {
        super(props)
    }

    initModel() {
        let scene = new THREE.Scene()
        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)

        let webGLRenderer = new THREE.WebGLRenderer()
        webGLRenderer.setClearColor(new THREE.Color(0xeeeeee))
        webGLRenderer.setSize(window.innerWidth, window.innerHeight)

        camera.position.set(-20, 30, 40)
        camera.lookAt(new THREE.Vector3(10, 0, 0))
    }

    render() {
        return (
            <div></div>
        )
    }
}