import React, {useState} from 'react';

import Paginator from "./Paginator";

import './Paginator.css';

type PropsType = {
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    portionSize?: number,
}

const PaginatorContainer: React.FC<PropsType> = ({currentPage, onPageChanged, portionSize = 10}) => {
    let pages: Array<number> = [];

    let pagesCount = 30;
    for (let i = 1; i <= pagesCount; i++) pages.push(i)

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    const prevPortionNumber = () => setPortionNumber(portionNumber - 1);
    const nextPortionNumber = () => setPortionNumber(portionNumber + 1);

    return <Paginator currentPage={currentPage} onPageChanged={onPageChanged} pages={pages} portionCount={portionCount} portionNumber={portionNumber} prevPortionNumber={prevPortionNumber} nextPortionNumber={nextPortionNumber} leftPortionPageNumber={leftPortionPageNumber} rightPortionPageNumber={rightPortionPageNumber} />
}

export default PaginatorContainer;
