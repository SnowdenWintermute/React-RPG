import React, { Component } from 'react';
import Button from './Button'

class MoveListMobile extends Component {
  render() {
    if(this.props.battleState.inCombat&&this.props.enemyStats.hp>0){
    return (
      <div className="menuBox" id="moveListMobile">
        <ul className="listNoStyle">
        <div className="menuHeader"><h3>Moves</h3></div>
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
  <div className="menuBox" id="moveListMobile">
  <div className="menuHeader"><h3>Moves</h3></div>
    <ul className="listNoStyle">
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

export default MoveListMobile;
