import * as model_1 from './model_1/Model_1'
import * as model_2 from './model_2/Model_2'
import * as model_3 from './model_3/Model_3'
import * as model_4 from './model_4/Model_4'

const naviagtion1 = [{
    key: '1-2',
    name: 'model_1_2',
    path: "/",
    exact: true,
    component: model_1.Model_2
}, {
    key: '1-3',
    name: 'model_1_3',
    path: "/model_1/Model_1_3",
    component: model_1.Model_3
}, {
    key: '1-4',
    name: 'model_1_4',
    path: "/model_1/Model_1_4",
    component: model_1.Model_4
}, {
    key: '1-5',
    name: 'model_1_5',
    path: "/model_1/Model_1_5",
    component: model_1.Model_5
},]

const naviagtion2 = [{
    key: '2-1',
    name: 'model_2_1',
    path: "/model_2/Model_2_1",
    component: model_2.Model_1
}, {
    key: '2-2',
    name: 'model_2_2',
    path: "/model_2/Model_2_2",
    component: model_2.Model_2
}, {
    key: '2-3',
    name: 'model_2_3',
    path: "/model_2/Model_2_3",
    component: model_2.Model_3
}, {
    key: '2-4',
    name: 'model_2_4',
    path: "/model_2/Model_2_4",
    component: model_2.Model_4
}, {
    key: '2-5',
    name: 'model_2_5',
    path: "/model_2/Model_2_5",
    component: model_2.Model_5
}, {
    key: '2-6',
    name: 'model_2_6',
    path: "/model_2/Model_2_6",
    component: model_2.Model_6
}, {
    key: '2-7',
    name: 'model_2_7',
    path: "/model_2/Model_2_7",
    component: model_2.Model_7
}, {
    key: '2-8',
    name: 'model_2_8',
    path: "/model_2/Model_2_8",
    component: model_2.Model_8
},]

const naviagtion3 = [{
    key: '3-1',
    name: 'model_3_1',
    path: "/model_3/Model_3_1",
    component: model_3.Model_1
}, {
    key: '3-2',
    name: 'model_3_2',
    path: "/model_3/Model_3_2",
    component: model_3.Model_2
}, {
    key: '3-3',
    name: 'model_3_3',
    path: "/model_3/Model_3_3",
    component: model_3.Model_3
}, {
    key: '3-4',
    name: 'model_3_4',
    path: "/model_3/Model_3_4",
    component: model_3.Model_4
}, {
    key: '3-5',
    name: 'model_3_5',
    path: "/model_3/Model_3_5",
    component: model_3.Model_5
}, {
    key: '3-6',
    name: 'model_3_6',
    path: "/model_3/Model_3_6",
    component: model_3.Model_6
},]

const naviagtion4 = [{
    key: '4-1',
    name: 'model_4_1',
    path: "/model_4/Model_4_1",
    component: model_4.Model_1
}, {
    key: '4-2',
    name: 'model_4_2',
    path: "/model_4/Model_4_2",
    component: model_4.Model_2
}, {
    key: '4-3',
    name: 'model_4_3',
    path: "/model_4/Model_4_3",
    component: model_4.Model_3
}, {
    key: '4-4',
    name: 'model_4_4',
    path: "/model_4/Model_4_4",
    component: model_4.Model_4
}, {
    key: '4-5',
    name: 'model_4_5',
    path: "/model_4/Model_4_5",
    component: model_4.Model_5
}, {
    key: '4-6',
    name: 'model_4_6',
    path: "/model_4/Model_4_6",
    component: model_4.Model_6
}, {
    key: '4-7',
    name: 'model_4_7',
    path: "/model_4/Model_4_7",
    component: model_4.Model_7
},]

let naviagtion = []

naviagtion = naviagtion.concat(naviagtion1, naviagtion2, naviagtion3, naviagtion4)

export { naviagtion, naviagtion1, naviagtion2, naviagtion3, naviagtion4 }

