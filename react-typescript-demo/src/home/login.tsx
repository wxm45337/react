import React ,{Component} from 'react'
import { Input ,Button } from 'antd'
import UserContext from '../components/context'

export default class Login extends Component{

    render(){
        return (
            <div style={{'margin': '50px',width: '200px'}}>
                <div style={{margin:'8px'}}>
                    用户名：<Input></Input>
                </div>
                <div style={{margin:'8px'}}>
                    密 &nbsp;码：<Input.Password/>
                </div>
                <div style={{margin:'8px'}}>
                    <Button type="primary">登 录</Button>
                </div>
            </div>
        )
    }
}