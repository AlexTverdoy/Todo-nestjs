type PaginationProps = {
  onPageChange: (page: number) => void,
  totalCount: number,
  currentPage: number,
  pageSize: number,
}

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

function Pagination(
  {
    onPageChange,
    totalCount,
    pageSize,
    currentPage
  }: PaginationProps) {

  let paginationRange = range(1, Math.ceil(totalCount / pageSize))

  return (
    <div className='pagination-container'>
      {paginationRange.map(pageNumber => {
        return (
          <span
            key={pageNumber}
            className={pageNumber === currentPage ? 'pagination-item selected' : 'pagination-item'}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </span>
        );
      })}
    </div>
  );
}

export default Pagination;