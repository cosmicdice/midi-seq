import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PRESETS, Preset } from 'src/app/data/presets';
import { StorageService } from 'src/app/services/storage.service';
import { getScale } from 'src/app/data/scales';

@Component({
  selector: 'seq-presets',
  templateUrl: './presets.component.html',
  styleUrls: ['./presets.component.scss']
})
export class PresetsComponent implements OnInit {

  hardPresets = PRESETS;
  presets: Preset[];
  newName: string;
  selectedPreset: Preset;
  showPresets: boolean;

  @Output() loadPreset = new EventEmitter<Preset>();

  constructor(private storage: StorageService, private windowRef: Window) {
    this.showPresets = false;
    this.presets = this.storage.getPresetsFromStorage();
    if (!this.presets) {
      this.presets = this.hardPresets;
    }
    this.selectedPreset = this.presets[0];
    this.newName = "";
  }

  ngOnInit(): void {
    this.loadPreset.emit(this.selectedPreset);
  }

  load(p: Preset) {
    this.selectedPreset = p;
    this.loadPreset.emit(p);
  }

  save() {
    this.storage.writePresetsToStorage(this.presets);
  }

  delete(i: number) {
    this.presets.splice(i, 1);
  }

  export(p: Preset) {
    return JSON.stringify(p);
  }

  import() {
    if (this.newName) {
      this.windowRef.navigator.clipboard.readText().then(
        (clipText) => {
          let newPreset = JSON.parse(clipText) as Preset;
          // TODO check type properly
          if (newPreset.name && newPreset.params) {
            newPreset.name = this.newName;
            newPreset.params.scale = getScale(newPreset.params.scale.name);
            this.presets.push(newPreset);
            this.newName = "";
          }
        });
    }
  }

  new() {
    if (this.newName) {
      let newPreset = { ...this.selectedPreset, name: this.newName };
      newPreset.params.scale = getScale(newPreset.params.scale.name);
      this.presets.push(newPreset);
      this.selectedPreset = newPreset;
      this.loadPreset.emit(this.selectedPreset);
      this.newName = "";
    }

  }

  presetChange(p: Preset) {
    this.loadPreset.emit(p);
    this.selectedPreset = p;
  }

  reset() {
    this.presets = PRESETS;
    this.selectedPreset = this.presets[0];
    this.loadPreset.emit(this.selectedPreset);
  }


}
