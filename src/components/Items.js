import React, { Component } from 'react';
import InventoryItem from './InventoryItem'
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

//I Want to return an array of things like this:
// <p>{nameTheItem({type:"1h",dmg: 1, def: 0, str: 1, dex: 0, int: 0})}</p>

const makeButton = function(item,handleClick) {
  if(item.type===""){
    return(<Button name="." handleClick={handleClick}/>)
  }
}

//the items
//List the items to be rendered
const itemList=function(items,handleClick){
  let namedItemsList=[];
  let key = 0;
  items.forEach(function(item){
    namedItemsList.push(
    <li className="invItem" key={key.toString()}>
    {nameTheItem(item)}{makeButton(item,handleClick)}
    </li>);
  })
  key++
    return namedItemsList;
  }


class Items extends Component {
  render() {
    let items = [this.props.inventory.inv1,this.props.inventory.inv2, this.props.inventory.inv3];
    let itemOnGround = this.props.itemOnGround
    return (
      <div className="menuBox" id="items">
        <ul className="listNoStyle">
        <li>Items </li>
        {itemList(items,this.props.handleClick)}
        </ul>
      </div>
    );
  }
}

export default Items;
