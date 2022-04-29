import React from "react";
import PropTypes from "prop-types";
import styles from "./Pagination.module.css";
import {
  fetchResource,
  firstClass,
  previousClass,
  nextClass,
  lastClass,
  getPagination,
  setProps,
} from "./PaginationFunctions";

function Pagination(props) {
  setProps(props);
  return (
    <div className="p-4 pt-0 row">
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={firstClass()}>
            <a
              className="page-link"
              aria-label="First"
              onClick={(e) => {
                e.preventDefault();
                console.log("asdasdasd");
                // fetchResource(0);
              }}
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">First</span>
            </a>
          </li>
          <li className={previousClass()}>
            <a
              className="page-link"
              aria-label="Previous"
              onClick={(e) => {
                e.preventDefault();
                console.log("asdasdasd");
                //  fetchResource(props.currentPage - 1);
              }}
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          {getPagination()}
          <li className={nextClass()}>
            <a
              className="page-link"
              aria-label="Next"
              onClick={(e) => {
                e.preventDefault();
                console.log("asdasdasd");
                //  fetchResource(props.currentPage + 1);
              }}
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
          <li className={lastClass()}>
            <a
              className="page-link"
              aria-label="Last"
              onClick={(e) => {
                e.preventDefault();
                console.log("asdasdasd");
                //  fetchResource(props.totalPages - 1);
              }}
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Last</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
