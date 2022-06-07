import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FULL_OCTAVE, EMPTY_OCTAVE } from 'src/app/data/scales';

@Component({
  selector: 'seq-semitones',
  templateUrl: './semitones.component.html',
  styleUrls: ['./semitones.component.scss']
})
export class SemitonesComponent implements OnInit {

  @Input() active: boolean = true;
  @Input() highlight: boolean[];
  @Output() changed = new EventEmitter<boolean[]>();

  semitones: boolean[];

  constructor() {
    this.semitones = [...FULL_OCTAVE];
    this.highlight = [...EMPTY_OCTAVE]
  }

  ngOnInit(): void {
    this.changed.emit(this.semitones);
  }

  toggleNote(semitone: number) {
    this.semitones[semitone] = !this.semitones[semitone];
    this.changed.emit(this.semitones);
  }

}
