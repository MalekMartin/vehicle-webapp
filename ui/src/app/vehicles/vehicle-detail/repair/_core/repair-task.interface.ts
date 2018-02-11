export interface RepairTask {
    id?: string;
    repairId: string;
    title: string;
    note: string;
    quantity: number;
    priceNoTax: number;
    price: number;
    type: 'MATERIAL' | 'WORK' | 'OTHER';
}
