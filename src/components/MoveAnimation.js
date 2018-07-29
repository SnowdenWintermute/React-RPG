import React, { Component } from 'react';
import Button from './Button'

class MoveAnimation extends Component {
  render() {
    return (
      <div className="menuBox" id="combatLog">
        <textarea
        id="combatLogText"
        value={this.props.log}
        >
        </textarea>
      </div>
    );
  }
}

export default MoveAnimation;
