import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { Subject } from 'rxjs';
import { PRESETS, Preset, SimParams, FACTOR_TYPES } from 'src/app/data/presets';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'seq-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() notes: Subject<number>;
  presets = PRESETS;
  factorTypes = FACTOR_TYPES;

  readonly SEC_PERIOD = Math.PI / 500; // 2 * PI / 1000
  selectedTab = 'time';

  running: boolean;
  timer: d3.Timer;
  time: number = 0;

  preset: Preset;
  params: SimParams;
  updateFunc: (elapsed: number) => void;
  lastTapTempo: number;

  constructor(private chart: ChartService) {
    this.running = false;
    this.timer = null;

    this.preset = PRESETS[0];
    this.params = this.preset.params;
  }

  ngOnInit(): void {
    this.timer = this.initGraph();
    this.timer.stop();
  }

  // TODO, move to service without losing params ref
  private initGraph(): d3.Timer {
    let sensitivity = 21;
    let pushedNotes = Array<boolean>(this.params.size).fill(false);

    this.chart.redrawBalls(this.params);
    this.chart.redrawLabels(this.params);

    this.updateFunc = (t) => {
      let offTime = t + this.params.start * 1000;
      this.time = offTime / 1000;
      if (this.params.loop != 0) {
        if (t >= this.params.loop * 1000) {
          this.timer.restart(this.updateFunc);
        }
      }
      d3.select("#chart").selectAll("circle")
        .attr("cy", (d, i) => {
          let newPos = this.chart.getYPosition(this.params, offTime, i);
          if (newPos <= sensitivity) {
            if (!pushedNotes[i]) {
              this.notes.next(this.chart.midiNote(this.params, i));

              pushedNotes[i] = true;
            }
          }
          else {
            pushedNotes[i] = false;
          }
          return newPos;
        }).attr("fill", (d, i) => {
          let newPos = this.chart.getYPosition(this.params, offTime, i);
          if (newPos <= sensitivity) {
            return "purple";
          }
          else {
            return (i % 2 == 1) ? "darkblue" : "darkred";
          }
        });
    }
    return d3.timer(this.updateFunc);
  }

  startGraph(): void {
    if (this.timer) {
      this.timer.stop();
    }
    this.timer = this.initGraph();
    this.running = true;
  }

  stopGraph(): void {
    if (this.timer) {
      this.timer.stop();
      this.running = false;
    }
  }

  presetChange(p: Preset) {
    //Fixme, manage preset change properly and move from ngModel
    this.preset = p;
    this.params = p.params;
    this.refreshAll();
  }

  refreshLabels() {
    this.chart.redrawLabels(this.params);
  }

  refreshAll() {
    this.chart.redrawBalls(this.params);
    this.chart.redrawLabels(this.params);
  }

  tapTempo() {
    let now = window.performance.now();
    if (this.lastTapTempo) {
      let time = now - this.lastTapTempo;
      this.params.time = Math.round(60000 / time);

      console.log('Tap tempo: ' + this.params.time);
    }
    this.lastTapTempo = now;
  }

  // TODO : Refactor perform buttons as component
  performRoot(offset: number) {
    this.params.root += offset;
    if (this.params.root < 1) {
      this.params.root = 1;
    }
    this.refreshLabels();
  }

}
