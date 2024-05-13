import React, { ElementType, ReactElement } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import UploadPage from "./layouts/UploadPage";
import ListPost from "./layouts/ListPost";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import { toast, ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const isAuthenticated = (): boolean => {
  return localStorage.getItem("token") !== null;
};

interface PrivateRouteProps {
  element: ElementType;
  path: string;
}

// Định nghĩa PrivateRoute như một functional component trả về ReactElement
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element: Component,
  path,
}) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};
//  <Provider store={store}> và  <RecoilRoot> bắt buộc phải được bọc ở ngoài để có thể sử dụng được
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route
                index
                element={<PrivateRoute element={ListPost} path="/" />}
              />
              <Route
                path="/home"
                element={<PrivateRoute element={ListPost} path="/home" />}
              />
              <Route
                path="/upload"
                element={<PrivateRoute element={UploadPage} path="/upload" />}
              />
            </Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </Provider>
    <Toaster />
    {/* <ToastContainer /> */}
  </React.StrictMode>
);

reportWebVitals();
