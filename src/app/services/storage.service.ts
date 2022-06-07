import { Injectable } from '@angular/core';
import { Preset } from '../data/presets';
import { getScale } from '../data/scales';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  readonly PRESETS_ITEM = 'presets';

  storage: Storage
  constructor(private windowRef: Window) {
    this.storage = this.windowRef.localStorage;
  }

  getPresetsFromStorage(): Preset[] {
    let presetsStr = this.storage.getItem(this.PRESETS_ITEM);
    if (presetsStr) {
      let presets = JSON.parse(presetsStr) as Preset[]
      return presets.map((preset) => {
        preset.params.scale = getScale(preset.params.scale.name);
        return preset;
      });
    }
    return null;
  }

  writePresetsToStorage(presets: Preset[]) {
    if (presets) {
      let presetsStr = JSON.stringify(presets);
      this.storage.setItem(this.PRESETS_ITEM, presetsStr);
    }
  }

}
