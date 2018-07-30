import React, { Component } from 'react';
import Button from './Button'

//Draw the HP Bar

class NewGame extends Component {
  constructor(props){
    super(props)
    this.state={
      warScreen:false,
      rogueScreen:false,
      mageScreen:false,
      startScreen:true
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = function(buttonName){
    switch(true){
      case buttonName === "Warrior":
        //Change screens in char selection
        this.setState({warScreen:true})
        this.setState({rogueScreen:false})
        this.setState({mageScreen:false})
        this.setState({startScreen:false})
        //send class selection to main state
        this.props.getClass("war")
        //Set starting gear to warrior
        this.props.setStartingGear("Warrior")
        break
      case buttonName === "Rogue":
        this.setState({warScreen:false})
        this.setState({rogueScreen:true})
        this.setState({mageScreen:false})
        this.setState({startScreen:false})
        this.props.getClass("rogue")
        this.props.setStartingGear("Rogue")
        break
      case buttonName === "Mage":
        this.setState({warScreen:false})
        this.setState({rogueScreen:false})
        this.setState({mageScreen:true})
        this.setState({startScreen:false})
        this.props.setStartingGear("Mage")
        this.props.getClass("mage")
        break
        case buttonName === "Welcome":
          this.setState({warScreen:false})
          this.setState({rogueScreen:false})
          this.setState({mageScreen:false})
          this.setState({startScreen:true})
          break
      default:
      //nothing
    }
  }

  render() {
    //Buttons to select class, stored in variable to reuse
    const classButtons = <div className="menuBox" id="classButtons">
    <Button name="Welcome" key="startScreenButton" handleClick={this.handleClick}/>
    <Button name="Warrior" key="warButton" handleClick={this.handleClick}/>
    <Button name="Rogue" key="rogueButton" handleClick={this.handleClick}/>
    <Button name="Mage" key="mageButton" handleClick={this.handleClick}/>
    </div>;
    if(this.state.warScreen){
      return(
        <div className="grid-container">
          {classButtons}
          <div className="menuBox" id="classDescriptions">
            <div className="startScreenGrid">
              <div className="classInfo">A Warrior relies on strength (str) to gain more health and damage. They
              regenerate HP naturally.
              </div>
              <div className="startButtonHolder">
              <Button name="Start" key="war" handleClick={this.props.handleClick}/>
              </div>
              </div>
            </div>
        </div>
      );
    }
    if(this.state.rogueScreen){
      return(
        <div className="grid-container">
          {classButtons}
          <div className="menuBox" id="classDescriptions">
            <div className="startScreenGrid">
              <div className="className">
              <h3>Rogue</h3>
              </div>
              <div className="classInfo">
              Rogues use their dexterity (dex) to penetrate armor. They can pick the locks
              on treasure chests.
              </div>
              <div className="move1Name">
              Arrow
              </div>
              <div className="move1Description">
              Cost: 1 Shard per arrow. Shoot an arrow at the enemy that deals normal damage. The enemy can not retaliate. Level up increases the number of arrows you can shoot per battle.
              </div>
              <div className="move2Name">
              Mana Leak
              </div>
              <div className="move2Description">
              Cost: 4/3/2 MP. Destroy enemy MP equal to a fraction of your DEX, then deal normal damage. Leveling up increases fraction (1/3,2/3,3/3).
              </div>
              <div className="move3Name">
              Flee
              </div>
              <div className="move3Description">
              Cost: 4/3/2 MP. Escapes the battle. Leveling up decreases MP cost.
              </div>
              <div className="passiveName">
              Lockpick
              </div>
              <div className="passiveDescription">
              Use a shard instead of an autoinjector to pick the lock of a chest.
              </div>
              <div className="startButtonHolder">
              <Button name="Start" key="rogue" handleClick={this.props.handleClick}/>
              </div>
              </div>
            </div>
        </div>
      );
    }
    if(this.state.mageScreen){
      return(
        <div className="grid-container">
          {classButtons}
          <div className="menuBox" id="classDescriptions">
            <div className="startScreenGrid">
              <div className="classInfo">
              Mages have a natural mana shield. Intelligence (int) is their weapon of choice.
              </div>
              <div className="startButtonHolder">
              <Button name="Start" key="war" handleClick={this.props.handleClick}/>
              </div>
              </div>
            </div>
        </div>
      );
    }
    if(this.state.startScreen){
    return (
      <div className="grid-container">
      {classButtons}
      <div className="menuBox" id="classDescriptions">
      Choose a class then press Start.
      </div>
      </div>
    );
  }
  }
}

export default NewGame;
