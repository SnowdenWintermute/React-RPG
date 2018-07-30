import React, { Component } from 'react';
import Button from './Button'

//Draw the HP Bar

class DeathScreen extends Component {
  render() {
    return(
    <div className="deathScreen">
      <div className="deathScreenGrid">
        <div className="deathScreenItem" id="youDied">
        <h3> You Died </h3>
        </div>
        <div className="deathScreenItem" id="startOverButtonHolder">
        <Button name="Start Over" handleClick={this.props.handleClick}/>
        </div>
      </div>
    </div>
  )
  }
}

export default DeathScreen;
