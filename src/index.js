import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Model from './model_3/Model_3_2'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Model />, document.getElementById('root'));
registerServiceWorker();
