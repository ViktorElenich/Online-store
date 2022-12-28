import { FC, useState } from 'react';
import { IPagination } from '../../interfaces';
import './Pagination.scss';

const Pagination: FC<IPagination> = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = totalProducts / productsPerPage;
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    totalProducts === 0 ? null : <ul className='pagination'>
      <li
        role='menuitem'
        onClick={paginatePrev}
        onKeyDown={paginatePrev}
        className={currentPage === pageNumbers[0] ? 'hidden' : ''}
      >
        Prev
      </li>
      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              role='menuitem'
              key={number}
              onClick={() => paginate(number)}
              onKeyDown={() => paginate(number)}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </li>
          );
        }
        return null
      })}
      <li
        role='menuitem'
        onClick={paginateNext}
        onKeyDown={paginateNext}
        className={
          currentPage === pageNumbers[pageNumbers.length - 1] ? 'hidden' : ''
        }
      >
        Next
      </li>
      <p>
        <b className='page'>{`page ${currentPage}`}</b>
        <span>{` of `}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  );
};

export default Pagination;
