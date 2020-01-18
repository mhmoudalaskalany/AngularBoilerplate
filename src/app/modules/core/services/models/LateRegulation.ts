import { LateRegulationValue } from './LateRegulationValue';

export class LateRegulation {
    id: number;
    code: string;
    lateRegulationFL: string;
    lateRegulationSL: string;
    startDate: Date;
    endDate: Date;
    allowance: number;
    lateBalance: number;
    deductionGroupTypeId: number;
    deductionCategoreID: number;
    deductionUnitID: number|null;
    notes: string;
    quarterDayFrom: number|null;
    quarterDayTo: number|null;
    halfDayFrom: number|null;
    halfDayTo: number|null;
    threeQuarterDayFrom: number|null;
    threeQuarterDayTo: number|null;
    fullDayFrom: number|null;
    fullDayTo: number|null;
    deductionGroupTypeName: string;
    lengthOfServiceFrom: number|null;
    lengthOfServiceTo: number|null;
    valueID: number[] |null;
    lateRegulationValues :LateRegulationValue [];
}