import { FC } from 'react';
import ReactPaginate from 'react-paginate';
import { IPaginate } from '../../interfaces';
import './Pagination.scss';

const PaginatedItems: FC<IPaginate> = ({
  itemsPerPage,
  filterProducts,
  setItemOffset,
}) => {
  const pageCount = Math.ceil(filterProducts.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % filterProducts.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(newOffset);
  };

  return (
    <ReactPaginate
      breakLabel='...'
      nextLabel='next >'
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      activeClassName="active"
      pageClassName="page-item"
      containerClassName="pagination"
      previousLabel='< prev'
    />
  );
};

export default PaginatedItems;
