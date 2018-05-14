import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Model from './App'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Model />, document.getElementById('root'));
registerServiceWorker();
