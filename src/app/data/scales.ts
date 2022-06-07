export interface Scale {
    name: string;
    notes: number[];
}

export const SCALES: Scale[] = [
    { name: "Chromatic", notes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95] },
    { name: "BiYu", notes: [24, 27, 31, 34, 36, 39, 43, 46, 48, 51, 55, 58, 60, 63, 67, 70, 72, 75, 79, 82, 84, 87, 91, 94, 96, 99, 103, 106, 108, 111, 115, 118] },
    { name: "Blues", notes: [41, 42, 43, 46, 48, 51, 53, 54, 55, 58, 60, 63, 65, 66, 67, 70, 72, 75, 77, 78, 79, 82, 84, 87, 89, 90, 91, 94, 96, 99, 101, 102] },
    { name: "BluesDiminished", notes: [48, 49, 51, 52, 54, 55, 56, 58, 60, 61, 63, 64, 66, 67, 68, 70, 72, 73, 75, 76, 78, 79, 80, 82, 84, 85, 87, 88, 90, 91, 92, 94] },
    { name: "Dorian", notes: [25, 27, 30, 32, 34, 37, 39, 42, 44, 46, 49, 51, 54, 56, 58, 61, 63, 66, 68, 70, 73, 75, 78, 80, 82, 85, 87, 90, 92, 94, 97, 99] },
    { name: "FullMinor", notes: [51, 53, 55, 56, 57, 58, 59, 60, 62, 63, 65, 67, 68, 69, 70, 71, 72, 74, 75, 77, 79, 80, 81, 82, 83, 84, 86, 87, 89, 91, 92, 93] },
    { name: "HarmonicMajor", notes: [44, 47, 48, 50, 52, 53, 55, 56, 59, 60, 62, 64, 65, 67, 68, 71, 72, 74, 76, 77, 79, 80, 83, 84, 86, 88, 89, 91, 92, 95, 96, 98] },
    { name: "Hawaiian", notes: [39, 43, 45, 47, 48, 50, 51, 55, 57, 59, 60, 62, 63, 67, 69, 71, 72, 74, 75, 79, 81, 83, 84, 86, 87, 91, 93, 95, 96, 98, 99, 103] },
    { name: "IonianSharp5", notes: [45, 47, 48, 50, 52, 53, 56, 57, 59, 60, 62, 64, 65, 68, 69, 71, 72, 74, 76, 77, 80, 81, 83, 84, 86, 88, 89, 92, 93, 95, 96, 98] },
    { name: "JazzMinor", notes: [45, 47, 48, 50, 51, 53, 55, 57, 59, 60, 62, 63, 65, 67, 69, 71, 72, 74, 75, 77, 79, 81, 83, 84, 86, 87, 89, 91, 93, 95, 96, 98] },
    { name: "Lydian", notes: [45, 47, 48, 50, 52, 54, 55, 57, 59, 60, 62, 64, 66, 67, 69, 71, 72, 74, 76, 78, 79, 81, 83, 84, 86, 88, 90, 91, 93, 95, 96, 98] },
    { name: "Major", notes: [43, 45, 48, 50, 51, 52, 54, 55, 57, 60, 62, 63, 64, 66, 67, 69, 72, 74, 75, 76, 78, 79, 81, 84, 86, 87, 88, 90, 91, 93, 96, 98] },
    { name: "Mixolydian", notes: [45, 46, 48, 50, 52, 53, 55, 57, 58, 60, 62, 64, 65, 67, 69, 70, 72, 74, 76, 77, 79, 81, 82, 84, 86, 88, 89, 91, 93, 94, 96, 98] },
    { name: "Oriental", notes: [45, 46, 48, 49, 52, 53, 54, 57, 58, 60, 61, 64, 65, 66, 69, 70, 72, 73, 76, 77, 78, 81, 82, 84, 85, 88, 89, 90, 93, 94, 96, 97] },
    { name: "SuperLocrian", notes: [44, 46, 48, 49, 51, 52, 54, 56, 58, 60, 61, 63, 64, 66, 68, 70, 72, 73, 75, 76, 78, 80, 82, 84, 85, 87, 88, 90, 92, 94, 96, 97] },
    { name: "VerdiEnigmaticAscending", notes: [46, 47, 48, 49, 52, 54, 56, 58, 59, 60, 61, 64, 66, 68, 70, 71, 72, 73, 76, 78, 80, 82, 83, 84, 85, 88, 90, 92, 94, 95, 96, 97] },
    { name: "Zirafkend", notes: [48, 50, 51, 53, 55, 56, 57, 59, 60, 62, 63, 65, 67, 68, 69, 71, 72, 74, 75, 77, 79, 80, 81, 83, 84, 86, 87, 89, 91, 92, 93, 95] }
];

