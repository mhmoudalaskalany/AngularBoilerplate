import { UserLocation } from './UserLocation';

 export class UserMangment {
         id: number;
         employeeId:number;
         employeeNO:string;
         employeeNameSl:string;
         employeeNameFl:string;
         groupId:number;
         groupNameFL:string;
         groupNameSL:string;
         isActive:boolean;
         expireDate:Date;
         administrativeLevelId:number;
         locationId:number;
         isEndOfContract:boolean;
         userLocation: UserLocation[];
        }