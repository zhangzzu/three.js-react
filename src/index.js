import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Model from './model_2/Model_2_3'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Model />, document.getElementById('root'));
registerServiceWorker();
