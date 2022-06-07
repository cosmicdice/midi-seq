import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Scale2, Scale, SCALES } from 'src/app/data/scales';
import { Preset } from 'src/app/data/presets';

@Component({
  selector: 'seq-scales',
  templateUrl: './scales.component.html',
  styleUrls: ['./scales.component.scss']
})
export class ScalesComponent implements OnInit {

  @Input() preset: Preset;

  @Output() parameterChange = new EventEmitter<void>();

  scale: Scale2;

  octavesView: number[];


  scales: Scale[];

  showKeys: boolean;
  showAllOctaves: boolean;

  constructor() {
    this.scale = new Scale2();
    this.octavesView = this.range(8);
    this.scales = SCALES;
    this.showKeys = false;
    this.showAllOctaves = true;
  }

  ngOnInit(): void {
    this.scaleChanged();
  }

  toggleNote(octave: number, semitone: number) {
    this.scale.toggleNote(octave, semitone);
    this.preset.params.scale.notes = this.scale.getMidiNotes();
    this.parameterChanged();
  }

  showAllOctavesToggle() {
    if (this.showAllOctaves) {
      this.octavesView = this.range(8);
    }
    else {
      this.octavesView = this.range(this.scale.repeatOctave);
    }
  }

  scaleChanged() {
    this.scale.fromMidiNotes(this.preset.params.scale.notes);
    this.parameterChanged();
  }

  repeatOctavesChanged() {
    if (!this.showAllOctaves) {
      this.octavesView = this.range(this.scale.repeatOctave);
    }
  }

  parameterChanged() {
    this.parameterChange.emit();
  }

  private range(length) {
    return Array.from({ length }, (_, i) => i);
  }

}
