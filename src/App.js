import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Tree, Layout } from 'antd'
import 'antd/dist/antd.css'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import { naviagtion, naviagtion1, naviagtion2, naviagtion3, naviagtion4 } from './Navigation'

const TreeNode = Tree.TreeNode;
const { Content, Sider } = Layout

class App extends Component {

  constructor() {
    super()
    this.state = {
      value: undefined
    }
  }

  onSelect = (selectedKeys, info) => {

  }

  onCheck = (checkedKeys, info) => {
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Layout>
            <Sider style={{ backgroundColor: 'white' }}>
              <Tree
                defaultExpandAll={true}
                onSelect={this.onSelect}
                onCheck={this.onCheck}
              >
                <TreeNode title="Model_1" key="1" selectable={false}>
                  {naviagtion1.map((route, index) => <TreeNode title={<Link to={route.path}>{route.name}</Link>} key={route.key} />)}
                </TreeNode>
                <TreeNode title="Model_2" key="2" selectable={false}>
                  {naviagtion2.map((route, index) => <TreeNode title={<Link to={route.path}>{route.name}</Link>} key={route.key} />)}
                </TreeNode>
                <TreeNode title="Model_3" key="3" selectable={false}>
                  {naviagtion3.map((route, index) => <TreeNode title={<Link to={route.path}>{route.name}</Link>} key={route.key} />)}
                </TreeNode>
                <TreeNode title="Mode4_1" key="4" selectable={false}>
                  {naviagtion4.map((route, index) => <TreeNode title={<Link to={route.path}>{route.name}</Link>} key={route.key} />)}
                </TreeNode>
              </Tree>
            </Sider>

            <Content>
              {naviagtion.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
            </Content>

          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
