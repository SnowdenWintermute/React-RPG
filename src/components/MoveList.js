import React, { Component } from 'react';
import Button from './Button'

class MoveList extends Component {
  render() {
    return (
      <div className="menuBox" id="moveList">
        <ul>
        Move List
          <li><Button name="Attack" key="atk" handleClick={this.props.handleClick}/></li>
          <li><Button name="Test" key="test" handleClick={this.props.handleClick}/>
          </li>
          <li></li>
        </ul>

      </div>
    );
  }
}

export default MoveList;
