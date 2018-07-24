import React, { Component } from 'react';
import InventoryItem from './InventoryItem'
import Button from './Button'

class MobileNavButtons extends Component {
  render() {
    return (
      <div className="menuBox" id="mobileNavButtons">
      <Button name = "˄" className="navButton" handleClick={this.props.handleClick}/>
      <Button name = "˅" className="navButton" handleClick={this.props.handleClick}/>
      </div>
    );
  }
}

export default MobileNavButtons;
