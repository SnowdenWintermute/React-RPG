import React, { Component } from 'react';
import InventoryItem from './InventoryItem'
import Button from './Button'
import Autoinjector from '../pics/eqMenuPics/autoinjector.png'

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
  }else{
    return(<Button name="-" handleClick={handleClick}/>)
  }
}
const makeButtonEq = function(item,handleClick,itemSlot){
  if(item.type!==""){
    if(item.type==="1H Weapon"||item.type==="Shield"){
    return(<div className="onehEqButtonHolder"><Button name="▷" handleClick={handleClick} itemSlot={itemSlot}/>
    <Button name="◁" handleClick={handleClick} itemSlot={itemSlot}/></div>)
    }else{
    return(<Button name="▽" handleClick={handleClick} itemSlot={itemSlot}/>)
  }
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
    {nameTheItem(item)}{makeButton(item,handleClick,key)}{makeButtonEq(item,handleClick,key)}
    </li>);
      key= key+1
  })
    return namedItemsList;
  }


class Items extends Component {
  render() {
    let items = [this.props.inventory.inv1,this.props.inventory.inv2, this.props.inventory.inv3];
    let itemOnGround = this.props.itemOnGround
    return (
      <div className="menuBox" id="items">
        <div className="itemsGrid">
          <div className="itemDiv" id="itemsHeader"><h3>Items</h3></div>
          <div className="itemDiv" id="itemName1">{nameTheItem(this.props.inventory.inv1)}</div>
          <div className="itemDiv" id ="itemButton1">{makeButton(this.props.inventory.inv1,this.props.handleClick,0)}
          </div>
          <div className="itemDiv" id ="itemEqButton1">{makeButtonEq(this.props.inventory.inv1,this.props.handleClick,0)}
          </div>
          <div className="itemDiv" id="itemName2">{nameTheItem(this.props.inventory.inv2)}</div>
          <div className="itemDiv" id ="itemButton2">{makeButton(this.props.inventory.inv2,this.props.handleClick,1)}
          </div>
          <div className="itemDiv" id ="itemEqButton2">{makeButtonEq(this.props.inventory.inv2,this.props.handleClick,1)}
          </div>
          <div className="itemDiv" id="itemName3">{nameTheItem(this.props.inventory.inv3)}</div>
          <div className="itemDiv" id ="itemButton3">{makeButton(this.props.inventory.inv3,this.props.handleClick,2)}
          </div>
          <div className="itemDiv" id ="itemEqButton3">{makeButtonEq(this.props.inventory.inv3,this.props.handleClick,2)}
          </div>
          <div className="itemDiv" id ="autoInjectors">AutoInjectors: {this.props.inventory.autoInjectors}
          </div>
          <div className="itemDiv" id ="shards">Shards: {this.props.inventory.shards}
          </div>
          <div className="itemDiv" id ="injectHp"><Button name="Inject HP" handleClick={this.props.handleClick}/>
          </div>
          <div className="itemDiv" id ="autoinjectorPicHolder"><img src={Autoinjector} id="autoinjectorPic"/>
          </div>
          <div className="itemDiv" id ="injectMp"><Button name="Inject MP" handleClick={this.props.handleClick}/>
          </div>
          <div className="itemDiv" id ="menuButtonHolder"><Button name="Menu" handleClick={this.props.handleClick}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Items;
