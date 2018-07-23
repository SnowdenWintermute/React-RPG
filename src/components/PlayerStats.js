import React, { Component } from 'react';

class PlayerStats extends Component {
  render() {
    return (
      <div className="menuBox" id="playerStats">
        <ul className="listNoStyle">
        <li>Player Stats
        </li>
        <li>Class: {this.props.playerClass}
        </li>
        <li>LVL: {this.props.stats.lvl}</li>
        <li>HP: {this.props.stats.hp} / {this.props.stats.maxHp}
        </li>
        <li>MP: {this.props.stats.mp} / {this.props.stats.maxMp}
        </li>
        <li>DMG: {this.props.stats.tDmg}
        </li>
        <li>DEF: {this.props.eq.def}
        </li>
        <li>STR: {this.props.eq.str}
        </li>
        <li>DEX: {this.props.eq.dex}
        </li>
        <li>INT: {this.props.eq.int}
        </li>
        </ul>
        Actions Taken: {this.props.actionCounter} Enemies Defeated: {this.props.enemiesDefeated}
      </div>
    );
  }
}

export default PlayerStats;
