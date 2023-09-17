import React, { useState } from "react";
import Pagination from "react-js-pagination";
import "../style/Paging.css";

const Paging = (props:any) => {
  const [page, setPage] = useState(1);
  let count = 0;
  let perPage = 5;
  if( props.data != undefined){
    count = props.data
  }
  if(props.perPage != undefined){
    perPage = props.perPage
  }
  console.log(props.data)
  console.log(props.perPage)

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={perPage}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};

export default Paging;
