import React, { Component } from 'react';
import Button from './Button';

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
    return(<div><Button name="Go up" id="goUp" handleClick={handleClick}/><Button name="Go down" id="goDown" handleClick={handleClick}/></div>)
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
    if(this.props.battleState.stairs){
      return(
        <div className="menuBox" id="stairs">
        <Button name="Explore" id="explore" handleClick={this.props.handleClick} />DLVL:{this.props.battleState.dlvl}
        <p>Stairs (3 Shards -> 1 Autoinjector)</p>
        <p>{makeStairButtons(this.props.battleState.timesExplored,this.props.handleClick)}
        <Button name="Trade shards" handleClick={this.props.handleClick}/></p>
        <p>Rooms explored: {this.props.battleState.timesExplored}</p>
        <p>On this floor: {this.props.battleState.timesExploredOnCurrentFloor}</p>
        </div>
      )};
    if(this.props.battleState.treasureRoom){
      return(
        <div className="menuBox" id="stairs">
        <Button name="Explore" id="explore" handleClick={this.props.handleClick} />DLVL:{this.props.battleState.dlvl}
        <p>Treasure Room</p>
        <p>{makeTreasureButton(this.props.playerClass,this.props.handleClick,this.props.chestOpen)}</p>
        <p>Rooms explored: {this.props.battleState.timesExplored}</p>
        <p>On this floor: {this.props.battleState.timesExploredOnCurrentFloor}</p>
        </div>
      )};
    if(this.props.battleState.inCombat&&this.props.enemyStats.hp>0){
    return (
      <div className="menuBox" id="EnemyPic">
      <Button name="Enemy Stats" id="blankButton" handleClick={this.props.handleClick} />DLVL:{this.props.battleState.dlvl}
        <p>Battle!</p>
        <p>Enemy: {this.props.enemyType} </p>
        <p>HP: {this.props.enemyStats.hp}/{this.props.enemyStats.maxHp}</p>
        <div className="hpBar">
        {drawHpBar(hp)}
        </div>
        <div className="hpBar">
        {drawMpBar(mp)}
        </div>
      </div>
    )};
    if(this.props.battleState.inCombat&&this.props.enemyStats.hp<=0){
    return (
      <div className="menuBox" id="EnemyPic">
        <Button name="Explore" id="explore" handleClick={this.props.handleClick} />DLVL:{this.props.battleState.dlvl}
        <p>Enemy Defeated!</p>
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
