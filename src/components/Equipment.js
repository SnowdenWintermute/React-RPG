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

class Equipment extends Component {
  render() {
    return (
      <div className="menuBox" id="equipment">
      <Button name="Battle Menu" key="bm" handleClick={this.props.handleClick}/>
      <br/>

        <div id="eqlist">
        <div className="menuHeader"><h3>Equipment</h3>
        </div>
        <div className="eqSlot"><div className="eqButtonAndIcon">{makeButtonEq(this.props.inventory.mainHand,this.props.handleClick,0)}{<img src={Right} className="itemPic" />}: </div>{nameTheItem(this.props.inventory.mainHand)}
        </div>
        <div className="eqSlot"><div className="eqButtonAndIcon">{makeButtonEq(this.props.inventory.offHand,this.props.handleClick,1)}{<img src={Left} className="itemPic" />}: </div>{nameTheItem(this.props.inventory.offHand)}
        </div>
        <div className="eqSlot"><div className="eqButtonAndIcon">{makeButtonEq(this.props.inventory.head,this.props.handleClick,2)}{<img src={Head} className="itemPic" />}: </div>{nameTheItem(this.props.inventory.head)}
        </div>
        <div className="eqSlot"><div className="eqButtonAndIcon">{makeButtonEq(this.props.inventory.body,this.props.handleClick,3)}{<img src={Body} className="itemPic" />}: </div>{nameTheItem(this.props.inventory.body)}
        </div>
        <div className="eqSlot"><div className="eqButtonAndIcon">{makeButtonEq(this.props.inventory.ring,this.props.handleClick,4)}{<img src={Ring} className="itemPic" />}: </div>{nameTheItem(this.props.inventory.ring)}
        </div>
        </div>
      </div>
    );
  }
}

export default Equipment;
