import React from 'react';

type PropsType = {
    pages: number[],
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    portionCount: number,
    portionNumber: number,
    leftPortionPageNumber: number,
    rightPortionPageNumber: number,
    prevPortionNumber: () => void,
    nextPortionNumber: () => void,
}

const Paginator: React.FC<PropsType> = ({
                                            pages,
                                            currentPage,
                                            onPageChanged,
                                            portionCount,
                                            portionNumber,
                                            prevPortionNumber,
                                            nextPortionNumber,
                                            leftPortionPageNumber,
                                            rightPortionPageNumber
                                        }): JSX.Element => (
    <div className="item-pagination">
            {portionNumber > 1 &&
            <button className="big-btn nav-btn prev-btn" onClick={prevPortionNumber}>Prev</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    const onNewPage = (): void => onPageChanged(p);
                return <span key={p} onClick={onNewPage} className={currentPage === p ? "page-number selected-page" : "page-number"}>{p}</span>
            })}
            {portionCount > portionNumber &&
            <button className="big-btn nav-btn next-btn" onClick={nextPortionNumber}>Next</button>}
        </div>
)

export default Paginator;
