import React, { Component } from 'react'
import * as THREE from 'three'

export default class Model extends Component {

    componentDidMount() {
        this.initModel()
    }

    initModel() {
        let scene = new THREE.Scene()

        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)

        let webGLrenderer = new THREE.WebGLRenderer()
        webGLrenderer.setClearColor(new THREE.Color(0xffffff))
        webGLrenderer.setSize(window.innerWidth, window.innerHeight)
        webGLrenderer.shadowMap.enabled = true

        let axes = new THREE.AxesHelper(20)
        scene.add(axes)

        let planeGeometry = new THREE.PlaneGeometry(60, 30, 1, 1)
        let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.receiveShadow = true
        plane.rotation.x = -0.5 * Math.PI
        plane.position.set(15, 0, 0)
        scene.add(plane)


        let cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
        let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.position.set(-10, 10, 0)
        cube.castShadow = true
        scene.add(cube)

        let light = new THREE.PointLight({ color: 0xffffff })
        light.position.set(-40, 30, -10)
        light.castShadow = true
        scene.add(light)

        camera.position.set(-30, 40, 30)
        camera.lookAt(0, 0, 0)

        document.getElementById("web-gl").appendChild(webGLrenderer.domElement)

        function renderScene() {
            cube.rotation.x += 0.02
            cube.rotation.y += 0.02
            //cube.rotation.z += 0.02

            requestAnimationFrame(renderScene)
            
            /*window.requestAnimationFrame() 
            将告知浏览器你马上要开始动画效果了，后者需要在下次动画前调用相应方法来更新画面。
            这个方法就是传递给window.requestAnimationFrame()的回调函数。
            也可这个方法原理其实也就跟setTimeout/setInterval差不多，通过递归调用同一方法来不断更新画面以达到动起来的效果，
            但它优于setTimeout/setInterval的地方在于它是由浏览器专门为动画提供的API，
            在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销。 */
            webGLrenderer.render(scene, camera)
        }

        renderScene()

    }

    render() {
        return (
            <div id="web-gl"></div>
        )
    }
}