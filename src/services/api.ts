import axios from "axios";
const token = localStorage.getItem("token");
// const api = axios.create({
//   baseURL: "http://localhost:8000",
//   headers: {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//   },
// });
const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const setAuthToken = (token: any) => {
 
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Bạn có thể thêm các interceptors nếu cần
api.interceptors.request.use(
  function (config) {
    // Thực hiện các hành động trước khi gửi request, ví dụ như thêm token...
    return config;
  },
  function (error) {
    // Xử lý lỗi trước khi request được gửi đi
    return Promise.reject(error);
  }
);
export default api;
