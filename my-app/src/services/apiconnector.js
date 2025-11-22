import axios from "axios";

const apiconnect = axios.create({});

export const connectionApi = (url, method, headers = {}, params = {}, data = {}) => {
  const finalHeaders = {
    ...headers,
    ...(data instanceof FormData ? {} : { "Content-Type": "application/json" }),
  };

  return apiconnect({
    url,
    method,
    headers: finalHeaders,
    params,
    data,
    withCredentials: true, // important for cookies
  });
};


