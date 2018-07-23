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

class CharPic extends Component {
  render() {
    const hp=this.props.playerStats.hp;
    const mp = this.props.playerStats.mp;
    if(this.props.playerClass==="Warrior"){
    return (
      <div className="menuBox" id="charPic">
      <Button name="Equipment Menu" key="eq" handleClick={this.props.handleClick}/>
      <br/>
      <div className="hpBarAndText">
        HP: {this.props.playerStats.hp}
        <div className="hpBar">{drawHpBar(hp)}</div>
      </div>
      <div className="hpBarAndText">
       MP: {this.props.playerStats.mp}
      <div className="hpBar">{drawMpBar(mp)}</div>
      </div>
        <div className="charPicHolder">{<img src={Warrior} className="characterPic" />}</div>
      </div>
    );
  }
  if(this.props.playerClass==="Rogue"){
  return (
    <div className="menuBox" id="charPic">
    <Button name="Equipment Menu" key="eq" handleClick={this.props.handleClick}/>
    <br/>
    <div className="hpBarAndText">
      HP: {this.props.playerStats.hp}
      <div className="hpBar">{drawHpBar(hp)}</div>
    </div>
    <div className="hpBarAndText">
     MP: {this.props.playerStats.mp}
    <div className="hpBar">{drawMpBar(mp)}</div>
    </div>
      <div className="charPicHolder">{<img src={Rogue} className="characterPic" />}</div>
    </div>
  );
}
if(this.props.playerClass==="Mage"){
return (
  <div className="menuBox" id="charPic">
  <Button name="Equipment Menu" key="eq" handleClick={this.props.handleClick}/>
  <br/>
    <div className="hpBarAndText">
      HP: {this.props.playerStats.hp}
      <div className="hpBar">{drawHpBar(hp)}</div>
    </div>
    <div className="hpBarAndText">
     MP: {this.props.playerStats.mp}
    <div className="hpBar">{drawMpBar(mp)}</div>
    </div>
    <div className="charPicHolder">{<img src={Mage} className="characterPic" />}</div>
  </div>
);
}
  }
}

export default CharPic;
