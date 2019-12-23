import React from 'react'

interface State {
    inputV: string
}

export default class NameForm extends React.Component<{},State>{
    input: any;

    constructor(props:any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            inputV: 'aaa',
        }
      }
    
      handleSubmit(event: any) {
        alert('A name was submitted: ' + this.input.value);
        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" defaultValue={this.state.inputV}  ref={(input) => this.input = input} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
} 