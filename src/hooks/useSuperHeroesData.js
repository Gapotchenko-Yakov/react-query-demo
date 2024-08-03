import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const useSuperHeroesData = ({ onSuccess, onError }) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
    select: (data) =>
      data.data
        .map((hero) => hero.name)
        .filter((name) => !["Superman"].includes(name)),
  });
};

export default useSuperHeroesData;
