import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Model from './Model_1_5'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Model />, document.getElementById('root'));
registerServiceWorker();
