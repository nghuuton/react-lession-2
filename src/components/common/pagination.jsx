import React, { Component } from "react";
import _ from "lodash";
import propTypes from "prop-types";
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { itemCount, currentPage, pageSize, onPageChange } = this.props;
    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page, index) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              key={index}
            >
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemCount: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
};

export default Pagination;
