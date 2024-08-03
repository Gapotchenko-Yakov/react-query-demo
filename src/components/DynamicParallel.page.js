import axios from "axios";
import React from "react";
import { useQueries } from "react-query";

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

// const fetchFriend = ({ queryKey }) => {
//   const friendId = queryKey[1];
//   return axios.get(`http://localhost:4000/friends/${friendId}`);
// };

const DynamicParallel = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => ({
      queryKey: ["super-hero", id],
      queryFn: fetchSuperHero,
    }))
  );

  console.log("🚀 ~ DynamicParallel ~ queryResults:", queryResults);

  return <div>DynamicParallel</div>;
};

export default DynamicParallel;
