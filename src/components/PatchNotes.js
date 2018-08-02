import React, { Component } from 'react';
import Button from './Button'


class PatchNotes extends Component {
  render() {
    return(
    <div className="patchNotes">
      <div className="deathScreenGrid">
        <div id = "patchNotesHeader">
        <h3>Patch Notes</h3>
        </div>
        <div id= "patchNotesList">
        <p>Patch 1.1</p>
        <ul>
        <li>Fixed a bug where Heat Lance was healing blue enemies.</li>
        <li>Fixed a bug where Acid Spines would not deal damage in some cases.</li>
        <li>Added combat log to death screen.</li>
        <li>Added patch notes page to welcome screen.</li>
        <li>Reduced the MP cost of warrior skills from 3 to 2.</li>
        <li>Increased the maximum Armor Spikes per level from 5 to 10.4</li>
        </ul>
        </div>
      </div>
    </div>
  )
  }
}

export default PatchNotes;
