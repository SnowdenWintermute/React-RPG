import React, { Component } from 'react';
import Button from "./Button"

class EnemyStats extends Component {
  render() {
    if(this.props.battleState.inCombat&&this.props.enemyStats.hp>0){
    return (
      <div className="menuBox" id="enemyStats">
      <Button name="Battle Menu" handleClick={this.props.handleClick}/>
      <div className="menuHeader"><h3>Enemy Stats</h3></div>
      <ul className="listNoStyle">
      <li>Type: {this.props.enemyType}
      </li>
      <li>Difficulty: {this.props.enemyStats.difficulty} / 6
      </li>
      <li>HP: {this.props.enemyStats.hp} / {this.props.enemyStats.maxHp}
      </li>
      <li>MP: {this.props.enemyStats.mp} / {this.props.enemyStats.maxMp}
      </li>
      <li>DMG: {this.props.enemyStats.baseDmg}
      </li>
      <li>DEF: {this.props.enemyStats.def}
      </li>
      <li>Armor Penetration: {Math.floor(this.props.enemyStats.dex/2)}
      </li>
      </ul>
      </div>
          );
        }
    if(this.props.battleState.inCombat&&this.props.enemyStats.hp<1){
    return (
      <div className="menuBox" id="enemyStats">
      <div className="menuHeader"><h3>Enemy Stats</h3></div>
      <p>The monster lies defeated.</p>
      </div>
           );
         }
      if(this.props.battleState.stairs){
        return (
          <div className="menuBox" id="enemyStats">
          <div className="menuHeader"><h3>The Stairs</h3></div>
          <p>The stairs lead deeper into the dungeon. You hear the sounds of more dangerous monsters below...</p>
          <p>On the stairs you notice a vending machine. It will accept three shards for one autoinjector.</p>
          </div>
               );
      }
      if(this.props.battleState.treasureRoom){
        return (
          <div className="menuBox" id="enemyStats">
          <div className="menuHeader"><h3>Treasure Room</h3></div>
          <p>A locked box is on the floor. An autoinjector can break the lock.</p>
          </div>
               );
      }
       }
     }

export default EnemyStats;
