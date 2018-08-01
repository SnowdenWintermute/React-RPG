import React, { Component } from 'react';
import Button from "./Button"

class EnemyStats extends Component {
  render() {
    if(this.props.battleState.inCombat&&this.props.enemyStats.hp>0){
    return (
      <div className="menuBox" id="enemyStats">
      <div className="statGrid">
      <div id="enemyStatsHeader"><h3>Enemy Stats</h3></div>
      <div className="statDiv" id="enemyType">Type: {this.props.enemyType}
      </div>
      <div className="statDiv" id="enemyLevel">Level: {this.props.enemyStats.difficulty*this.props.battleState.dlvl}
      </div>
      <div className="statDiv" id="enemyHp">HP: {this.props.enemyStats.hp} / {this.props.enemyStats.maxHp}
      </div>
      <div className="statDiv" id="enemyMp">MP: {this.props.enemyStats.mp} / {this.props.enemyStats.maxMp}
      </div>
      <div className="statDiv" id="enemyDmg">DMG: {this.props.enemyStats.baseDmg}
      </div>
      <div className="statDiv" id="enemyDef">DEF: {this.props.enemyStats.def}
      </div>
      <div className="statDiv" id="enemyArmorPen">Armor Penetration: {Math.floor(this.props.enemyStats.dex/2)}
      </div>
      <div className="statDiv" id="enemyDifficulty">Difficulty: {this.props.enemyStats.difficulty} / 4
      </div>
      </div>
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
