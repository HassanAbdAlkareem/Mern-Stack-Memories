import React from "react";
import { UseGlobelContext } from "../../../context/FunctionAlContext";

const Pagination = () => {
  const { setPageNumber, totalPages, pageNumber } = UseGlobelContext();
  const pages = new Array(totalPages).fill(null).map((v, i) => i);

  const gotoPrevious = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };
  //
  const gotoNext = () => {
    setPageNumber(Math.min(totalPages - 1, pageNumber + 1));
  };

  return (
    <React.Fragment>
      <button
        className={totalPages !== 0 ? "" : "not-click"}
        onClick={gotoPrevious}
      >
        Previous
      </button>
      {pages.map((page, i) => {
        return (
          <div key={page} className="wrapper">
            <button
              className={page == pageNumber ? "active" : "not-active"}
              onClick={() => setPageNumber(page)}
            >
              {page + 1}
            </button>
          </div>
        );
      })}
      <button
        className={totalPages !== 0 ? "" : "not-click"}
        onClick={gotoNext}
      >
        Next
      </button>
    </React.Fragment>
  );
};

export default Pagination;
