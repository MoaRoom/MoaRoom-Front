import React, { useState } from "react";
import Pagination from "react-js-pagination";
import "../style/Paging.css";

const Paging = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={50}
      pageRangeDisplayed={1}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};

export default Paging;
