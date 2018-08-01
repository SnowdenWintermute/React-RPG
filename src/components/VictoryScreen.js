import React, { Component } from 'react';
import Button from './Button'


class VictoryScreen extends Component {
  render() {
    return(
    <div className="deathScreen">
      <div className="deathScreenGrid">
        <div className="deathScreenItem" id="youDied">
        <h3> You Win! </h3>
        </div>
        <div id="gameStatsHeader">
        Stats
        </div>
        <div id="gameStatsActions">
        Actions Taken: {this.props.actionCounter}
        </div>
        <div id="gameStatsEnemiesDefeated">
        Enemies Slain: {this.props.enemiesDefeated}
        </div>
        <div id="creditsAndShoutouts">
        Thank you to Art365, erretres, jcunanan05, AbdulMoiz, shimphillip on freeCodeCamp forums. Credit to Calciumtrice for the art. Made with React.js by Mike Silverman (SnowdenWintermute).
        </div>
        <div className="deathScreenItem" id="startOverButtonHolder">
        <Button name="Start Over" handleClick={this.props.handleClick}/>
        </div>
      </div>
    </div>
  )
  }
}

export default VictoryScreen;
