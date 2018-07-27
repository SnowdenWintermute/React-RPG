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
    return(<div className="stairButtons"><Button name="Go up" id="goUp" handleClick={handleClick}/>
    <Button name="Go down" id="goDown" handleClick={handleClick}/></div>)
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
  return(<div id="theChestOpens">The chest opens...</div>)
}
}

//Name the Item
const nameTheItem = function(item){
  let name = ""
  name += (item.type)
  if(item.type!=="Autoinjector"&&item.type!==""){
    name+=" of "
  }
  if(item.dmg!==0){
    name+=(item.dmg+" DMG ")
  }
  if(item.def!==0){
    name+=(item.def+" DEF ")
  }
  if(item.str!==0){
    name+=(item.str+" STR")
  }
  if(item.dex!==0){
    name+=(item.dex+" DEX")
  }
  if(item.int!==0){
    name+=(item.int+" INT")
  }
  return name;
}

const makeButton = function(item,handleClick) {
  if(item.type!==""){
    return(<Button name="Take" handleClick={handleClick}/>)
  }
}
const makeDismantleButton = function(item,handleClick,itemSlot) {
  if(item.type!==""&&item.type!=="Autoinjector"){
    return(<Button name="⌁" handleClick={handleClick} itemSlot={3}/>)
  }else if(item.type==="Autoinjector"){
    return(<div><Button name="Inject HP" handleClick={handleClick}/><Button name="Inject MP" handleClick={handleClick}/></div>)
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
        <div className="enemyPicGrid">
        <div id="stairsHeader">Stairs on DLVL:{this.props.battleState.dlvl}</div>
        {makeStairButtons(this.props.battleState.timesExplored,this.props.handleClick)}
        <div id="shardButtonHolder">
        <Button name="Trade shards" handleClick={this.props.handleClick}/>
        </div>
        <div id="roomsExplored">Rooms explored: {this.props.battleState.timesExplored}</div>
        <div id="onThisFloor">On this floor: {this.props.battleState.timesExploredOnCurrentFloor}</div>
        </div>
        </div>
      )};
    if(this.props.battleState.treasureRoom){
      return(
        <div className="menuBox" id="enemyPic">
        <div className="enemyPicGrid">
        <div className="treasurePicHolder">{chestPicture(chestStatus)}
        </div>
        <div className="treasureButtonHolder">
        {makeTreasureButton(this.props.playerClass,this.props.handleClick,this.props.chestOpen)}
        </div>
        </div>
        </div>
      )};
    if(this.props.battleState.inCombat&&this.props.enemyStats.hp>0){
    return (
      <div className="menuBox" id="enemyPic">
      <div className="enemyPicGrid">
      <div className="hpText">
      HP: {this.props.enemyStats.hp}
      </div>
      <div className="hpBar">{drawHpBar(hp)}
      </div>
      <div className="mpText">
      MP: {this.props.enemyStats.mp}
      </div>
      <div className="mpBar">{drawMpBar(mp)}
      </div>
      <div className="enemyPicHolder">{enemyPicture(enemyType)}
      </div>
      </div>
      </div>
    )};
    if(this.props.battleState.inCombat&&this.props.enemyStats.hp<=0){
    const itemOnGround = this.props.itemOnGround;
    return (
        <div className="menuBox" id="enemyPic">
        <div className="menuHeader"><h3>Loot</h3></div>
          <ul className="listNoStyle">
          <li>{nameTheItem(itemOnGround)}</li>
          <li>{makeButton(itemOnGround,this.props.handleClick)}</li>
          <li>{makeDismantleButton(itemOnGround,this.props.handleClick)}</li>
          </ul>
        </div>
      );};
  }
}

export default EnemyPic;
