export interface SingleStatsModel {
    name: string;
    value: number;
}

export interface MultiStatsModel {
    name: string;
    series: SingleStatsModel[];
}
