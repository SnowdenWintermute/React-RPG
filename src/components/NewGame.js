import React, { Component } from 'react';
import Button from './Button'
import Warrior from '../pics/charPics/warrior.png'
import Rogue from '../pics/charPics/rogue.png'
import Mage from '../pics/charPics/mage.png'
import RedSlime from '../pics/enemyPics/redSlime.png';
import GreenSlime from '../pics/enemyPics/greenSlime.png';
import BlueSlime from '../pics/enemyPics/blueSlime.png';
import Head from '../pics/eqMenuPics/Head.png'
import Body from '../pics/eqMenuPics/Body.png'
import Ring from '../pics/eqMenuPics/Ring.png'
import PatchNotes from './PatchNotes'

import ClickSound from '../sounds/mouseClick.wav'

//Draw the HP Bar

class NewGame extends Component {
  constructor(props){
    super(props)
    this.state={
      warScreen:false,
      rogueScreen:false,
      mageScreen:false,
      startScreen:true,
      patchScreen:false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = function(buttonName){
    const clickSound = new Audio();
    clickSound.src = ClickSound
    clickSound.play();
    switch(true){
      case buttonName === "Warrior":
        //Change screens in char selection
        this.setState({warScreen:true})
        this.setState({rogueScreen:false})
        this.setState({mageScreen:false})
        this.setState({startScreen:false})
        this.setState({patchScreen:false})
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
        this.setState({patchScreen:false})
        this.props.getClass("rogue")
        this.props.setStartingGear("Rogue")
        break
      case buttonName === "Mage":
        this.setState({warScreen:false})
        this.setState({rogueScreen:false})
        this.setState({mageScreen:true})
        this.setState({startScreen:false})
        this.setState({patchScreen:false})
        this.props.setStartingGear("Mage")
        this.props.getClass("mage")
        break
        case buttonName === "Welcome":
          this.setState({warScreen:false})
          this.setState({rogueScreen:false})
          this.setState({mageScreen:false})
          this.setState({startScreen:true})
          this.setState({patchScreen:false})
          break
        case buttonName === "v 1.1":
        this.setState({warScreen:false})
        this.setState({rogueScreen:false})
        this.setState({mageScreen:false})
        this.setState({startScreen:false})
        this.setState({patchScreen:true})
      default:
      //nothing
    }
  }

  render() {
    //Buttons to select class, stored in variable to reuse
    const classButtons = <div className="menuBox" id="classButtons">
    <Button name="Welcome" key="startScreenButton" handleClick={this.handleClick} />
    <Button name="Warrior" key="warButton" handleClick={this.handleClick}/>
    <Button name="Rogue" key="rogueButton" handleClick={this.handleClick}/>
    <Button name="Mage" key="mageButton" handleClick={this.handleClick}/>
    </div>;
    if(this.state.patchScreen){
      return(
        <div className="grid-container">
          {classButtons}
          <div className="menuBox" id="classDescriptions">
            <div className="startScreenGrid">
            <div id = "patchNotesHeader">
            <h3>Patch Notes</h3>
            </div>
            <div id= "patchNotesList">
            <p>Patch 1.1</p>
            <ul>
            <li>Fixed a bug where Heat Lance was healing blue enemies.</li>
            <li>Fixed a bug where Acid Spines would not deal damage in some cases.</li>
            <li>Added combat log to death screen.</li>
            <li>Added patch notes page to welcome screen.</li>
            <li>Reduced the MP cost of warrior skills from 3 to 2.</li>
            <li>Increased the maximum Armor Spikes per level from 5 to 10.4</li>
            </ul>
            </div>
            </div>
          </div>
        </div>
      )
    }
    if(this.state.warScreen){
      return(
        <div className="grid-container">
          {classButtons}
          <div className="menuBox" id="classDescriptions">
            <div className="startScreenGrid">
              <div className="className">
              <h3>Warrior</h3>
              </div>
              <div className="classInfo">
              Warriors rely on their strength (STR) to win battles. They regenerate HP naturally.
              </div>
              <div className="move1Name">
              Armor Break
              </div>
              <div className="move1Description">
              Cost: 2 MP. Deals normal damage and destroys enemy armor equal to a fraction of your STR. Leveling up increases fraction (1/3,2/3,3/3).
              </div>
              <div className="move2Name">
              Stun
              </div>
              <div className="move2Description">
              Cost: 2 MP. Deals normal damage and attempts to stun the enemy. Stun chance is based on enemy level and skill level.
              </div>
              <div className="move3Name">
              Spiked Armor
              </div>
              <div className="move3Description">
              Cost: 1-30 shards. Adorn your armor with spikes, dealing damage to attackers. Leveling up increases the number of spikes your armor can have (10 per level).
              </div>
              <div className="passiveName">
              Regeneration
              </div>
              <div className="passiveDescription">
              HP regenerates after each turn of combat and each room explored. The amount regenerated is based on your level.
              </div>
              <div className="startButtonHolder">
              <Button name="Start" key="warrior" handleClick={this.props.handleClick}/>
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
              Cost: 1 shard per arrow. Shoot an arrow at the enemy that deals normal damage. The enemy can not retaliate. Level up increases the number of arrows you can shoot per battle.
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
              <div className="className">
              <h3>Mage</h3>
              </div>
              <div className="classInfo">
              Mages use their intelligence (INT) to weaken their enemies or burst them down. Mages have a naturally regenerating mana shield.
              </div>
              <div className="move1Name">
              Heat Lance
              </div>
              <div className="move1Description">
              Cost: 3/6/9 MP. Burn an enemy for normal damage plus a fraction of your INT. Leveling up increases fraction (1/3,2/3,3/3).
              </div>
              <div className="move2Name">
              Eat Shard
              </div>
              <div className="move2Description">
              Cost: 1 shard. Eat a shard to regain HP and MP. Leveling up increases amount gained (2/4/6).
              </div>
              <div className="move3Name">
              Weaken
              </div>
              <div className="move3Description">
              Cost: 3/6/9 MP. Curse your enemy, weakening their attack by a fraction of your INT + skill level. Leveling up increases fraction (1/3,2/3,3/3).
              </div>
              <div className="passiveName">
              Mana Shield
              </div>
              <div className="passiveDescription">
              Damage must first deplete your MP before it can reach your HP. MP refreshes after each turn of combat and each room explored. The amount refreshed is based on your level.
              </div>
              <div className="startButtonHolder">
              <Button name="Start" key="mage" handleClick={this.props.handleClick}/>
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
          <div className="startScreenGrid">
            <div id="welcomeTitle">
            <h3>React RPG <Button name="v 1.1" handleClick={this.handleClick}/></h3>
            </div>
            <div id="welcomeSubTitle">
            Welcome to the dungeon.
            </div>
            <div id="chooseAClass">
            Choose a class
            </div>
            <div id="chooseAClassPics">
              <img src={Warrior}/>
              <img src={Rogue}/>
              <img src={Mage}/>
            </div>
            <div id="defeatEnemies">
            Defeat enemies
            </div>
            <div id="defeatEnemiesPics">
              <img src={RedSlime}/>
              <img src={GreenSlime}/>
              <img src={BlueSlime}/>
            </div>
            <div id="collectLoot">
            Collect Loot
            </div>
            <div id="collectLootPics">
              <img src={Head}/>
              <img src={Body}/>
              <img src={Ring}/>
            </div>
            <div id="reachLevel10">
            Reach level 10 to win!
            </div>
            <div id="signature">
            Created with React.js by Mike Silverman (v1.0)
            </div>
          </div>
        </div>
      </div>
    );
  }
  }
}

export default NewGame;
