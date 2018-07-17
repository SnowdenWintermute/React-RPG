import React, { Component } from 'react';
import Button from './Button'
import InventoryItem from './InventoryItem'

class Items extends Component {
  render() {
    return (
      <div className="menuBox" id="items">
        Items
        <InventoryItem />
      </div>
    );
  }
}

export default Items;
