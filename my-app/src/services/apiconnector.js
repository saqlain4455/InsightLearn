import axios from "axios";

const apiconnect = axios.create({});

export const connectionApi = (url, method, headers = {}, params = {}, data = {}) => {
  return apiconnect({
    url: url,
    method: method,
    headers: headers,
    params: params,
    data: data,
    withCredentials: true, 
  });
};
