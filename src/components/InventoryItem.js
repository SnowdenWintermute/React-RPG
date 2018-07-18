import React, { Component } from 'react';
import Button from './Button'

class InventoryItem extends Component {
  render() {
    return (
      <div className="invItem">
        <Button name="▲" className="arrowButton" handleClick={this.props.handleClick}/>
        <Button name="▼" className="arrowButton" handleClick={this.props.handleClick}/>
      </div>
    );
  }
}

export default InventoryItem;
