import React from 'react'
import { Route, Switch ,withRouter} from "react-router-dom"
import App from './App'
import Login from "./home/login"
import UserLogin from "../components/userLogin"

class Home extends React.Component<any,any>{
  componentWillMount (){
    if(UserLogin.info && UserLogin.info.userCode){
    }else{
      this.props.history.push('/login')
    }
    console.log('app ---componentWillMount-----',UserLogin.info)
  }
  render(){
    return (
          <Switch>
              <Route exact path="/login" component={Login}></Route>
              <Route path="/" component={App}></Route>
          </Switch>
    )
  }
}

export default withRouter(Home)
