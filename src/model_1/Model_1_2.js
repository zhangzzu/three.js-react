import React, { Component } from 'react'
import * as THREE from 'three'

export default class Model extends Component {


    componentDidMount() {
        this.iniModel()
    }

    iniModel() {
        let scene = new THREE.Scene()

        //视角，纵横比，最近，最远
        //PerspectiveCamera 透视相机(视野越大，物体显示越小)
        let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000)

        let webGLRenderer = new THREE.WebGLRenderer()
        webGLRenderer.setClearColor(new THREE.Color(0xffffff))//设置渲染器的清除色
        webGLRenderer.setSize(window.innerWidth, window.innerHeight)

        let axes = new THREE.AxesHelper(20)
        //显示坐标轴
        scene.add(axes)

        let planeGeometry = new THREE.PlaneGeometry(60, 20)
        let planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.rotation.x = -0.5 * Math.PI// 按x轴旋转
        plane.position.set(15, 0, 0)
        scene.add(plane)

        let cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
        let cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cube.position.set(-10, 3, 0)
        scene.add(cube)

        let sphereGeometry = new THREE.SphereGeometry(4, 15, 15)
        let sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff, wireframe: true })
        let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.position.set(20, 4, 2)
        scene.add(sphere)

        camera.position.set(30, 40, 30)
        //由三点形成一个面。法向量的垂直位置，及视角的观察面
        //法向量即为camera的z轴方向
        camera.lookAt(0, 0, 0)
        /*    void gluLookAt(GLdouble eyex,GLdouble eyey,GLdouble eyez,
               GLdouble centerx,GLdouble centery,GLdouble centerz,
               GLdouble upx,GLdouble upy,GLdouble upz);
           该函数定义一个视图矩阵，并与当前矩阵相乘。
           第一组eyex, eyey,eyez 相机在世界坐标的位置
           第二组centerx,centery,centerz 相机镜头对准的物体在世界坐标的位置
           第三组upx,upy,upz 相机向上的方向在世界坐标中的方向
           你把相机想象成为你自己的脑袋：
           第一组数据就是脑袋的位置
           第二组数据就是眼睛看的物体的位置
           第三组就是头顶朝向的方向（因为你可以歪着头看同一个物体）。 */

        document.getElementById("web-gl").appendChild(webGLRenderer.domElement)
        webGLRenderer.render(scene, camera)
    }

    render() {
        return (
            <body style={{ margin: 0, overflow: 'hidden' }}>
                <div id="web-gl"></div>
            </body>
        )
    }
} 