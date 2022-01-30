import React, { useState } from 'react';

import Paginator from '../components/Paginator/Paginator';

import '../styles/Paginator.css';

type PaginatorContainerType = {
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  portionSize?: number;
};

const PaginatorContainer: React.FC<PaginatorContainerType> = ({
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  const pagesCount = 30;
  const pages: Array<number> = Array.from({ length: pagesCount }, (page, id) => id + 1);

  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  const prevPortionNumber = (): void => setPortionNumber(portionNumber - 1);
  const nextPortionNumber = (): void => setPortionNumber(portionNumber + 1);

  return (
    <Paginator
      currentPage={currentPage}
      leftPortionPageNumber={leftPortionPageNumber}
      nextPortionNumber={nextPortionNumber}
      onPageChanged={onPageChanged}
      pages={pages}
      portionCount={portionCount}
      portionNumber={portionNumber}
      prevPortionNumber={prevPortionNumber}
      rightPortionPageNumber={rightPortionPageNumber}
    />
  );
};

PaginatorContainer.defaultProps = {
  portionSize: 10,
};

export default PaginatorContainer;
