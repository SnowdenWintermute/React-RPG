import React, { Component } from 'react';
import Button from './Button'

//Name an Item. this is different from item on ground's version due to "Empty Slot"
const nameTheItem = function(item){
  let name = ""
  name += (item.type)
  if (item.type===""){
    name = "Empty Slot"
  }
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

const makeButtonEq = function(item,handleClick,itemSlot,itemName){
  if(item.type!==""){
    return(<Button name="▽" handleClick={handleClick} itemSlot={itemSlot} />)
  }else{
    return(<Button name="-" handleClick={handleClick} />)
  }
}

class Equipment extends Component {
  render() {
    return (
      <div className="menuBox" id="equipment">
      <Button name="Battle Menu" key="bm" handleClick={this.props.handleClick}/>
      <br/>

        <ul className="listNoStyle" id="eqlist">
        <li>Equipment
        </li>
        <li>{makeButtonEq(this.props.inventory.mainHand,this.props.handleClick,0)}Right: {nameTheItem(this.props.inventory.mainHand)}
        </li>
        <li>{makeButtonEq(this.props.inventory.offHand,this.props.handleClick,1)}Left: {nameTheItem(this.props.inventory.offHand)}
        </li>
        <li>{makeButtonEq(this.props.inventory.head,this.props.handleClick,2)}Head: {nameTheItem(this.props.inventory.head)}
        </li>
        <li>{makeButtonEq(this.props.inventory.body,this.props.handleClick,3)}Body: {nameTheItem(this.props.inventory.body)}
        </li>
        <li>{makeButtonEq(this.props.inventory.ring,this.props.handleClick,4)}Ring: {nameTheItem(this.props.inventory.ring)}
        </li>
        </ul>
      </div>
    );
  }
}

export default Equipment;
