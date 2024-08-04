import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { request } from "../utils/axios.utils";

const fetchSuperHeroes = () => {
  return request({ url: "/superheroes" });
};

const addSuperHero = (hero) => {
  return request({ url: "/superheroes", method: "post", data: hero });
};

export const useSuperHeroesData = ({ onSuccess, onError }) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
    // refetchOnWindowFocus: true,
    // select: (data) =>
    //   data.data
    //     .map((hero) => hero.name)
    //     .filter((name) => !["Superman"].includes(name)),
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
    //     return { ...oldQueryData, data: [...oldQueryData.data, data.data] };
    //   });
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previuosHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return { ...oldQueryData, data: [...oldQueryData.data, newHero] };
      });

      return { previuosHeroData };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previuosHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
