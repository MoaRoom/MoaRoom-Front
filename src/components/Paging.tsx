import React, { useState } from "react";
import Pagination from "react-js-pagination";
import "../style/Paging.css";

const Paging = (props:any) => {
  const [page, setPage] = useState(1);
  const count = props.data
  console.log(props.data)

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={5}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};

export default Paging;
