import { useState } from "react";

function usePagination(data) {
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 3;

  const count = Math.ceil(data.length / postPerPage);

  const begin = (currentPage - 1) * postPerPage;
  const end = begin + postPerPage;
  const currentData = data.slice(begin, end);

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(Math.min(pageNumber, count));
  }

  return { jump, currentData, currentPage, count };
}

export default usePagination;
