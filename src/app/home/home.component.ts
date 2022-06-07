import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MidiService } from '../services/midi.service';

@Component({
  selector: 'seq-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  midiOutputs: WebMidi.MIDIOutput[];
  selectedMidiOutput: WebMidi.MIDIOutput;
  noteDuration: number;

  notes$ = new Subject<number>();
  selectedTab = 'arp';

  constructor(private windowRef: Window, private midi: MidiService) {
    this.midiOutputs = [];
    this.noteDuration = 1000;
  }

  ngOnInit(): void {
    this.midi.initMidiAccess(this.initMidi.bind(this));
    this.notes$.subscribe({
      next: (note) => this.midi.sendMidiNote(this.selectedMidiOutput, 1, note, this.noteDuration)
    });
  }

  initMidi(outputs: WebMidi.MIDIOutput[]): void {
    this.midiOutputs = outputs;
    if (this.midiOutputs.length) {
      this.selectedMidiOutput = this.midiOutputs[0];
    }
  }

  testMidiNote() {
    this.midi.sendMidiNote(this.selectedMidiOutput, 1, 60, this.noteDuration);
  }

}
