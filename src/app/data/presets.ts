import { getScale, Scale } from './scales';

export interface Preset {
    name: string;
    params: SimParams;
}


export enum FactorType {
    POWER = 'Power', GEOMETRIC = 'Geometric', ARITHMETIC = 'Arithmetic'
}
export const FACTOR_TYPES = [FactorType.POWER, FactorType.GEOMETRIC, FactorType.ARITHMETIC];

export interface SimParams {
    scale: Scale,
    size: number;
    root: number;
    select: number;
    split: number;
    factor: number;
    factorType: FactorType;
    time: number;
    start: number;
    loop: number;
    reverse: boolean; // reverse distribution
}

export const PRESETS: Preset[] = [
    {
        name: 'DEFAULT', params: {
            scale: getScale('Chromatic'),
            size: 16,
            root: 1,
            select: 16,
            split: 16,
            factor: 1,
            factorType: FactorType.POWER,
            time: 2,
            start: 0,
            loop: 0,
            reverse: false
        }
    },
    {
        name: 'Asymmetric Funk',
        params: {
            scale: getScale('Dorian'),
            size: 20,
            select: 8,
            root: 12,
            split: 12,
            factor: 0.5,
            factorType: FactorType.POWER,
            time: 8,
            start: 0,
            loop: 0,
            reverse: true
        }
    },
    {
        name: 'Atmospheric Guitar',
        params: {
            scale: getScale('Lydian'),
            size: 18,
            select: 7,
            root: 8,
            split: 9,
            factor: -1,
            factorType: FactorType.POWER,
            time: 55,
            start: 0,
            loop: 0,
            reverse: false
        }
    },
    {
        name: 'Mysterious Pad',
        params: {
            scale: getScale('Oriental'),
            size: 12,
            select: 6,
            root: 8,
            split: 12,
            factor: 0.8,
            factorType: FactorType.POWER,
            time: 5,
            start: 0,
            loop: 0,
            reverse: false
        }
    },
    {
        name: "Ominous Piano",
        params: {
            scale: getScale('FullMinor'),
            size: 24,
            root: 16,
            select: 16,
            split: 24,
            factor: 0.67,
            factorType: FactorType.POWER,
            time: 2,
            start: 0,
            loop: 0,
            reverse: true
        }
    },
    {
        name: "Drunk Drummer",
        params: {
            scale: getScale('Chromatic'),
            size: 8,
            root: 25,
            select: 8,
            split: 32,
            factor: 0.9,
            factorType: FactorType.POWER,
            time: 20,
            start: 0,
            loop: 0,
            reverse: true
        }
    },
    {
        name: "Transposable Pad",
        params:
        {
            scale: getScale('Dorian'),
            size: 24,
            select: 8,
            root: 16,
            split: 12,
            factor: 0.8,
            factorType: FactorType.POWER,
            time: 5,
            start: 12,
            loop: 1.5,
            reverse: false
        }
    }


];