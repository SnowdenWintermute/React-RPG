import React from 'react';
import ReactDOM from 'react-dom';
import './src/index.css';
import App from './scr/App';
import registerServiceWorker from './src/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
