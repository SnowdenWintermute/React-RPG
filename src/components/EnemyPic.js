import React, { Component } from 'react';

const drawHpBar=function(hp){
  let hpBars = [];
  for(let i=0;i<hp;i++){
    hpBars.push(<div className="hpTick" key={i.toString()}></div>);
  }
  return hpBars;
}

class EnemyPic extends Component {
  render() {
    const hp = this.props.hp;
    return (
      <div className="menuBox" id="EnemyPic">
        EnemyPic HP{this.props.hp}
        <br/>
        <div className="hpBar">
        {drawHpBar(hp)}
        </div>
      </div>
    );
  }
}

export default EnemyPic;
