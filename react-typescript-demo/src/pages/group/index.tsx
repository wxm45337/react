import React from 'react'

const MyComponents = {
    DatePicker: function DatePicker(props:any) {
        return <div>this is a datepicker1.    color={props.color} , oper={props.oper}</div>;
    }, 
    DatePicker2: function DatePicker(props:any) {
        return <div>this is a datepicker2.  </div>;
    },
}

export default class Group extends React.Component{
    render(){
        return [
            <MyComponents.DatePicker color="blue" oper="&lt;3"/>,
            <MyComponents.DatePicker2/>
        ];
    }
}