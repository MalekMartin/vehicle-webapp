export interface Interval {
    id?:string;
    vehicleId:string;
    name:string;
    odo:number;
    odo2:number;
    months:number;
    note:string;
    inProgress?:boolean;
}
