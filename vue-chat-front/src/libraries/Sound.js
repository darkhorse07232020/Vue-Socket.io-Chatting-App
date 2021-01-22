/**                  
 *  _____    _____ ___________ _______  ____  
 *  \__  \  /     \\____ \__  \\_  __ \/  _ \ 
 *   / __ \|  Y Y  \  |_> > __ \|  | \(  <_> )
 *  (____  /__|_|  /   __(____  /__|   \____/ 
 *       \/      \/|__|       \/              
 * 
 * Class for generate audio
 * Uses https://github.com/Tonejs/Tone.js
 *
 */

import { Synth } from "tone"

class Sound {

    constructor() {

        // New tone.js synth
        this.synth = new Synth({
            oscillator: {
                type: 'triangle8'
            },
            envelope: {
                attack: 2,
                decay: 1,
                sustain: 0.4,
                release: 4
            }
        }).toMaster()
          
    }
 
    playNotification () {

        this.synth.triggerAttackRelease("C4", "8n")

    }

}

export default Sound