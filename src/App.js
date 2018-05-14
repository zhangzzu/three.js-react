import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Tree } from 'antd'
import 'antd/dist/antd.css'
import { Link, BrowserRouter } from 'react-router-dom'

const TreeNode = Tree.TreeNode;

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
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
      </p>
          <Tree
            defaultExpandAll={true}
            onSelect={this.onSelect}
            onCheck={this.onCheck}
          >
            <TreeNode title="Model_1" key="1" selectable={false}>
              <TreeNode title={<Link to="./model_1/Model_1_2">model_1_2</Link>} key="1_2" />
              <TreeNode title="model_1_3" key="1_3" />
              <TreeNode title="model_1_4" key="1_4" />
              <TreeNode title="model_1_5" key="1_5" />
            </TreeNode>
            <TreeNode title="Model_2" key="2" selectable={false}>
              <TreeNode title="model_2_2" key="2_2" />
              <TreeNode title="model_2_3" key="2_3" />
              <TreeNode title="model_2_4" key="2_4" />
              <TreeNode title="model_2_5" key="2_5" />
              <TreeNode title="model_2_6" key="2_6" />
              <TreeNode title="model_2_7" key="2_7" />
              <TreeNode title="model_2_8" key="2_8" />
            </TreeNode>
            <TreeNode title="Model_3" key="3" selectable={false}>
              <TreeNode title="model_3_2" key="3_2" />
              <TreeNode title="model_3_3" key="3_3" />
              <TreeNode title="model_3_4" key="3_4" />
              <TreeNode title="model_3_5" key="3_5" />
              <TreeNode title="model_3_6" key="3_6" />
            </TreeNode>
            <TreeNode title="Mode4_1" key="4" selectable={false}>
              <TreeNode title="model_4_2" key="4_2" />
              <TreeNode title="model_4_3" key="4_3" />
              <TreeNode title="model_4_4" key="4_4" />
              <TreeNode title="model_4_5" key="4_5" />
              <TreeNode title="model_4_6" key="4_6" />
              <TreeNode title="model_4_7" key="4_7" />
            </TreeNode>
          </Tree>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
