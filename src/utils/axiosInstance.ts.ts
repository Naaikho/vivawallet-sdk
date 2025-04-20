import axios from 'axios';

export const useAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

useAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log('Vivawallet Error:', err);
    return Promise.reject(err);
  }
);
