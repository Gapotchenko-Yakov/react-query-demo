import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = ({ queryKey }) => {
  return axios.get(`http://localhost:4000/superheroes/${queryKey}`);
};

const useSuperHeroData = (heroId) => {
  return useQuery(["super-hero", heroId], fetchSuperHeroes);
};

export default useSuperHeroData;
