import React from 'react'

export default class MainTemplate extends React.Component{
    
    render(){
        return (
            <div style={{'margin': '10px'}}>
                <header>
                    <h2>this is Header</h2>
                </header>
                <div style={{'margin': "50px"}}>
                    {this.props.children}
                </div>
                <footer>
                    <h2>this.is Footer</h2>
                </footer>
            </div>
        );
    }
}