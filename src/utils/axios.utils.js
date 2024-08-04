import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:4000",
  //   withCredentials: false,
});

export const request = (options) => {
  console.log("🚀 ~ request ~ options:", options);
  //   client.defaults.headers.common.Authorization = "Bearer token";
  const onSuccess = (response) => response;
  const onError = (error) => {
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
