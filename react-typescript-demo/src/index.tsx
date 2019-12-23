import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom"

import 'antd/dist/antd.css';

import Home from './pages/index'

let root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<HashRouter><Home/></HashRouter>, root);