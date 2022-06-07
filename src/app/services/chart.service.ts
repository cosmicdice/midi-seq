import { Injectable } from '@angular/core';
import { FactorType, SimParams } from '../data/presets';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  readonly yPos = 100;
  readonly SEC_PERIOD = Math.PI / 500; // 2 * PI / 1000

  constructor() { }

  getXPosition = function (i, amount) {
    return i / amount * 95 + 4 + "%";
  };

  getPositionRatio = (params: SimParams, i: number): number => {
    let position;
    if (params.reverse) {
      position = (params.size - (i + 1)) % (params.split) + 1;
    }
    else {
      position = i % params.split + 1;
    }
    switch (params.factorType) {
      case FactorType.GEOMETRIC:
        return Math.pow(params.factor, position - 1);
      case FactorType.ARITHMETIC:
        return params.factor * position + 1;
      case FactorType.POWER:
      default:
        return Math.pow(position, params.factor)
    }
  }

  getYPosition(params: SimParams, t: number, i: number) {
    let r = Math.sin((t * this.SEC_PERIOD) * params.time / 60 * this.getPositionRatio(params, i));
    return this.yPos - r * 80;
  }

  midiNote(params: SimParams, i: number) {
    return params.scale.notes[((i % params.select) + params.root - 1) % params.scale.notes.length];
  }

  redrawLabels(params: SimParams) {
    d3.select("#chart").selectAll("text").remove();
    let labelsDataset = d3.range(params.size);
    let midilabels = d3.select("#chart").select("g").selectAll("text.midi").data(labelsDataset);
    let factorlabels = d3.select("#chart").select("g").selectAll("text.factor").data(labelsDataset);
    midilabels.enter().append("text").classed("midi", true)
      .attr("x", (d, i) => this.getXPosition(i, params.size))
      .attr("y", (d) => 20).attr("font-size", () => "10")
      .text((d) => this.midiNote(params, d));
    factorlabels.enter().append("text").classed("factor", true)
      .attr("x", (d, i) => this.getXPosition(i, params.size))
      .attr("y", (d) => 190)
      .attr("font-size", () => "10")
      .text((d, i) => this.getPositionRatio(params, i).toFixed(2));
  }

  redrawBalls(params: SimParams) {
    d3.select("#chart").selectAll("circle").remove();
    let dataset = d3.range(params.size)
      .map(function () { return 40; });
    let circles = d3.select("#chart").select("g").selectAll("circle").data(dataset);
    circles.enter().append("circle")
      .attr("cx", (d, i) => this.getXPosition(i, params.size))
      .attr("cy", this.yPos)
      .attr("r", 10)
      .attr("fill", function (d, i) {
        return (i % 2 == 1) ? "darkblue" : "darkred";
      });
  }

}