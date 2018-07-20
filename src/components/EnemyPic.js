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
class EnemyPic extends Component {
  render() {
    const hp = this.props.enemyStats.hp;
    const mp = this.props.enemyStats.mp;
    if(this.props.battleState.stairs){
      return(
        <div className="menuBox" id="stairs">
        <Button name="Explore" id="explore" handleClick={this.props.handleClick} />
        <p>Stairs</p>
        <p>Rooms explored: {this.props.battleState.timesExplored}</p>
        </div>
      )};
    if(this.props.battleState.treasureRoom){
      return(
        <div className="menuBox" id="stairs">
        <Button name="Explore" id="explore" handleClick={this.props.handleClick} />
        <p>Treasure Room</p>
        <p>Rooms explored: {this.props.battleState.timesExplored}</p>
        </div>
      )};
    if(this.props.battleState.inCombat&&this.props.enemyStats.hp>0){
    return (
      <div className="menuBox" id="EnemyPic">
      <Button name="_" id="blankButton" handleClick={this.props.handleClick} />
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
        <Button name="Explore" id="explore" handleClick={this.props.handleClick} />
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