export function getScale(name: string) {
    return SCALES.find((scale) => name === scale.name);
}

export const EMPTY_OCTAVE = [false, false, false, false, false, false,
    false, false, false, false, false, false];

export const FULL_OCTAVE = [true, true, true, true, true, true,
    true, true, true, true, true, true];

export const OCTAVE_MIDI_1 = [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
export const OCTAVE_MIDI_2 = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
export const OCTAVE_MIDI_3 = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
export const OCTAVE_MIDI_4 = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71];
export const OCTAVE_MIDI_5 = [72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83];
export const OCTAVE_MIDI_6 = [84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95];
export const OCTAVE_MIDI_7 = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107];
export const OCTAVE_MIDI_8 = [108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119];
export const OCTAVES_MIDI = [OCTAVE_MIDI_1, OCTAVE_MIDI_2, OCTAVE_MIDI_3, OCTAVE_MIDI_4,
    OCTAVE_MIDI_5, OCTAVE_MIDI_6, OCTAVE_MIDI_7, OCTAVE_MIDI_8];


export class Scale2 {
    name: string;
    // 12 semi-tones toggles
    semitones: boolean[][];
    // repeating octaves between 1 to 8
    private _repeatOctave: number;
    get repeatOctave(): number {
        return this._repeatOctave;
    }
    set repeatOctave(value: number) {
        // clean value
        value = (value) ? value : 1;
        value = Math.floor(value);
        value = (value > 8) ? 8 : value;
        value = (value < 1) ? 1 : value;

        const diff = value - this._repeatOctave;
        if (diff === 0) {
            return;
        }
        this._repeatOctave = value;
    }

    constructor() {
        this.name = null;
        this.semitones = Array.from({ length: 8 }, (_, i) => [...EMPTY_OCTAVE]);
        this._repeatOctave = 1;
    }

    getMidiNotes(): number[] {
        let octaves = 8;
        let notes = [];
        for (let oct = 0; oct < octaves; oct++) {
            this.semitones[oct].forEach((toggle, index) => {
                if (toggle) {
                    notes.push(24 + index + 12 * oct)
                }
            });
        }
        return notes;
    }


    private getNotesForOctave(note: number): number[] {
        const octave = Math.floor((note - 24) / 12) + 1;
        return Array.from({ length: 12 }, (_, i) => i + 24 + 12 * octave);
    }

    fromMidiNotes(notes: number[]) {
        if (notes) {
            const octaveNotes = this.getNotesForOctave(notes[0]);
            const midiNotesInRange = notes.filter(note => note <= octaveNotes[11]);
            let newToggles = [];
            octaveNotes.forEach((octNote) => {
                newToggles.push(midiNotesInRange.includes(octNote));
            });
            this.semitones = Array.from({ length: 8 }, (_, i) => [...newToggles]);
        } else {
            this.semitones = Array.from({ length: 8 }, (_, i) => [...EMPTY_OCTAVE]);
        }
    }

    toggleNote(octave, semitone) {
        this.semitones[octave][semitone] = !this.semitones[octave][semitone];
    }
}