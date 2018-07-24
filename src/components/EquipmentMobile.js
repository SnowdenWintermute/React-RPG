import React, { Component } from 'react';
import Button from './Button'
import Right from '../pics/eqMenuPics/Right.png'
import Left from '../pics/eqMenuPics/Left.png'
import Head from '../pics/eqMenuPics/Head.png'
import Body from '../pics/eqMenuPics/Body.png'
import Ring from '../pics/eqMenuPics/Ring.png'


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

class EquipmentMobile extends Component {
  render() {
    return (
      <div className="menuBox" id="equipmentMobile">
        <div className="menuHeader"><h3>Equipment</h3>
        </div>

        <div id="eqMobileGrid">

        <div className="eqButton" id="eqMainHandButton">
        {makeButtonEq(this.props.inventory.mainHand,this.props.handleClick,0)}
        </div>
        <div className="eqIcon" id="eqMainHandIcon">
        {<img src={Right} className="itemPic" />}
        </div>
        <div className="eqItemName" id="eqMainHandName">
        {nameTheItem(this.props.inventory.mainHand)}
        </div>

        <div className="eqButton" id="eqOffHandButton">
        {makeButtonEq(this.props.inventory.offHand,this.props.handleClick,1)}
        </div>
        <div className="eqIcon" id="eqOffHandIcon">
        {<img src={Left} className="itemPic" />}
        </div>
        <div className="eqItemName" id="eqOffHandName">
        {nameTheItem(this.props.inventory.offHand)}
        </div>

        <div className="eqButton" id="eqHeadButton">
        {makeButtonEq(this.props.inventory.head,this.props.handleClick,2)}
        </div>
        <div className="eqIcon" id="eqHeadIcon">
        {<img src={Head} className="itemPic" />}
        </div>
        <div className="eqItemName" id="eqHeadName">
        {nameTheItem(this.props.inventory.head)}
        </div>

        <div className="eqButton" id="eqBodyButton">
        {makeButtonEq(this.props.inventory.body,this.props.handleClick,3)}
        </div>
        <div className="eqIcon" id="eqBodyIcon">
        {<img src={Body} className="itemPic" />}
        </div>
        <div className="eqItemName" id="eqBodyName">
        {nameTheItem(this.props.inventory.body)}
        </div>

        <div className="eqButton" id="eqRingButton">
        {makeButtonEq(this.props.inventory.ring,this.props.handleClick,4)}
        </div>
        <div className="eqIcon" id="eqRingIcon">
        {<img src={Ring} className="itemPic" />}
        </div>
        <div className="eqItemName" id="eqRingName">
        {nameTheItem(this.props.inventory.ring)}
        </div>

        </div>
      </div>
    );
  }
}

export default EquipmentMobile;
