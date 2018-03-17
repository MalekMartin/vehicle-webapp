export interface Fuel {
    id?: string;
    vehicleId: string;
    date: string;
    quantity: number;
    pricePerLiter: number;
    price: number;
    odo: number;
    odo2: number;
    fullTank: boolean;
    note: string;
    consumption: number;
    distance?: number;
    hoursDistance?: number;
    consumptionHours?: number;
}
