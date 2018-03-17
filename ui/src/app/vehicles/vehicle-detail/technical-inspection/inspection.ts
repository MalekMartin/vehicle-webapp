export interface Inspection {
    id?:string;
    vehicleId:string;
    date:string;
    expirationDate:string;
    repeated:boolean;
    note:string;
    price:number;
    stationId?:string;
    odo?: number;
    name?: string;
}
