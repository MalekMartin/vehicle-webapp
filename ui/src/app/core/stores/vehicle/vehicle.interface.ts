export interface VehicleInfoFormModel {
    id: string;
    brand: string;
    model: string;
    manufactureYear: number;
    spz: string;
    previousOwners: number;
    type: 'CAR' | 'MOTORCYCLE';
    notes: string;
}
