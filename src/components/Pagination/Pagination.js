import React, { useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import "./Pagination.scss";

export default function Pagination(props) {
  const { totalDocs, docsPerpage, onSelect } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    onSelect(page);
  };

  return (
    <div className="pagination-control">
      <PaginationControl
        page={currentPage}
        between={3}
        total={totalDocs}
        limit={docsPerpage}
        changePage={(page) => handlePageClick(page)}
        ellipsis={1}
        last={true}
      />
    </div>
  );
}
