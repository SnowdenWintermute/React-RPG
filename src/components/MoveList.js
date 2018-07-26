import React, { Component } from 'react';
import Button from './Button'

const makeSkillPlusButton = function(key,handleClick,playerSkills){
  if(playerSkills.freePoints===0){
    return(<Button name="-" handleClick={handleClick}/>)
  }else{
  switch(true){
    case key==="armorBreak":
    if(playerSkills.armorBreak<3){
      return(<Button name="+" handleClick={handleClick} itemSlot='0' />)
    }
    break;
    case key==="stun":
    if(playerSkills.stun<3){
      return(<Button name="+" handleClick={handleClick} itemSlot='1' />)
    }
    break;
    case key==="spikedArmor":
    if(playerSkills.spikedArmor<3){
      return(<Button name="+" handleClick={handleClick} itemSlot='2' />)
    }
    break;
    case key==="arrow":
    if(playerSkills.arrow<3){
      return(<Button name="+" handleClick={handleClick} itemSlot='0' />)
    }
    break;
    case key==="dodge":
    if(playerSkills.dodge<3){
      return(<Button name="+" handleClick={handleClick} itemSlot='1' />)
    }
    break;
    case key==="flee":
    if(playerSkills.flee<3){
      return(<Button name="+" handleClick={handleClick} itemSlot='2' />)
    }
    break;
    case key==="heatLance":
    if(playerSkills.heatLance<3){
      return(<Button name="+" handleClick={handleClick} itemSlot='0' />)
    }
    break;
    case key==="eatShard":
    if(playerSkills.eatShard<3){
      return(<Button name="+" handleClick={handleClick} itemSlot='1' />)
    }
    break;
    case key==="manaBurn":
    if(playerSkills.manaBurn<3){
      return(<Button name="+" handleClick={handleClick} itemSlot='2' />)
    }
    break;
    default:
    return(<Button name="-" handleClick={handleClick}/>)
  }
}
}
const makeTestButton = function(flag,handleClick){
  if(flag){
    return(<Button name="Test" key="test" handleClick={handleClick}/>
    )
  }
}

class MoveList extends Component {
  render() {
    if(this.props.playerClass==="Warrior"){
    return (
      <div className="menuBox" id="moveList">
        <ul className="listNoStyle">
        <div className="menuHeader"><h3>Moves</h3></div>
          <li><Button name="Explore" key="explore" handleClick={this.props.handleClick}/></li>
          <li><Button name="Attack" key="atk" handleClick={this.props.handleClick}/></li>
          <li>Unspent points: {this.props.playerSkills.freePoints}</li>
          <li><Button name="Armor Break" key = "armorBreak" handleClick={this.props.handleClick}/>{makeSkillPlusButton("armorBreak",this.props.handleClick,this.props.playerSkills)}LV:{this.props.playerSkills.armorBreak}</li>
          <li><Button name="Stun" key = "stun" handleClick={this.props.handleClick}/>{makeSkillPlusButton("stun",this.props.handleClick,this.props.playerSkills)}LV:{this.props.playerSkills.stun}</li>
          <li><Button name="Spiked Armor" key = "spikedArmor" handleClick={this.props.handleClick}/>{makeSkillPlusButton("spikedArmor",this.props.handleClick,this.props.playerSkills)}LV:{this.props.playerSkills.spikedArmor}</li>
          <li>Spikes:{this.props.armorSpikes}</li>

        </ul>
        {makeTestButton(this.props.testingMode,this.props.handleClick)}
      </div>
    );
  }
  if(this.props.playerClass==="Rogue"){
  return (
    <div className="menuBox" id="moveList">
      <ul className="listNoStyle">
      <div className="menuHeader"><h3>Moves</h3></div>
        <li><Button name="Explore" key="explore" handleClick={this.props.handleClick}/></li>
        <li><Button name="Attack" key="atk" handleClick={this.props.handleClick}/></li>
        <li><Button name="Test" key="test" handleClick={this.props.handleClick}/></li>
        <li>Unspent points: {this.props.playerSkills.freePoints}</li>
        <li><Button name="Arrow" key = "arrow" handleClick={this.props.handleClick}/>{makeSkillPlusButton("arrow",this.props.handleClick,this.props.playerSkills)}LV:{this.props.playerSkills.arrow}</li>
        <li><Button name="Dodge" key = "dodge" handleClick={this.props.handleClick}/>{makeSkillPlusButton("dodge",this.props.handleClick,this.props.playerSkills)}LV:{this.props.playerSkills.dodge}</li>
        <li><Button name="Flee" key = "flee" handleClick={this.props.handleClick}/>{makeSkillPlusButton("flee",this.props.handleClick,this.props.playerSkills)}LV:{this.props.playerSkills.flee}</li>

      </ul>
    </div>
  );
}
if(this.props.playerClass==="Mage"){
return (
  <div className="menuBox" id="moveList">
    <ul className="listNoStyle">
    <div className="menuHeader"><h3>Moves</h3></div>
      <li><Button name="Explore" key="explore" handleClick={this.props.handleClick}/></li>
      <li><Button name="Attack" key="atk" handleClick={this.props.handleClick}/></li>
      <li><Button name="Test" key="test" handleClick={this.props.handleClick}/></li>
      <li>Unspent points: {this.props.playerSkills.freePoints}</li>
      <li><Button name="Heat Lance" key = "heatLance" handleClick={this.props.handleClick}/>{makeSkillPlusButton("heatLance",this.props.handleClick,this.props.playerSkills)}LV:{this.props.playerSkills.heatLance}</li>
      <li><Button name="Eat Shard" key = "eatShard" handleClick={this.props.handleClick}/>{makeSkillPlusButton("eatShard",this.props.handleClick,this.props.playerSkills)}LV:{this.props.playerSkills.eatShard}</li>
      <li><Button name="Mana Burn" key = "manaBurn" handleClick={this.props.handleClick}/>{makeSkillPlusButton("manaBurn",this.props.handleClick,this.props.playerSkills)}LV:{this.props.playerSkills.manaBurn}</li>

    </ul>
  </div>
);
}
  }
}

export default MoveList;
