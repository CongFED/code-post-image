// FileUploadPage.tsx
import React from "react";
import UploadList from "../components/UploadPage/UploadList";
import "../styles/css/layout/FileUploadPage.css";

const FileUploadPage: React.FC = () => {
  const files = [
    {
      name: "my-cv.png",
      size: "60 KB of 120 KB",
      status: "uploading" as "uploading",
    },
    {
      name: "my-cv.png",
      size: "60 KB of 120 KB",
      status: "uploading" as "uploading",
    },
    {
      name: "my-cv.png",
      size: "60 KB of 120 KB",
      status: "uploading" as "uploading",
    },
    {
      name: "my-cv.png",
      size: "60 KB of 120 KB",
      status: "uploading" as "uploading",
    },
  ];

  return (
    <div className="container container-page-upload">
      <UploadList files={files} />
    </div>
  );
};

export default FileUploadPage;
