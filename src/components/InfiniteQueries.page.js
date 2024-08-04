import axios from "axios";
import React, { Fragment, useState } from "react";
import { useInfiniteQuery } from "react-query";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(
    `http://localhost:4000/colors?_per_page=2&_page=${pageParam}`
  );
};

const InfiniteQueriesPage = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery("colors", fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  console.log("🚀 ~ InfiniteQueriesPage ~ data:", data);

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
        {data?.pages.map((group, index) => (
          <Fragment key={index}>
            {group?.data?.data?.map((color) => (
              <li key={color.id}>{color.label}</li>
            ))}
          </Fragment>
        ))}
      </ul>
      <div>
        <button onClick={fetchNextPage} disabled={!hasNextPage}>
          Next
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage && "Fetching..."}</div>
    </div>
  );
};

export default InfiniteQueriesPage;
