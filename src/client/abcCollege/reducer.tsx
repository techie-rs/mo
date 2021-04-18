import { IMetricTileData, IStats } from '../components/MetricTile/types';
import {
    METRIC_FETCH_ACTION,
    METRIC_SUCCESS_ACTION,
    METRIC_FAILED_ACTION
} from './action';
import { MetricTileOptions } from './constant';

const defaultState = Object.keys(MetricTileOptions)
    .reduce((acc: any, currentOption: string) => {
        acc[currentOption] = MetricTileOptions[currentOption].data;
        return acc;
    }, {});

export interface IMetricAction {
    type: string;
    payload: {
        key: string;
        data?: IMetricTileData
    }
}

export default function abcCollegeReducer(
    state: IStats = defaultState,
    action: IMetricAction) {
    switch (action.type) {

        case METRIC_FETCH_ACTION: {
            const { key } = action.payload;
            return {
                ...state,
                [key]: {
                    ...state[key],
                    isFetching: true
                }
            }
        };

        case METRIC_SUCCESS_ACTION: {
            const { key, data } = action.payload;
            return {
                ...state,
                [key]: {
                    ...state[key],
                    isFetching: false,
                    isFailed: false,
                    data
                }
            }
        };

        case METRIC_FAILED_ACTION: {
            const { key } = action.payload;
            return {
                ...state,
                [key]: {
                    ...state[key],
                    isFailed: true,
                    isFetching: false
                }
            }
        };

        default: return state;
    }
}
