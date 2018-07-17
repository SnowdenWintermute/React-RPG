import React, { Component } from 'react';
import Button from './Button'

class InventoryItem extends Component {
  render() {
    return (
      <div className="invItem">
        <Button name="▲" className="arrowButton"/>
        <Button name="▼" className="arrowButton"/>
      </div>
    );
  }
}

export default InventoryItem;
