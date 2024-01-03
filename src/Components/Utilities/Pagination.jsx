import PropTypes from 'prop-types';

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-1">
      {/* Left arrow button */}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center px-4 py-2 text-gray-500 text-lg font-bold bg-gray-100 rounded-full"
      >
        {"<"}
      </button>

      {/* Page buttons */}
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={
            page === currentPage
              ? "text-red-500 flex items-center px-4 py-2  bg-gray-100 font-bold rounded-full"
              : "flex items-center px-4 py-2 text-gray-500 bg-gray-100 font-bold rounded-full"
          }
        >
          {page}
        </button>
      ))}

      {/* Right arrow button */}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}
        className="flex items-center px-4 py-2 text-gray-500 text-lg bg-gray-100 font-bold rounded-full"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
    totalPosts: PropTypes.number.isRequired,
    postsPerPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
  };