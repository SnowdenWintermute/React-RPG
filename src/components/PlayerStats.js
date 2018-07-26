import React, { Component } from 'react';

class PlayerStats extends Component {
  render() {
    return (
      <div className="menuBox" id="playerStats">
      <div className="menuHeader"><h3>Player Stats</h3>
      </div>
        <ul className="listNoStyle">
        <li>LVL {this.props.stats.lvl} {this.props.playerClass}</li>
        <li>HP: {this.props.stats.hp} / {this.props.stats.maxHp} MP: {this.props.stats.mp} / {this.props.stats.maxMp}
        </li>
        <li>DMG: {this.props.stats.tDmg} (ignore {(Math.floor(this.props.eq.dex/2))} armor)
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
        <p>Actions Taken: {this.props.actionCounter}</p>
        <p>Enemies Defeated: {this.props.enemiesDefeated}</p>
      </div>
    );
  }
}

export default PlayerStats;
