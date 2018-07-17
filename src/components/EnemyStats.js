import React, { Component } from 'react';

class EnemyStats extends Component {
  render() {
    return (
      <div className="menuBox" id="enemyStats">

      Enemy Stats
      <ul className="listNoStyle">
      <li>HP: {this.props.stats.hp}
      </li>
      <li>MP: {this.props.stats.mp}
      </li>
      </ul>
      </div>
    );
  }
}

export default EnemyStats;
