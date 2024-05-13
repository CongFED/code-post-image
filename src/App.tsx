import React from "react";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import UploadPage from "./layouts/UploadPage";
import UploadList from "./components/UploadPage/UploadList";
import FileUploadPage from "./layouts/FileUploadPage";
import Header from "./components/header/header";
import ListPost from "./layouts/ListPost";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <Header />;
      <Outlet />
    </>
  );
};

export default App;
