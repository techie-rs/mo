export const MAIN_TITLE = ' ABC College of engineering';

export const SERVER_ENDPOINT: string = 'http://13.232.99.42';

export const DOWNLOAD_POSTMAN_COLLECTION_TITLE = 'Download Postman Collection';
export const POSTMAN_COLLECTION_ENDPOINT = `${SERVER_ENDPOINT}/postman/assignment.postman_collection.json`;

export type IMetricTileConstant = {
    api: string;
    title: string;
    data: null;
};

export const MetricTileOptions: {
    [key: string]: IMetricTileConstant
} = {
    buyers: {
        api: '/get_buyer',
        title: 'Buyers',
        data: null
    },
    income: {
        api: '/get_income',
        title: 'Income',
        data: null
    },
    highlights: {
        api: '/get_highlight',
        title: 'Highlights',
        data: null
    },
    countries: {
        api: '/get_country',
        title: 'Countries',
        data: null
    }
};
