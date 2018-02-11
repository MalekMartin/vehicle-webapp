import { Interval } from './interval.interface';

export interface Maintenance {
    id?:string;
    vehicleId:string;
    interval:Interval;
    odo:number;
    odo2:number;
    date:string;
    odoDone:number;
    odo2Done:number;
    dateDone:string;
    notes:string;
    status:string;
    price:number;
    repairId: string;
    repairTitle: string;
}
