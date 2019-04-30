export interface Tire {
    id?:string;
    vehicleId?:string;
    dot: number;
    purchaseDate:string;
    priceEach:number;
    quantity:number;
    totalPrice:number;
    description:string;
    status:string;
    brand:string;
    model:string;
    dimensions:string;
    notes:string;
    odo:number;
    odo2:number;
    tireOdo:number;
    tireOdo2:number;
}

export interface TiresObject {
    active: Tire[];
    trash: Tire[];
    stock: Tire[];
    properties: TireProperties[];
}

export interface TireProperties {
    id: string;
    vehicleId: string;
    name: string;
    tooltip: string;
    value: string;
}

export interface TireProperty {
    id?:string;
    vehicleId?:string;
    name:string;
    value:string;
    tooltip:string;
}

export interface TirePropertyExt extends TireProperty {
    status: string;
}

