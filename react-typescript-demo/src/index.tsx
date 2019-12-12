import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import App from './App'

import Login from './home/login'
// import Main from './home/main'
// import TodoList from './todo/TodoList';
// import NameForm from './form/NameForm'
// import Group from './group/index'
// import Context from './context/index'

import { HashRouter ,Route, Switch} from "react-router-dom";


let root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<HashRouter>
    <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route path="/" component={App}></Route>
    </Switch>
</HashRouter>, root);