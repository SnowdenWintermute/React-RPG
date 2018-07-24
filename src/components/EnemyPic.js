import React, { Component } from 'react';
import Button from './Button';
import RedSlime from '../pics/enemyPics/redSlime.png';
import GreenSlime from '../pics/enemyPics/greenSlime.png';
import BlueSlime from '../pics/enemyPics/blueSlime.png';
import UnopenedChest from '../pics/rooms/unopenedChest.png'
import OpenedChest from '../pics/rooms/openedChest.png'

const enemyPicture=function(type){
  switch(true){
    case type==="Warrior":
    return (<img src = {RedSlime} className="enemyPic" />)
    break
    case type==="Rogue":
    return (<img src = {GreenSlime} className="enemyPic" />)
    break
    case type==="Mage":
    return (<img src = {BlueSlime} className="enemyPic" />)
    break
    default:
  }
}
const chestPicture=function(status){
  switch(true){
    case status===false:
    return (<img src = {UnopenedChest} className="chestPic" />)
    break
    case status===true:
    return (<img src = {OpenedChest} className="chestPic" />)
    break
    default:
  }
}
const drawHpBar=function(hp){
  let hpBars = [];
  for(let i=0;i<hp;i++){
    hpBars.push(<div className="hpTick" key={i.toString()}></div>);
  }
  return hpBars;
}
const drawMpBar=function(mp){
  let mpBars = [];
  for(let i=0;i<mp;i++){
    mpBars.push(<div className="mpTick" key={i.toString()}></div>);
  }
  return mpBars;
}
const makeStairButtons=function(roomsExplored,handleClick){
  if(roomsExplored>=3){
    return(<div><Button name="Go up" id="goUp" handleClick={handleClick}/><br/><Button name="Go down" id="goDown" handleClick={handleClick}/></div>)
  }
}
const makeTreasureButton=function(playerClass,handleClick,chestOpen){
  if(!chestOpen){
  if(playerClass==="Rogue"){
    return(<Button name="Pick lock" id="pickLock" handleClick={handleClick}/>)
  }else{
    return(<Button name="Inject lock" id="pickLock" handleClick={handleClick}/>)
  }
}else{
  return(<div>The chest opens...</div>)
}
}
class EnemyPic extends Component {
  render() {
    const hp = this.props.enemyStats.hp;
    const mp = this.props.enemyStats.mp;
    const enemyType = this.props.enemyType;
    const chestStatus = this.props.chestOpen;
    if(this.props.battleState.stairs){
      return(
        <div className="menuBox" id="enemyPic">
        <Button name="Explore" id="explore" handleClick={this.props.handleClick} /> DLVL:{this.props.battleState.dlvl}
        <div className="menuHeader"><h3>Stairs</h3></div>
        <div className="buttonList">{makeStairButtons(this.props.battleState.timesExplored,this.props.handleClick)}
        <Button name="Trade shards" handleClick={this.props.handleClick}/>
        </div>
        <p>Rooms explored: {this.props.battleState.timesExplored}</p>
        <p>On this floor: {this.props.battleState.timesExploredOnCurrentFloor}</p>
        </div>
      )};
    if(this.props.battleState.treasureRoom){
      return(
        <div className="menuBox" id="enemyPic">
        <Button name="Explore" id="explore" handleClick={this.props.handleClick} />DLVL:{this.props.battleState.dlvl}
        <div className="menuHeader"><h3>Treasure Room</h3></div>
        <div className="enemyPicHolder">{chestPicture(chestStatus)}
        {makeTreasureButton(this.props.playerClass,this.props.handleClick,this.props.chestOpen)}
        </div>
        <p>Rooms explored: {this.props.battleState.timesExplored}</p>
        <p>On this floor: {this.props.battleState.timesExploredOnCurrentFloor}</p>
        </div>
      )};
    if(this.props.battleState.inCombat&&this.props.enemyStats.hp>0){
    return (
      <div className="menuBox" id="enemyPic">
      <Button name="Enemy Stats" id="blankButton" handleClick={this.props.handleClick} />DLVL:{this.props.battleState.dlvl}
        <div className="hpBarAndText">
          HP: {this.props.enemyStats.hp}
          <div className="hpBar">{drawHpBar(hp)}</div>
        </div>
        <div className="hpBarAndText">
         MP: {this.props.enemyStats.mp}
        <div className="hpBar">{drawMpBar(mp)}</div>
        </div>
        <div className="enemyPicHolder">{enemyPicture(enemyType)}</div>
      </div>
    )};
    if(this.props.battleState.inCombat&&this.props.enemyStats.hp<=0){
    return (
      <div className="menuBox" id="enemyPic">
        <Button name="Explore" id="explore" handleClick={this.props.handleClick} />DLVL:{this.props.battleState.dlvl}
        <div className="menuHeader"><h3>Victory!</h3></div>
        <p>The monster falls to the ground, defeated. An item appears from the corpse...</p>
        <div className="hpBar">
        {drawHpBar(hp)}
        </div>
        <div className="hpBar">
        {drawMpBar(mp)}
        </div>
      </div>
    )};
  }
}

export default EnemyPic;
