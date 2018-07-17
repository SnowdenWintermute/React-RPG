import React, { Component } from 'react';
import Button from './Button'

//Draw the HP Bar

class NewGame extends Component {
  constructor(props){
    super(props)
    this.state={
      warScreen:false,
      rogueScreen:false,
      mageScreen:false
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
        //send class selection to main state
        this.props.getClass("war")
        //Set starting gear to warrior
        this.props.setStartingGear("Warrior")
        break
      case buttonName === "Rogue":
        this.setState({warScreen:false})
        this.setState({rogueScreen:true})
        this.setState({mageScreen:false})
        this.props.getClass("rogue")
        this.props.setStartingGear("Rogue")
        break
      case buttonName === "Mage":
        this.setState({warScreen:false})
        this.setState({rogueScreen:false})
        this.setState({mageScreen:true})
        this.props.setStartingGear("Mage")
        this.props.getClass("mage")
        break
      default:
      //nothing
    }
  }

  render() {
    //Buttons to select class, stored in variable to reuse
    const classButtons = <div className="menuBox" id="classButtons">
    <Button name="Warrior" key="warButton" handleClick={this.handleClick}/>
    <Button name="Rogue" key="rogueButton" handleClick={this.handleClick}/>
    <Button name="Mage" key="mageButton" handleClick={this.handleClick}/>
    </div>;

    if(this.state.warScreen){
      return(
        <div className="grid-container">
        {classButtons}
        <div className="menuBox" id="classDescriptions">
        A Warrior relies on strength (str) to gain more health and damage. They
        regenerate HP naturally.
        <br/>
        <br/>
        [Choose Warrior]
        <br/>
        <Button name="Start" key="war" handleClick={this.props.handleClick}/>
        </div>
        </div>
      );
    }
    if(this.state.rogueScreen){
      return(
        <div className="grid-container">
        {classButtons}
        <div className="menuBox" id="classDescriptions">
        Rogues use their dexterity (dex) to penetrate armor. They can pick the locks
        on treasure chests.
        <br/>
        <br/>
        [Choose Rogue]
        <br/>
        <Button name="Start" key="rogue" handleClick={this.props.handleClick}/>
        </div>
        </div>
      );
    }
    if(this.state.mageScreen){
      return(
        <div className="grid-container">
        {classButtons}
        <div className="menuBox" id="classDescriptions">
        Mages have a natural mana shield. Intelligence (int) is their weapon of choice.
        <br/>
        <br/>
        [Choose Mage]
        <br/>
        <Button name="Start" key="mage" handleClick={this.props.handleClick}/>
        </div>
        </div>
      );
    }
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

export default NewGame;
