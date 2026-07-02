import axios from 'axios';

export const useAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

useAxios.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);
