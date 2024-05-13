// UploadList.tsx
import React from "react";
import UploadItem from "./UploadItem";
import "../../styles/css/upload_page/upload_list.css";

interface FileProps {
  name: string;
  size: string;
  status: "uploading" | "completed" | "error";
}

interface UploadListProps {
  files: FileProps[];
}

const UploadList: React.FC<UploadListProps> = ({ files }) => {
  return (
    <div className="row container-list-item">
      {files.map((file, index) => (
        <UploadItem key={index} {...file} />
      ))}
    </div>
  );
};

export default UploadList;
