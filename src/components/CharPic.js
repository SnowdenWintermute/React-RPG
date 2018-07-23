import React, { Component } from 'react';
import Button from './Button'

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
    return (
      <div className="menuBox" id="charPic">
      <Button name="Equipment Menu" key="eq" handleClick={this.props.handleClick}/>
      <br/>
        HP: {this.props.playerStats.hp} MP: {this.props.playerStats.mp}
        <br/>
        <div className="hpBar">
        {drawHpBar(hp)}
        </div>
        <div className="hpBar">
        {drawMpBar(mp)}
        </div>
      </div>
    );
  }
}

export default CharPic;
