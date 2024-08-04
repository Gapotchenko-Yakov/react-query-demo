import axios from "axios";
import React, { useState } from "react";
import { useQueries, useQuery } from "react-query";

const fetchColors = ({ queryKey }) => {
  const pageNumber = queryKey[1];
  return axios.get(
    `http://localhost:4000/colors?_per_page=2&_page=${pageNumber}`
  );
};

const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    isLoading,
    isError,
    isFetching,
    error,
    data: { data } = {},
  } = useQuery(["colors", pageNumber], fetchColors, { keepPreviousData: true });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h2>Color list:</h2>
      <ul>
        {data?.data.map((color) => (
          <li key={color.id}>{color.label}</li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => setPageNumber((prev) => prev - 1)}
          disabled={pageNumber === data?.first}
        >
          Previous
        </button>
        <button
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={pageNumber === data?.last}
        >
          Next
        </button>
      </div>
      {isFetching && "Loading"}
    </div>
  );
};

export default PaginatedQueriesPage;
