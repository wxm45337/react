import React from 'react'
import { HashRouter ,Route , NavLink} from "react-router-dom"
import TodoList from './todo/TodoList';
import NameForm from './form/NameForm'
import Group from './group/index'
import Context from './context/index'
import Main from './home/main'
import UserLogin from "../components/userLogin"

export default class Login extends React.Component<{history:any},{}>{
  componentWillMount (){
    if(UserLogin.info && UserLogin.info.userCode){
    }else{
      this.props.history.push('/login')
    }
    console.log('app ---componentWillMount-----',UserLogin.info)
  }
  render(){
    return (
      <React.Fragment>
        
        <div style={{margin: '10px'}}>
            <NavLink to="/todoList">Learn ToDo</NavLink>
        </div>
        <div style={{margin: '10px'}}>
            <NavLink to="/context/1">Learn Context</NavLink>
        </div>
        <div style={{margin: '10px'}}>
            <NavLink to="/nameForm">Learn Form</NavLink>
        </div>
        <div style={{margin: '10px'}}>
            <NavLink to="/group">Learn ToDo</NavLink>
        </div>
        <HashRouter>
          <Route exact path="/" component={Main}></Route>
          <Route exact path="/todoList" component={TodoList}></Route>
          <Route exact path="/nameForm" component={NameForm}></Route>
          <Route exact path="/group" component={Group}></Route>
          <Route exact path="/context/:id" component={Context}></Route>
        </HashRouter>
      </React.Fragment>
    )
  }
}

