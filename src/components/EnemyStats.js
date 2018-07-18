import React, { Component } from 'react';

class EnemyStats extends Component {
  render() {
    if(this.props.battleState.inCombat){
    return (
      <div className="menuBox" id="enemyStats">
      <h3>Enemy Stats</h3>
      <ul className="listNoStyle">
      <li>Type: {this.props.enemyType}
      </li>
      <li>HP: {this.props.enemyStats.hp} / {this.props.enemyStats.maxHp}
      </li>
      <li>MP: {this.props.enemyStats.mp} / {this.props.enemyStats.maxMp}
      </li>
      <li>Difficulty: {this.props.enemyStats.difficulty} / 6
      </li>
      </ul>
      </div>
          );
        }
    if(!this.props.battleState.inCombat){
    return (
      <div className="menuBox" id="enemyStats">
      <h3>Enemy Stats</h3>
      <p>There is no monster in this room...</p>
      </div>
           );
         }
       }
     }

export default EnemyStats;
