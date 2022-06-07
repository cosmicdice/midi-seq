import { Injectable } from '@angular/core';
import * as d3 from 'd3';


export class MidiMessages {
  static readonly NOTE_ON = 0x90;
  static readonly NOTE_OFF = 0x80;
}

@Injectable({
  providedIn: 'root'
})
export class MidiService {
  private outputs: WebMidi.MIDIOutput[];
  private playedNotes: d3.Timer[];

  // Send a noteOff Message when note is repeated
  // logic don't support repeat noteons without noteoffs by default
  sendNoteOffOnRepeat: boolean;

  constructor(private windowRef: Window) {
    this.outputs = [];
    this.playedNotes = Array.from({ length: 128 }, () => (null));

    this.sendNoteOffOnRepeat = true;
  }

  initMidiAccess(callback: (outputs?: WebMidi.MIDIOutput[]) => void) {
    if (navigator.requestMIDIAccess) {
      console.log('WebMIDI support found');
      this.windowRef.navigator.requestMIDIAccess({ sysex: true }).then((midiAccess: WebMidi.MIDIAccess) => {
        this.outputs = [];
        midiAccess.outputs.forEach(output => { this.outputs.push(output) });
        console.log(this.outputs);
        callback(this.outputs);
      }), () => {
        console.log('WebMIDI init failed');
      };
    } else {
      console.log('WebMIDI is not supported in this browser.');
    }
  }

  getOutputs(): WebMidi.MIDIOutput[] {
    return this.outputs;
  }

  sendMidiNote(output: WebMidi.MIDIOutput, channel: number, note: number, duration: number): void {
    if (output && note >= 0 && note <= 127) {
      const noteOnMessage = [MidiMessages.NOTE_ON + channel - 1, note, 0x7f];
      const noteOffMessage = [MidiMessages.NOTE_OFF + channel - 1, note, 0x40];
      // if note held, stop current timer
      let noteOffTimer: d3.Timer;
      if (noteOffTimer = this.playedNotes[note]) {
        noteOffTimer.stop();
        if (this.sendNoteOffOnRepeat) {
          output.send(noteOffMessage);
        }
      }
      // play note and timeout noteoff message
      output.send(noteOnMessage);
      this.playedNotes[note] = d3.timeout(() => {
        output.send(noteOffMessage);
        this.playedNotes[note] = null;
      }, duration);
    }
  }
}
