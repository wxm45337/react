import React from 'react'

export default class MainTemplate extends React.Component{

    render(){
        return (
            <template>
                <header>
                    this is Header
                </header>
                <div style={{'margin': "50px"}}>
                    {this.props.children}
                </div>
                <footer>
                    this.is Footer
                </footer>
            </template>
        );
    }
}