import React, { Component } from 'react';
import Button from './Button'

class MoveList extends Component {
  render() {
    if(this.props.battleState.inCombat&&this.props.enemyStats.hp>0){
    return (
      <div className="menuBox" id="moveList">
        <ul className="listNoStyle">
        Move List
          <li><Button name="-" key="explore" handleClick={this.props.handleClick}/></li>
          <li><Button name="Attack" key="atk" handleClick={this.props.handleClick}/></li>
          <li><Button name="Test" key="test" handleClick={this.props.handleClick}/>
          </li>
          <li></li>
        </ul>
      </div>
    );
  }else{
return (
  <div className="menuBox" id="moveList">
    <ul className="listNoStyle">
    Move List
      <li><Button name="Explore" key="explore" handleClick={this.props.handleClick}/></li>
      <li><Button name="Attack" key="atk" handleClick={this.props.handleClick}/></li>
      <li><Button name="Test" key="test" handleClick={this.props.handleClick}/>
      </li>
      <li></li>
    </ul>
  </div>
);
}
}
}

export default MoveList;
