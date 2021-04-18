import React from "react";
import PropTypes from "prop-types";

import _ from "lodash";
const Pagination = ({ pageSize, items, currentPage, handleOnClick }) => {
  const pagesNumber = Math.ceil(items / pageSize);

  if (pagesNumber === 1) return null;

  const pages = _.range(1, pagesNumber + 1);
  return (
    <div>
      <ul className="pagination">
        {pages.map((page, idx) => {
          return (
            <li
              key={idx}
              className={`page-item ${page === currentPage && "active"}`}
            >
              <button onClick={() => handleOnClick(page)} className="page-link">
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  items: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleOnClick: PropTypes.func.isRequired,
};
export default Pagination;
