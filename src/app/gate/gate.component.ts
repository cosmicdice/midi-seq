import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { LabelValue, Sequencer, Trigger, Voice } from './model';
import { Subject } from 'rxjs';
import { modulo } from './utils';
import { EMPTY_OCTAVE } from '../data/scales';


export interface TrigSeq {
  trig: Trigger;
  seq: Sequencer;
}

@Component({
  selector: 'seq-gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.scss']
})
export class GateComponent implements OnInit {

  @Input() notes: Subject<number>;

  tSeqs: TrigSeq[];
  clock: Trigger;
  timer: d3.Timer;
  voices: Voice[];

  bpm: number;
  root: number;

  semitones: boolean[];

  enabledSequencers: boolean[];

  // viewModel
  lastNote: number[];
  highlight: boolean[];
  stepViews: number[];

  timeDivisions: LabelValue[];

  constructor() {
    this.bpm = 30;
    this.root = 48;
    this.clock = new Trigger(16);
    this.tSeqs = [
      { seq: new Sequencer([0, 0]), trig: new Trigger(0.125) },
      { seq: new Sequencer([0, 0]), trig: new Trigger(0.25) },
      { seq: new Sequencer([0, 0]), trig: new Trigger(0.5) },
      { seq: new Sequencer([0, 0]), trig: new Trigger(1) },
      { seq: new Sequencer([0, 0]), trig: new Trigger(2) },
      { seq: new Sequencer([0, 0]), trig: new Trigger(4) },
      { seq: new Sequencer([0, 0]), trig: new Trigger(8) },
      { seq: new Sequencer([0, 0]), trig: new Trigger(16) }];

    this.highlight = [...EMPTY_OCTAVE];

    this.voices = [];
    this.voices.push(new Voice(this.tSeqs.length, true));
    this.voices.push(new Voice(this.tSeqs.length, false));
    this.voices.push(new Voice(this.tSeqs.length, false));
    this.stepViews = Array.from({ length: this.tSeqs.length }, () => (0));
    this.enabledSequencers = Array.from({ length: this.tSeqs.length }, () => (true));
  }

  ngOnInit(): void {

  }

  reset() {
    this.clock.reset();
    for (const tSeq of this.tSeqs) {
      tSeq.seq.reset();
      tSeq.trig.reset();
    }
  }

  start() {
    if (this.timer) {
      this.timer.stop();
    }
    this.reset();
    this.timer = d3.timer((t) => {


      // advance sequencers
      for (const tSeq of this.tSeqs) {
        if (tSeq.trig.tick(t, this.bpm)) {
          tSeq.seq.next();
        }
      }

      if (this.clock.tick(t, this.bpm)) {

        const notes: number[] = [];
        for (const voice of this.voices) {
          const seqIndexes = voice.getSeqIndexes();
          if (seqIndexes.length > 0) {
            let sum = 0;
            for (const seqIndex of seqIndexes) {
              if (this.enabledSequencers[seqIndex]) {
                sum += this.tSeqs[seqIndex].seq.currentStep();
              }
            }
            if (notes.indexOf(sum) == -1) {
              notes.push(sum);
            }
          }
        }
        this.lastNote = [];
        this.highlight = [...EMPTY_OCTAVE];
        for (const note of notes) {
          let quantizedNote = this.root + note;
          if (!this.isSemitonesEmpty(this.semitones)) {
            quantizedNote = this.quantize(quantizedNote, this.semitones);
          }

          // TODO Manage display for several notes
          this.lastNote.push(quantizedNote);
          this.highlight[this.notePosition(quantizedNote).position] = true;

          this.notes.next(quantizedNote);
        }
      }
    });
  }

  stop() {
    this.timer.stop();
  }

  changeStep(i: number, step: number) {
    this.stepViews[i] = step;
  }

  addStep(i: number) {
    if (this.tSeqs[i].seq.steps.length < 8) {
      this.tSeqs[i].seq.add();
    }
  }

  removeStep(i: number) {
    this.tSeqs[i].seq.remove();
    const newLength = this.tSeqs[i].seq.steps.length;
    if (this.stepViews[i] >= newLength) {
      this.stepViews[i] = newLength - 1;
    }
  }

  resetSequencer(i) {
    this.tSeqs[i].seq.setAllToValue(0);
  }

  toggleSequencer(i) {
    this.enabledSequencers[i] = !this.enabledSequencers[i];
  }

  semitonesChanged(semitones: boolean[]) {
    this.semitones = semitones;
  }

  private notePosition(note: number): { octave: number, position: number } {
    const octave = Math.floor((note - 24) / 12);
    const position = note - 24 - octave * 12
    return { octave, position };
  }

  private quantize(note: number, semitones: boolean[]): number {
    let { octave, position } = this.notePosition(note);
    while (!semitones[modulo(position, 12)]) {
      position--;
    }
    return position + 24 + octave * 12;
  }


  isSemitonesEmpty(semitones: boolean[]): boolean {
    for (const semitone of semitones) {
      if (semitone) {
        return false;
      }
    }
    return true;
  }

  computeSequenceLength(): void {
    let sequencesView = this.tSeqs
      .filter(triggerSequencer => triggerSequencer.seq.steps
        .filter(step => step.value !== 0).length
      ).map(tSeq => {
        return {
          divisions: tSeq.trig.multiplier,
          steps: tSeq.seq.steps.length
        }
      });
    console.log(sequencesView);

  }

}
