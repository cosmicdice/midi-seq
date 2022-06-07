export class Step {
    value: number;
}

export class Sequencer {

    position: number;
    steps: Step[];

    constructor(steps: number[]) {
        this.position = 0;

        this.steps = steps.map(step => {
            return { value: step }
        });
    }

    next(): number {
        // TODO manage direction/movement
        this.position++;
        if (this.position >= this.steps.length) {
            this.position = 0;
        }
        return this.currentStep();
    }

    reset(): number {
        this.position = 0;
        return this.currentStep();
    }

    currentStep(): number {
        return this.steps[this.position].value;
    }

    add() {
        this.steps.push({ value: 0 });
    }

    remove() {
        if (this.steps.length > 2) {
            this.steps.pop();
            if (this.position >= this.steps.length) {
                this.position = 0;
            }
        }
    }

    setAllToValue(value: number) {
        for (const step of this.steps) {
            step.value = value;
        }
    }

}

export class Trigger {

    phase: number;
    multiplier: number;
    private lastTrigger: number;

    constructor(multiplier: number, phase: number = 0) {
        this.phase = phase;
        this.multiplier = multiplier;
        this.lastTrigger = 0;
    }

    tick(t: number, bpm: number): boolean {
        let interval = 1 / (bpm * this.multiplier / 60) * 1000;
        if (this.phase) {
            t = t + interval * this.phase;
        }
        if (t - this.lastTrigger >= interval) {
            // save last trigger with drift correction
            this.lastTrigger = ~~(t / interval) * interval;
            return true;
        }
        return false;
    }

    reset() {
        this.lastTrigger = 0;
    }
}

export interface SeqLink {
    index: number;
    state: boolean;
}

export class Voice {
    seqLinks: SeqLink[];
    channel: number;

    constructor(seqsCount: number, state: boolean) {
        this.channel = 1;
        this.seqLinks = [];
        for (let index = 0; index < seqsCount; index++) {
            this.seqLinks.push({ index, state });
        }
    }

    getSeqIndexes(): number[] {
        let indexes = [];
        for (const link of this.seqLinks) {
            if (link.state) {
                indexes.push(link.index);
            }
        }
        return indexes;
    }
}

export interface LabelValue {
    label: string;
    value: number;
}

export const TIME_DIVISIONS: LabelValue[] = [
    {
        label: '1/16',
        value: 16
    },
    {
        label: '1/8',
        value: 8
    },
    {
        label: '1/4',
        value: 4
    },
    {
        label: '1/2',
        value: 2
    },
    {
        label: '1',
        value: 1
    },
    {
        label: '2',
        value: 0.5
    },
    {
        label: '4',
        value: 0.25
    },
    {
        label: '8',
        value: 0.125
    },
    {
        label: '16',
        value: 0.0625
    }
];