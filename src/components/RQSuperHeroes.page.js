import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const RQSuperHeroesPage = () => {
  const { isLoading, data, error, isError, isFetching } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      // cacheTime: 5000,
      // staleTime: 15000,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
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
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};

export default RQSuperHeroesPage;
