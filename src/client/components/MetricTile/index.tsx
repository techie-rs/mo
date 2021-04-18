import React, { useState } from 'react';
import {
    TileContainer,
    TileHeader,
    TileBody,
    FilterWrapper,
    StatsContainer,
    DataContainer,
    ApiNavigator,
    StatsData,
    HeaderWrapper,
    DataWrapperTable,
    ResizerButton
} from './style';
import {
    IMetricDataItem,
    IMetricTileData
} from './types';

interface IMetricTileProps {
    tileData: IMetricTileData;
    title: string;
    apiUrl?: string;
    isFullScreen?: boolean;
    handleFullScreenChange?: () => void;
};

function MetricTile({
    tileData,
    title,
    apiUrl,
    isFullScreen,
    handleFullScreenChange
}: IMetricTileProps) {
    const {
        dataSet,
        stats,
        filter
    } = tileData || {};

    const [selectedSortOption, setSelectedSortOption] = useState<string>();

    function handleSortOptionChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedSortOption(event.target.value);
    }

    function getSortedData() {
        const data = [...dataSet.data];
        return selectedSortOption ?
            ((selectedSortOption === 'label') ? data.sort() : data.sort((a, b) => (b.value - a.value)))
            : data;
    }


    function renderTileHeader() {

        return (
            <TileHeader>
                <h3>{title}</h3>
                <FilterWrapper>
                    <select value={selectedSortOption} onChange={handleSortOptionChange}>
                        {Object.keys(filter).map((filterKey: string) => {
                            return (
                                <option value={filterKey} key={filterKey}>
                                    {`Sort by ${filterKey}`}
                                </option>
                            );
                        })}
                    </select>
                    <ResizerButton
                        onClick={handleFullScreenChange}
                    >
                        {!isFullScreen ?
                            <i className="fa fa-arrows-alt" />
                            : <i className="fa fa-minus" />
                        }
                    </ResizerButton>
                </FilterWrapper>
            </TileHeader>
        );
    }

    function renderTileBody() {
        return (
            <TileBody>
                <StatsContainer>
                    <StatsData>
                        <h4>STATS:</h4>
                        {Object.keys(stats).map((currentStatKey: string) => {
                            return (
                                <div key={currentStatKey}>
                                    <div>
                                        <span>{stats[currentStatKey].label}</span>
                                        <span>{stats[currentStatKey].value}</span>
                                    </div>
                                    <div>
                                        <progress
                                            value={stats[currentStatKey].value}
                                            max="100"
                                        >
                                            {stats[currentStatKey].value}
                                        </progress>
                                    </div>
                                </div>
                            );
                        })}
                    </StatsData>
                    <ApiNavigator
                         href={apiUrl}
                         target="_blank"
                    >
                        <div>
                            View API
                        </div>
                        <div className='goto'>
                            <i className='fa fa-arrow-right fa-lg' />
                        </div>
                    </ApiNavigator>
                </StatsContainer>
                <DataContainer>
                    <HeaderWrapper>
                        <div className='header-filter-label'>{filter.label}</div>
                        <div className='header-filter-value'>{filter.value}</div>
                    </HeaderWrapper>
                    <DataWrapperTable>
                        <thead className='data-table-header'>
                            <tr className='data-table-row data-table-header-row'>
                                {dataSet.header.map((cHeader: string) => (
                                    <th key={cHeader}>{cHeader}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='data-table-body'>
                            {getSortedData().map(({
                                label,
                                value,
                                color
                            }: IMetricDataItem, i: number) => {
                                const style = {
                                    color
                                };
                                return (
                                    <tr
                                        key={i}
                                        className='data-table-row data-table-body-row'
                                        style={style}
                                    >
                                        <td>{label}</td>
                                        <td>{value}</td>
                                    </tr>);
                            })}
                        </tbody>
                    </DataWrapperTable>
                </DataContainer>
            </TileBody>
        );
    }

    function render() {
        return (
            <TileContainer>
                {renderTileHeader()}
                {renderTileBody()}
            </TileContainer>
        );
    }

    return render();
}

export default MetricTile;
