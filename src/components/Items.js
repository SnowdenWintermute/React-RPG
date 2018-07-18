import React, { Component } from 'react';
import InventoryItem from './InventoryItem'

class Items extends Component {
  render() {
    return (
      <div className="menuBox" id="items">
        Items
        <InventoryItem handleClick={this.props.handleClick} />
      </div>
    );
  }
}

export default Items;
