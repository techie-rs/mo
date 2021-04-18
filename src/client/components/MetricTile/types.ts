export type IMetricDataItem = {
    label: string;
    value: number;
    color: string;
};

export type IDataSet = {
    header: string[];
    data: IMetricDataItem[];
};

export type IMetricAttribute = {
    label: string;
    value: number;
};

export type IStats = {
    [k: string]: IMetricAttribute;
};

export type IMetricFilter = {
    label: string;
    value: number;
};

export interface IMetricTileData {
    dataSet: IDataSet;
    stats: IStats;
    filter: IMetricFilter;
};
