import React from 'react'

interface Props {
    index: number;
    content: string;
    delete: Function
}

interface State {
}

export default class TodoItem extends React.Component<Props,State>{
    constructor(props: any){
        super(props)
    }
    componentWillMount(){
        console.log(this.props.children)
    }

    handleClick(){
        this.props.delete(this.props.index);
    }
    render(){
        return (
            <div onClick={this.handleClick.bind(this)}>{this.props.content}--{this.props.index}</div>
        )
    }
}