import { Category } from '../../../shared/api/costs/costs.service';

export interface Cost {
    id:string;
    vehicleId:string;
    category:Category;
    title:string;
    note:string;
    quantity:number;
    pricePerItem:number;
    totalPrice:number;
    odo:number;
    odo2:number;
    date:string;
}

export interface CostsCategory {
    id?:string;
    color?:string;
    title:string;
    description:string;
}
