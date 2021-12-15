import React, {useState} from 'react';
import classes from './Paginator.module.css';

type PropsType = {
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    portionSize?: number,
}

let Paginator: React.FC<PropsType> = ({currentPage, onPageChanged, portionSize = 10}) => {

    // let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pagesCount = 30;

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={classes.item}>
            {portionNumber > 1 &&
            <button className={[classes.setBtn, classes.btn, classes.btnSpace1].join(' ')} onClick={() => {setPortionNumber(portionNumber - 1)}}>Prev</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                return <span key={p} onClick={(e) => {onPageChanged(p)}} className={currentPage === p ? [classes.pageNumber, classes.selectedPage].join(' ') : classes.pageNumber}>{p}</span>
            })}
            {portionCount > portionNumber &&
            <button className={[classes.setBtn, classes.btn, classes.btnSpace2].join(' ')} onClick={() => {setPortionNumber(portionNumber + 1)}}>Next</button>}
        </div>
}

export default Paginator;