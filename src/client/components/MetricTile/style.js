import styled from 'styled-components';

export const TileContainer = styled.section`
    box-shadow: 3px 3px 5px 0 rgb(0 0 0 / 25%);
    position: relative;
    transition: all .3s;
    /* padding: 14px; */
`;

export const TileHeader = styled.header`
    display: grid;
    grid-template-columns: 2fr 1fr;
    background: #144c88;
    border-top: 4px solid #7dd343;
    color: #fff;
    position: relative;
    padding: 0 1em;
`;

export const TileBody = styled.main`
    display: grid;
    grid-template-columns: 1fr 2fr;
    max-height: 275px;
`;

export const FilterWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const StatsContainer = styled.div`
    height: 275px;
    background: #20649b;
    color: #fff;
    display: grid;
    grid-template-rows: 5fr 1fr;
`;

export const StatsData = styled.div`
    padding: 2px 18px;
`;

export const ApiNavigator = styled.a`
    display: grid;
    grid-template-columns: 3fr 1fr;
    line-height: 50px;
    text-decoration: none;
    text-align: center;
    color: #fff;
    background: #49b4e8;

    .goto {
        background: #3099dd;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const HeaderWrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding: 0 1em;
    color: #154c88;
    font-size: 20px;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
    height: 12%;

    .header-filter-label {
        border-right: 1px solid #ccc;
    }

    .header-filter-value {
        color: #7dd343;
        padding-left: 12px;
    }
`;

export const DataWrapperTable = styled.table`
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 88%;

    .data-table-body {
        overflow: auto;
        max-height: 196px;
    }

    .data-table-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 44px;
        align-items: center;
        border-top: 1px solid #ccc;
    }

    .data-table-header-row {
        border-width: 0;
        border-bottom-width: .1rem
    }

    .data-table-body-row:nth-of-type(odd) {
        background: #f7f8f9;
    }
`;

export const ResizerButton = styled.button`
    border: none;
    background: transparent;
    color: white;
    font-size: 20px;
`;
