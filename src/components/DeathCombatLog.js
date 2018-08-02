import React, { Component } from 'react';
import Button from './Button'

class DeathCombatLog extends Component {
  render() {
    return (
      <div className="menuBox" id="deathCombatLog">
        <textarea
        id="combatLogText"
        value={this.props.log}
        >
        </textarea>
      </div>
    );
  }
}

export default DeathCombatLog;
