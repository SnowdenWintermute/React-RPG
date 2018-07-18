import React, { Component } from 'react';



class Button extends Component {
  sendToParent = () => {
    this.props.handleClick(this.props.name)
  }
  render() {
    return (
      <button onClick={this.sendToParent}>{this.props.name}</button>
    );
  }
}

export default Button;
