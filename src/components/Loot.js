import React, { Component } from 'react';
import Button from './Button'

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

class Loot extends Component {
  render() {
    const itemOnGround = this.props.itemOnGround;
    return (
      <div className="menuBox" id="loot">
      <div className="lootGrid">
      <div className="lootHeader"><h3>Loot</h3>
      </div>
      <div id="lootName">{nameTheItem(itemOnGround)}
      </div>
      <div id="lootButton">{makeButton(itemOnGround,this.props.handleClick)}
      </div>
      <div id="lootDismantleButton">{makeDismantleButton(itemOnGround,this.props.handleClick)}
      </div>
      </div>
      </div>
    );
  }
}

export default Loot;
