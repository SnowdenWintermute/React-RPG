import React, { Component } from 'react';
import InventoryItem from './InventoryItem'
import Button from './Button'
import EmptySlot from '../pics/eqMenuPics/EmptySlot.png'
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

//I Want to return an array of things like this:
// <p>{nameTheItem({type:"1h",dmg: 1, def: 0, str: 1, dex: 0, int: 0})}</p>

const makeButton = function(item,handleClick,itemSlot) {
  if(item.type!==""){
    return(<Button name="⌁" handleClick={handleClick} itemSlot={itemSlot}/>)
  }
}
const makeButtonEq = function(item,handleClick,itemSlot){
  if(item.type===""){
    return(<Button name="-" handleClick={handleClick}/>)
  }
  if(item.type!==""){
    if(item.type==="1H Weapon"||item.type==="Shield"){
    return(<div className="lrEqButton"><Button name="▷" handleClick={handleClick} itemSlot={itemSlot}/>
    <Button name="◁" handleClick={handleClick} itemSlot={itemSlot}/></div>)
    }else{
    return(<Button name="△" handleClick={handleClick} itemSlot={itemSlot}/>)
  }
  }
}

//the items
//item pic
const itemPic=function(item){
  let pic = {}
  switch(true){
    case item.type==="1H Weapon":
    pic = <img src={Right} className="itemPic" />
    break
    case item.type==="Shield":
    pic = <img src={Left} className="itemPic" />
    break
    case item.type==="Helm":
    pic = <img src={Head} className="itemPic" />
    break
    case item.type==="Armor":
    pic = <img src={Body} className="itemPic" />
    break
    case item.type==="Ring":
    pic = <img src={Ring} className="itemPic" />
    break
    case item.type==="":
    pic = <img src={EmptySlot} className="itemPic" />
    break
    default:
  }
  return pic;
}
//List the items to be rendered
const itemList=function(items,handleClick){
  let namedItemsList=[];
  let key = 0;
  items.forEach(function(item){
    namedItemsList.push(
    <div className="invItem" key={key.toString()}>
    {itemPic(item)}{nameTheItem(item)}{makeButton(item,handleClick,key)}{makeButtonEq(item,handleClick,key)}
    </div>);
      key= key+1
  })
    return namedItemsList;
  }


class ItemsMobile extends Component {
  render() {
    let items = [this.props.inventory.inv1,this.props.inventory.inv2, this.props.inventory.inv3];
    let itemOnGround = this.props.itemOnGround
    return (
      <div className="menuBox" id="itemsMobile">
      <div className="menuHeader"><h3>Items</h3></div>
        <div className="flexContainer">
        <div className="flexContainerSub">
        {itemList(items,this.props.handleClick)}
        </div>
        <div className = "flexContainerSub">
        <div className="stackableItemDiv">AutoInjectors: {this.props.inventory.autoInjectors}</div>
        <div className="stackableItemDiv">Shards: {this.props.inventory.shards}</div>
        <div className="stackableItemDiv"><Button name="Inject HP" handleClick={this.props.handleClick}/></div>
        <div className="stackableItemDiv"><Button name="Inject MP" handleClick={this.props.handleClick}/></div>
        </div>
        </div>
      </div>
    );
  }
}

export default ItemsMobile;
