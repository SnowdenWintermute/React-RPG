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
    return(<Button name="△" handleClick={handleClick} itemSlot={itemSlot} />)
  }else{
    return(<Button name="-" handleClick={handleClick} />)
  }
}

class Equipment extends Component {
  render() {
    return (
      <div className="menuBox" id="equipment">
        <div id="eqGrid">

        <div className="itemDiv" id="equipmentHeader"><h3>Equipment</h3>
        </div>
        <div className="itemDiv" id="mhButton">{makeButtonEq(this.props.inventory.mainHand,this.props.handleClick,0)}
        </div>
        <div className="itemDiv" id="mhPic">{<img src={Right} className="itemPic" />}
        </div>
        <div className="itemDiv" id="mhName">{nameTheItem(this.props.inventory.mainHand)}
        </div>
        <div className="itemDiv" id="ohButton">{makeButtonEq(this.props.inventory.offHand,this.props.handleClick,1)}
        </div>
        <div className="itemDiv"  id="ohPic">{<img src={Left} className="itemPic" />}
        </div>
        <div className="itemDiv" id="ohName">{nameTheItem(this.props.inventory.offHand)}
        </div>
        <div className="itemDiv" id="headButton">{makeButtonEq(this.props.inventory.head,this.props.handleClick,2)}
        </div>
        <div className="itemDiv" id="headPic">{<img src={Head} className="itemPic" />}
        </div>
        <div className="itemDiv" id="headName">{nameTheItem(this.props.inventory.head)}
        </div>
        <div className="itemDiv" id="bodyButton">{makeButtonEq(this.props.inventory.body,this.props.handleClick,3)}
        </div>
        <div className="itemDiv" id="bodyPic">{<img src={Body} className="itemPic" />}
        </div>
        <div className="itemDiv" id="bodyName">{nameTheItem(this.props.inventory.body)}
        </div>
        <div className="itemDiv" id="ringButton">{makeButtonEq(this.props.inventory.ring,this.props.handleClick,4)}
        </div>
        <div className="itemDiv" id="ringPic">{<img src={Ring} className="itemPic" />}
        </div>
        <div className="itemDiv" id="ringName">{nameTheItem(this.props.inventory.ring)}
        </div>

        </div>
      </div>
    );
  }
}

export default Equipment;
