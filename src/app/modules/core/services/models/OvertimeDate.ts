export class OvertimeDate {
    id: number;
    startDate: Date;
    endDate: Date;
    notes: string;

    overTimeSettings: OverTimeSettings[] | null;
}

export class OverTimeSettings {
    id: number;
    overTimeTypeId: number;
    overTimeTypeName: string;
    rate: number;
    startTime: Date;
    endTime: Date;
}