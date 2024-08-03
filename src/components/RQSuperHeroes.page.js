import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const RQSuperHeroesPage = () => {
  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };

  const { isLoading, data, error, isError, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      onError,
      select: (data) =>
        data.data
          .map((hero) => hero.name)
          .filter((name) => !["Superman"].includes(name)),
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

      {
        //data?.data.map((hero) => {
        // return <div key={hero.name}>{hero.name}</div>;
        // })
      }

      {data.map((heroName) => (
        <div key={heroName}>{heroName}</div>
      ))}
    </>
  );
};

export default RQSuperHeroesPage;
