import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const RQSuperHeroesPage = () => {
  const [refetchInterval, setRefetchInterval] = useState(3000);

  const onSuccess = (data) => {
    if (data.data.length === 4) setRefetchInterval(false);
    else setRefetchInterval(3000);

    console.log("Perform side effect after data fetching", data);
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };

  const { isLoading, data, error, isError, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      refetchInterval,
      onSuccess,
      onError,
    }
  );

  console.log("🚀 ~ RQSuperHeroesPage ~ isFetching:", isFetching);
  console.log("🚀 ~ RQSuperHeroesPage ~ isLoading:", isLoading);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};

export default RQSuperHeroesPage;
