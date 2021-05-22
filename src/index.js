
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

const Index = () => <div><App /></div>;

ReactDom.render(<Index />, document.getElementById('index'));
