import React, { useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { usePagination, DOTS } from "../hooks/usePagination";

import "./Pagination.css";

export default function Pagination(props) {

  const { onPageChange, totalPageCount, siblingCount = 1, currentPage, pagePath } = props;
  
  const paginationRange = usePagination({
    currentPage,
    totalPageCount,
    siblingCount,
  });

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="pagination">
      <ul className="pagination-list">
        <li key={'previous'} onClick={onPrevious} className="page__numbers previous" style={{display: currentPage === 1 && 'none'}}>
          <Link to={pagePath(currentPage - 1)}>
            <FontAwesomeIcon icon={Icons.faArrowLeft} />
          </Link>
        </li>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <li key={Math.random(1000)} className="no-page">&#8230;</li>;
          }
          return (
            <li key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`page__numbers ${currentPage === pageNumber ? 'active' : ''}`}
            >
              <Link to={pagePath(pageNumber)}>{pageNumber}</Link>
            </li>
          );
        })}

        <li key={'next'} onClick={onNext} className="page__numbers previous" style={{display: currentPage === lastPage && 'none'}}>
          <Link to={pagePath(currentPage + 1)}>
            <FontAwesomeIcon icon={Icons.faArrowRight} />
          </Link>
        </li>
      </ul>
    </div>
  );
}
