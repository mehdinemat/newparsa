import axios from "axios";
import { useRouter } from "next/router";


export const baseUrl = 'https://parsa.api.t.etratnet.ir/';


// export const baseUrl = 'http://192.168.10.161:8000/api';

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

import { useEffect } from 'react';

export const useAxiosInterceptors = (showToast) => {
  const router = useRouter()
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use((response) => {
      // Your response interceptor logic
      if (response?.config?.method != 'get' && response?.status == 200 && response?.data?.status) {
        showToast({
          title: "موفقیت",
          description: response?.data?.detail,
          status: "success",
          duration: 500,
          isClosable: true,
        })
      }
      return response;
    }, (error) => {
      if (error?.response?.status === 401) {
        // showToast({
        //   title: "خطا",
        //   description: error?.response?.data?.detail,
        //   status: "error",
        //   duration: 9000,
        //   isClosable: true,
        // })
        // router.push('/login')
        localStorage.removeItem('token')

      }
      if (error?.response?.status === 400) {
        showToast({
          title: "خطا",
          description: error?.response?.data?.detail,
          status: "error",
          duration: 9000,
          isClosable: true,
        })
        // router.replace('/login')

      }
      if (error?.response?.status === 403) {
        showToast({
          title: "خطا",
          description: 'شما دسترسی لازم را ندارید.',
          status: "error",
          duration: 9000,
          isClosable: true,
        })
        // router.replace('/login')

      }
      if (error?.response?.status === 500) {
        showToast({
          title: "خطا",
          description: "خطا از سمت سرور",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }

      return Promise.reject(error);
    });



    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [showToast]); // Re-initialize interceptors if showToast changes
};

export const fetcher = async (url) => {
  try {
    const response = await axios.get(baseUrl + url);
    return response.data;
  } catch (err) {
    const error = new Error('An error occurred while fetching the data.');
    // Ensure error handling accounts for possibility of err.response being undefined
    error.info = err.response ? await err.response.data : 'No response received';
    error.status = err.response ? err.response.status : 'No response';
    throw error;
  }
};
