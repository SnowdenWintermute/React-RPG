import React, { Component } from 'react';
import Button from './Button'

class MoveAnimation extends Component {
  render() {
    return (
      <div className="menuBox" id="moveAnimation">
        Combat Log
        <Button name="Clear Log" key="eq" handleClick={this.props.handleClick}/>
        <textarea
        id="combatLog"
        value={this.props.log}
        >
        </textarea>
      </div>
    );
  }
}

export default MoveAnimation;
