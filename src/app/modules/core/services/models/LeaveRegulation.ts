import { LeaveRegulationBalance } from './LeaveRegulationBalance';
import { LeaveRegulationCalculation } from './LeaveRegulationCalculation';

export class LeaveRegulation {
    id: number;
    leaveTypeId: number;
    leaveTypeName: string;

    countryId: number;
    countryName: string;

    leaveNameFl: string;
    leaveNameSl: string;

    genderId: number;

    leaveRegulationReligions: LeaveRegulationReligion[];

    isSpecialToGeneralManager: boolean;
    isNeedApproval: boolean;
    isRelatedToSalary: boolean;
    calculateAfterDays: number;
    attachmentsTypeId: number;

    balancePerYear: number;

    leaveRegulationBalance: LeaveRegulationBalance;
    leaveRegulationCalculation: LeaveRegulationCalculation;
}

export class LeaveRegulationReligion {
    leaveRegulationId: number;
    religionId: number;
}
