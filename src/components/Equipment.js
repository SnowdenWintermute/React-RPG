import React, { Component } from 'react';
import Button from './Button'

class Equipment extends Component {


  render() {
    return (
      <div className="menuBox" id="equipment">
      <Button name="Battle Menu" key="bm" handleClick={this.props.handleClick}/>
      <br/>

        Equipment
        <ul id="equipmentList">
        <li>MH: {JSON.stringify(this.props.mainHand)}
        </li>
        <li>OH: {JSON.stringify(this.props.offHand)}
        </li>
        <li>Hd: {JSON.stringify(this.props.head)}
        </li>
        <li>Bd: {JSON.stringify(this.props.body)}
        </li>
        <li>Acc: {JSON.stringify(this.props.ring)}
        </li>
        </ul>
      </div>
    );
  }
}

export default Equipment;
