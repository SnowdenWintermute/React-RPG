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
    case key==="manaLeak":
    if(playerSkills.manaLeak<3){
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
    case key==="weaken":
    if(playerSkills.weaken<3){
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
      <div id="moveListGrid">
          <div className="moveDiv" id="explore"><Button name="Explore" key="explore" handleClick={this.props.handleClick}/>
          </div>
          <div className="moveDiv" id="attack"><Button name="Attack" key="atk" handleClick={this.props.handleClick}/>
          </div>
          <div className="moveDiv" id="unspentPoints">Unspent points: {this.props.playerSkills.freePoints}
          </div>
          <div className="moveDiv" id="skill1"><Button name="Armor Break" key = "armorBreak" handleClick={this.props.handleClick}/>
          </div>
          <div className="moveDiv" id="plusButton1">{makeSkillPlusButton("armorBreak",this.props.handleClick,this.props.playerSkills)}
          </div>
          <div className="moveDiv" id="skill1lvl">LV:{this.props.playerSkills.armorBreak}
          </div>
          <div className="moveDiv" id="skill2"><Button name="Stun" key = "stun" handleClick={this.props.handleClick}/>
          </div>
          <div className="moveDiv" id="plusButton2">{makeSkillPlusButton("stun",this.props.handleClick,this.props.playerSkills)}
          </div>
          <div className="moveDiv" id="skill2lvl">LV:{this.props.playerSkills.stun}
          </div>
          <div className="moveDiv" id="skill3"><Button name="Spiked Armor" key = "spikedArmor" handleClick={this.props.handleClick}/>
          </div>
          <div className="moveDiv" id="plusButton3">{makeSkillPlusButton("spikedArmor",this.props.handleClick,this.props.playerSkills)}
          </div>
          <div className="moveDiv" id="skill3lvl">LV:{this.props.playerSkills.spikedArmor}
          </div>
        </div>
        {/*makeTestButton(this.props.testingMode,this.props.handleClick)*/}
      </div>
    );
  }
  if(this.props.playerClass==="Mage"){
  return (
    <div className="menuBox" id="moveList">
    <div id="moveListGrid">
        <div className="moveDiv" id="explore"><Button name="Explore" key="explore" handleClick={this.props.handleClick}/>
        </div>
        <div className="moveDiv" id="attack"><Button name="Attack" key="atk" handleClick={this.props.handleClick}/>
        </div>
        <div className="moveDiv" id="unspentPoints">Unspent points: {this.props.playerSkills.freePoints}
        </div>
        <div className="moveDiv" id="skill1"><Button name="Heat Lance" key = "heatLance" handleClick={this.props.handleClick}/>
        </div>
        <div className="moveDiv" id="plusButton1">{makeSkillPlusButton("heatLance",this.props.handleClick,this.props.playerSkills)}
        </div>
        <div className="moveDiv" id="skill1lvl">LV:{this.props.playerSkills.heatLance}
        </div>
        <div className="moveDiv" id="skill2"><Button name="Eat Shard" key = "eatShard" handleClick={this.props.handleClick}/>
        </div>
        <div className="moveDiv" id="plusButton2">{makeSkillPlusButton("eatShard",this.props.handleClick,this.props.playerSkills)}
        </div>
        <div className="moveDiv" id="skill2lvl">LV:{this.props.playerSkills.eatShard}
        </div>
        <div className="moveDiv" id="skill3"><Button name="Weaken" key = "weaken" handleClick={this.props.handleClick}/>
        </div>
        <div className="moveDiv" id="plusButton3">{makeSkillPlusButton("weaken",this.props.handleClick,this.props.playerSkills)}
        </div>
        <div className="moveDiv" id="skill3lvl">LV:{this.props.playerSkills.weaken}
        </div>
      </div>
      {/*makeTestButton(this.props.testingMode,this.props.handleClick)*/}
    </div>
  );
}
if(this.props.playerClass==="Rogue"){
return (
  <div className="menuBox" id="moveList">
  <div id="moveListGrid">
      <div className="moveDiv" id="explore"><Button name="Explore" key="explore" handleClick={this.props.handleClick}/>
      </div>
      <div className="moveDiv" id="attack"><Button name="Attack" key="atk" handleClick={this.props.handleClick}/>
      </div>
      <div className="moveDiv" id="unspentPoints">Unspent points: {this.props.playerSkills.freePoints}
      </div>
      <div className="moveDiv" id="skill1"><Button name="Arrow" key = "arrow" handleClick={this.props.handleClick}/>
      </div>
      <div className="moveDiv" id="plusButton1">{makeSkillPlusButton("arrow",this.props.handleClick,this.props.playerSkills)}
      </div>
      <div className="moveDiv" id="skill1lvl">LV:{this.props.playerSkills.arrow}
      </div>
      <div className="moveDiv" id="skill2"><Button name="Mana Leak" key = "manaLeak" handleClick={this.props.handleClick}/>
      </div>
      <div className="moveDiv" id="plusButton2">{makeSkillPlusButton("manaLeak",this.props.handleClick,this.props.playerSkills)}
      </div>
      <div className="moveDiv" id="skill2lvl">LV:{this.props.playerSkills.manaLeak}
      </div>
      <div className="moveDiv" id="skill3"><Button name="Flee" key = "flee" handleClick={this.props.handleClick}/>
      </div>
      <div className="moveDiv" id="plusButton3">{makeSkillPlusButton("flee",this.props.handleClick,this.props.playerSkills)}
      </div>
      <div className="moveDiv" id="skill3lvl">LV:{this.props.playerSkills.flee}
      </div>
    </div>
    {/*makeTestButton(this.props.testingMode,this.props.handleClick)*/}
  </div>
);
}
  }
}

export default MoveList;
