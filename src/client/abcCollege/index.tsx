import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';
import MetricTile from '../components/MetricTile';
import { fetchMetricData, IConfigAction } from './action';
import {
    DOWNLOAD_POSTMAN_COLLECTION_TITLE,
    IMetricTileConstant,
    MAIN_TITLE,
    MetricTileOptions,
    POSTMAN_COLLECTION_ENDPOINT,
    SERVER_ENDPOINT
} from './constant';
import { IMetricDataRemote, IState } from './types';
import {
    Header,
    MainSection,
    DownloadCollection
} from './style';

const GlobalStyles = createGlobalStyle`
    html {
        --color-text: black;
        --color-background: white;
        --color-primary: #154c88;
        --color-white: #fff;
    }
`;

interface IAbcCollegeProps {
    [key: string]: IMetricDataRemote | any;
    dataToFetch: Array<{
        widgetKey: string;
        widgetConfig: IMetricTileConstant;
    }>;
    metrics: string[];
    fetchMetricData: (config: IConfigAction) => void;
};

function AbcCollege(props: IAbcCollegeProps) {

    useEffect(() => {
        const socket = socketIOClient('/');
        socket.on('REFRESH_DATA', data => {
          console.log(data);
        });
    });

    function getFullScreenMap(key: string = '') {
        const toReturn = props.metrics.reduce((acc: {
            [k: string]: boolean
        }, currentKey: string) => {
            if (currentKey === key) {
                acc[currentKey] = fullScreenMap[key] ? false : true;
            } else {
                acc[currentKey] = false;
            }
            return acc;
        }, {});
        return toReturn;
    }

    const [fullScreenMap, setFullScreenMap] = useState<{
        [k: string]: boolean
    }>(getFullScreenMap());

    useEffect(function () {
        const dataToFetch = props.dataToFetch || [];
        if (dataToFetch.length) {
            for (const { widgetKey: key, widgetConfig } of dataToFetch) {
                props.fetchMetricData({
                    key,
                    api: widgetConfig.api
                });
            }
        }
    }, [props]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function handleFullScreenChange(key: string) {
        setFullScreenMap(getFullScreenMap(key));
    }

    function renderHeader() {
        return (
            <Header>
                <div>
                    <h1>
                        {MAIN_TITLE}
                    </h1>
                </div>
                <div>
                    <DownloadCollection
                        href={POSTMAN_COLLECTION_ENDPOINT}
                        target='_blank'
                    >
                        {DOWNLOAD_POSTMAN_COLLECTION_TITLE}
                    </DownloadCollection>
                </div>
            </Header>
        );
    }

    function render() {
        return (
            <div>
                <GlobalStyles />
                {renderHeader()}
                <MainSection>
                    {props.metrics.map((metricKey: string) => {
                        const dataFromState = props[metricKey] || {};
                        const {
                            isFetching,
                            isFailed,
                            data = {}
                        } = dataFromState;
                        const apiSuccess = data.message === 'SUCCESS';
                        const tileData = data.data || {};

                        if (isFetching && !isFailed) {
                            return 'Loading....';
                        } else if (isFailed || !apiSuccess) {
                            return 'Something went wrong';
                        }

                        return apiSuccess && !isFailed && (
                            <div
                                key={metricKey}
                                className={`widget-container ${fullScreenMap[metricKey] ? 'full-screen-mode' : ''}`}
                            >
                                <MetricTile
                                    title={MetricTileOptions[metricKey].title}
                                    tileData={tileData}
                                    apiUrl={`${SERVER_ENDPOINT}${MetricTileOptions[metricKey].api}`}
                                    // isFullScreen={fullScreenMap[metricKey]}
                                    // handleFullScreenChange={() => handleFullScreenChange(metricKey)}
                                />
                            </div>
                        );
                    })}
                </MainSection>
            </div>
        );
    }

    return render();
}

function mapStateToProps(state: IState) {
    const toReturn: {
        dataToFetch: Array<{
            widgetKey: string;
            widgetConfig: IMetricTileConstant;
        }>;
        metrics: string[];
    } = {
        ...state.abcCollege,
        dataToFetch: [],
        metrics: []
    };
    for (const [widgetKey, widgetConfig] of Object.entries(MetricTileOptions)) {
        toReturn.metrics.push(widgetKey);
        const widgetStateData = state.abcCollege[widgetKey] || {};

        if (!widgetStateData.data && !widgetStateData.isFetching) {
            toReturn.dataToFetch.push({
                widgetKey,
                widgetConfig
            });
        }
    }
    return toReturn;
}

function mapDispatchToProps(dispatch: any) {
    return {
        fetchMetricData: (config: IConfigAction) => dispatch(fetchMetricData(config))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AbcCollege);
