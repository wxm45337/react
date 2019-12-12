import React,{Fragment} from 'react'
import { HashRouter ,Route, Switch} from "react-router-dom"
import TodoList from './todo/TodoList';
import NameForm from './form/NameForm'
import Group from './group/index'
import Context from './context/index'
import Main from './home/main'

const App: React.FC = () => {
  return (
        <HashRouter>
          <Route exact path="/" component={Main}></Route>
          <Route exact path="/todoList" component={TodoList}></Route>
          <Route exact path="/nameForm" component={NameForm}></Route>
          <Route exact path="/group" component={Group}></Route>
          <Route exact path="/context/:id" component={Context}></Route>
        </HashRouter>
  );
}

export default App;
