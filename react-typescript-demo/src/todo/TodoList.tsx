import React , { Component, Fragment} from 'react'
import TodoItem from './TodoItem'
import MainTemplate from '../home/main-template'

interface State {
    list: Array<string>,
    inputV: string
}
export default class TodoList extends Component<{},State> {
    constructor(props:any){
        super(props);
        this.state = {
            list: [
                'list 1',
                'list 2'
            ],
            inputV: ''
        }
    }
    handleClick(){
        this.setState({ 
            list: [...this.state.list , this.state.inputV], inputV: ''
        });
    }
    shouldComponentUpdate(nextProps: any, state: State) {
        console.log('componentWillUpdate---',nextProps,state)
        return true;
    }
    componentWillUpdate (nextProps: any, state: State) {
        console.log('componentWillUpdate---',nextProps,state)
    }
    private handleChange(index:number,e: any){
        this.setState({ inputV: e.target.value})
    }
    handleDeleteItem(index: number){
        let list = [...this.state.list];
        list.splice(index,1);
        this.setState({ list })
    }
    render() {
        return (
            <MainTemplate>
                <div>
                    <input style={{backgroundColor: 'gray', border: '0px'}} value={this.state.inputV} onChange={this.handleChange.bind(this , 111)}/>
                    <button onClick={this.handleClick.bind(this)}>add</button>
                </div>

                <ul>
                    {
                        this.state.list.map((item,index)=>{
                        return <TodoItem key={index} content={item} index={index} delete={this.handleDeleteItem.bind(this)}>{index}</TodoItem>
                        })
                    }
                </ul>
            </MainTemplate>
        )
    }
}
