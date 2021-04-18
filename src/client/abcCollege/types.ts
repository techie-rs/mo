import { IMetricTileData } from '../components/MetricTile/types';

export interface IMetricDataRemote {
    isFetching: boolean;
    isFailed: boolean;
    data?: {
        data: IMetricTileData;
        message: string;
    }
};

export interface IState {
    abcCollege: {
        [key: string]: IMetricDataRemote
    }
};
