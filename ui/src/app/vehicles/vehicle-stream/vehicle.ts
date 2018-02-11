import { Trade } from '../../shared/api/trade/trade';

export interface Vehicle {
    id: string;
    brand: string;
    model: string;
    manufactureYear: number;
    purchaseDate: string;
    price: number;
    mileage: number;
    engineHours: number;
    spz: string;
    hasFile: boolean;
    dateOfSale?: string;
}

export interface VehicleInfo {
    info: Info;
    engine: Engine;
    buyer: Trade;
    seller: Trade;
}

export interface Info {
    id: string;
    brand: string;
    model: string;
    type: 'MOTORCYCLE' | 'CAR';
    manufactureYear: number;
    previousOwners: number;
    spz: string;
    notes: string;
    tankCapacity: number;
    units: string;
    subUnits: string;
    hasImage: boolean;
}

export interface Engine {
    cylinders: string;
    dilutionRatio: string;
    displacement: string;
    engineOil: string;
    engineType: '4T' | '2T';
    fuel: string;
    fuelOil: string;
    power: number;
    transmission: number;
    transmissionType: 'AUTO' | 'MANUAL';
    vehicleId: string;
}
