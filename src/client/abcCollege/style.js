import styled from 'styled-components';

export const Header = styled.header`
    display: grid;
    grid-template-columns: 70% auto;
    background: var(--color-primary);
    margin: 0;
    padding-left: 15px;
    padding-right: 15px;
    color: var(--color-white);
    align-items: center;
    justify-content: space-between;
`;

export const DownloadCollection = styled.a`
    background: #4ab4e8;
    border-color: #2f99dc;
    color: #fff;
    font-size: .9rem;
    height: 2rem;
    padding: .35rem .6rem;
    text-decoration: none;
`;

export const MainSection = styled.main`
    padding: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    position: relative;

    .widget-container {
        transition: all .3s;
    }

    .full-screen-mode {
        position: absolute;
        z-index: 999;
        top: 20px;
        left: 0;
        height: calc(100% - 100px);
        width: calc(100% - 20px);
        background: white;
    }
    .full-screen-mode ~ div {
        display: none;
    }
`;
