export interface RepairTask {
    id?: string;
    repairId: string;
    title: string;
    note: string;
    quantity: number;
    priceNoTax: number;
    price: number;
    type: RepairItemType;
}

export type RepairItemType = 'MATERIAL' | 'WORK' | 'OTHER';
