import { RepairTask } from './repair-task.interface';

export interface Repair {
    id?: string;
    vehicleId: string;
    title: string;
    odo: number;
    odo2: number;
    garageId: string;
    garageName?: string;
    date: string;
    totalPrice: number;
    notes: string;
    tasks: RepairTask[];
    tax: number;
}
