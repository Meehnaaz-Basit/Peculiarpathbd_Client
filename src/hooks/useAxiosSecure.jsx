// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../providers/AuthProvider";
// import { useContext } from "react";

// const axiosSecure = axios.create({
//   baseURL: "https://peculiar-paths-bd-server.vercel.app",
// });
// const useAxiosSecure = () => {
//   const navigate = useNavigate();
//   const { logOut, user } = useContext(AuthContext);
//   axiosSecure.interceptors.request.use(
//     function (config) {
//       const token = localStorage.getItem("access-token");
//       console.log("request stopped by interceptors", token);
//       config.headers.authorization = ` Bearer ${token}`;
//       return config;
//     },
//     function (error) {
//       return Promise.reject(error);
//     }
//   );

//   // intercepts 401 and 403
//   axiosSecure.interceptors.response.use(
//     function (response) {
//       return response;
//     },
//     async (error) => {
//       const status = error.response.status;
//       console.log("status error in the interceptor", status);
//       if (status === 401 || status === 403) {
//         await logOut();
//         navigate("/login");
//       }
//       return Promise.reject(error);
//     }
//   );

//   return axiosSecure;
// };

// export default useAxiosSecure;

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext, useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "https://peculiar-paths-bd-server.vercel.app",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      function (response) {
        return response;
      },
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    // Clean up interceptors on component unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
