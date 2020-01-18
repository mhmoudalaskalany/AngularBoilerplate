import { GroupRole } from './GroupRole';

export class Screen {
    id: number;
    nameFl: string;
    nameSl: string;
    isReport: boolean;
    urlPath: string;
    iconName: string;
    canShow: boolean;
    parentId: number;
    childernsWithPermission: GroupRole[];
}