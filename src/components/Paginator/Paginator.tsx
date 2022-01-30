import React from 'react';

type PaginatorType = {
  pages: number[];
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  portionCount: number;
  portionNumber: number;
  leftPortionPageNumber: number;
  rightPortionPageNumber: number;
  prevPortionNumber: () => void;
  nextPortionNumber: () => void;
};

const Paginator: React.FC<PaginatorType> = ({
  pages,
  currentPage,
  onPageChanged,
  portionCount,
  portionNumber,
  prevPortionNumber,
  nextPortionNumber,
  leftPortionPageNumber,
  rightPortionPageNumber,
}): JSX.Element => {
  const portionPageNumber = pages.filter(
    page => page >= leftPortionPageNumber && page <= rightPortionPageNumber,
  );

  return (
    <div className="item-pagination">
      {portionNumber > 1 && (
        <button className="big-btn nav-btn prev-btn" onClick={prevPortionNumber}>
          Prev
        </button>
      )}
      {portionPageNumber.map(page => {
        const onNewPage = (): void => onPageChanged(page);
        return (
          <span
            key={page}
            className={currentPage === page ? 'page-number selected-page' : 'page-number'}
            onClick={onNewPage}
          >
            {page}
          </span>
        );
      })}
      {portionCount > portionNumber && (
        <button className="big-btn nav-btn next-btn" onClick={nextPortionNumber}>
          Next
        </button>
      )}
    </div>
  );
};

export default Paginator;
