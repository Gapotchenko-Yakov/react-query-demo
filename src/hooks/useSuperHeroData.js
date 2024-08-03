import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const useSuperHeroData = (heroId) => {
  return useQuery(["super-hero", heroId], fetchSuperHeroes);
};

export default useSuperHeroData;
