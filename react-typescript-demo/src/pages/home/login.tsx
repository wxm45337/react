import React ,{Component, Fragment} from 'react'
import { Input ,Button } from 'antd'
import UserLogin from "../../components/userLogin"
import {system} from '../../service/index'

export default class Login extends Component<{history:any}, {userCode: string, userPwd: string}>{
    constructor(props?:any){
        super(props);
        this.state = {
            userCode: '',
            userPwd: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeUserCode = this.handleChangeUserCode.bind(this)
        this.handleChangeUserPwd = this.handleChangeUserPwd.bind(this)
    }
    async handleSubmit(){
        // console.log(this.state)
        // UserLogin.setUserInfo(this.state);
        // this.props.history.push('/')
        console.log(system)
        let result = await system.login1({
            username: 'root',
            password: 'root',
            projectCode: 'cb202622630fb1cb585012778fd6d635',
            systemType: 'tycoss',
            ip: "10.19.156.131",
        });
        if(result){
            console.log('result --------', result);
        }
    }
    handleChangeUserCode(event:any){
        this.setState({userCode: event.target.value});
    }
    handleChangeUserPwd(event:any){
        this.setState({userPwd: event.target.value});
    }
    render(){
        return (
            <Fragment>
            <div style={{'margin': '50px',width: '300px'}}>
                <div style={{margin:'8px'}}>
                    用户名：<Input value={this.state.userCode} onChange={this.handleChangeUserCode}></Input>
                </div>
                <div style={{margin:'8px'}}>
                    密 &nbsp;码：<Input.Password value={this.state.userPwd} onChange={this.handleChangeUserPwd}/>
                </div>
                <div style={{margin:'8px'}}>
                    <Button type="primary" onClick={this.handleSubmit}>登 录</Button>
                </div>
            </div>
            </Fragment>
        )
    }
}