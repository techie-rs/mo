import { SERVER_ENDPOINT } from './constant';

export { SERVER_ENDPOINT } from './constant';

export const METRIC_FETCH_ACTION = 'METRIC_FETCH';

export const METRIC_SUCCESS_ACTION = 'METRIC_SUCCESS';

export const METRIC_FAILED_ACTION = 'METRIC_FAILED';

export interface IConfigAction {
    api: string;
    key: string;
};

export function fetchMetricData({
    api,
    key
}: IConfigAction) {
    return function fetchData(dispatch: any) {
        dispatch({
            type: METRIC_FETCH_ACTION,
            payload: {
                key
            }
        });
        return fetch(`${SERVER_ENDPOINT}${api}`)
        .then(data => data.json())
        .then(response => dispatch({
            type: METRIC_SUCCESS_ACTION,
            payload: {
                key,
                data: response
            }
        }))
        .catch(err => dispatch({
            type: METRIC_FAILED_ACTION,
            payload: {
                key,
                err
            }
        }))
    };
}
