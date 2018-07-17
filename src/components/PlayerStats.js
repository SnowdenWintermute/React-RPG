import React, { Component } from 'react';

class PlayerStats extends Component {
  render() {
    return (
      <div className="menuBox" id="playerStats">
        Player Stats
        <ul className="listNoStyle">
        <li>Class: {this.props.playerClass}
        </li>
        <li>HP: {this.props.stats.hp} / {this.props.stats.maxHp}
        </li>
        <li>MP: {this.props.stats.mp} / {this.props.stats.maxMp}
        </li>
        <li>DMG: {this.props.eq.dmg} + {this.props.stats.baseDmg} + ClassStat = {this.props.stats.tDmg}
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
      </div>
    );
  }
}

export default PlayerStats;
