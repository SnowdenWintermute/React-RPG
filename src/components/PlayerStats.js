import React, { Component } from 'react';

class PlayerStats extends Component {
  render() {
    return (
      <div className="menuBox" id="playerStats">
      <div className="statGrid">
      <div id="playerStatsHeader"><h3>Player Stats</h3>
      </div>
        <div className="statDiv" id="playerLvl">LVL {this.props.stats.lvl} {this.props.playerClass}
        </div>
        <div className="statDiv" id="playerHp">HP: {this.props.stats.hp} / {this.props.stats.maxHp}
        </div>
        <div className="statDiv" id="playerMp">MP: {this.props.stats.mp} / {this.props.stats.maxMp}
        </div>
        <div className="statDiv" id="playerDmg">DMG: {this.props.stats.tDmg} (ignore {(Math.floor(this.props.eq.dex/2))} armor)
        </div>
        <div className="statDiv" id = "playerDef">DEF: {this.props.eq.def}
        </div>
        <div className="statDiv" id="playerStr">STR: {this.props.eq.str}
        </div>
        <div className="statDiv" id="playerDex">DEX: {this.props.eq.dex}
        </div>
        <div className="statDiv" id="playerInt">INT: {this.props.eq.int}
        </div>
        <div className="statDiv" id="actionsTaken">Actions Taken: {this.props.actionCounter}
        </div>
        <div className="statDiv" id="enemiesDefeated">Enemies Defeated: {this.props.enemiesDefeated}
        </div>
        <div className="statDiv" id="rocf">ROCF: {this.props.battleState.timesExploredOnCurrentFloor}
        </div>
        </div>
      </div>
    );
  }
}

export default PlayerStats;
