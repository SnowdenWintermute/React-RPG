import React, { Component } from 'react';
import Button from './Button'
import Warrior from '../pics/charPics/warrior.png'
import Rogue from '../pics/charPics/rogue.png'
import Mage from '../pics/charPics/mage.png'



//Draw the HP Bar
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
const getCharPic=function(playerClass){
  switch(true){
    case playerClass==="Warrior":
    return (<img src ={Warrior} className="characterPic"/>)
    break;
    case playerClass==="Rogue":
    return (<img src ={Rogue} className="characterPic"/>)
    break;
    case playerClass==="Mage":
    return (<img src ={Mage} className="characterPic"/>)
    break;
  }
}

class CharPic extends Component {
  render() {
    const hp=this.props.playerStats.hp;
    const mp = this.props.playerStats.mp;
    return (
      <div className="menuBox" id="charPic">
      <div className="enemyPicGrid">
      <div className="charPicHolder">{getCharPic(this.props.playerClass)}
      </div>
      <div id="playerHpText">HP: {this.props.playerStats.hp}
      </div>
      <div className="hpBar" id="playerHp">{drawHpBar(hp)}
      </div>
      <div id="playerMpText">MP: {this.props.playerStats.mp}
      </div>
      <div className="mpBar" id="playerMp">{drawMpBar(mp)}
      </div>
      </div>
      </div>
    );
  }
}

export default CharPic;
