// UploadItem.tsx
import React from "react";
import "../../styles/css/upload_page/upload_item.css";
import { FaRegFile } from "react-icons/fa";

interface UploadItemProps {
  name: string;
  size: string;
  status: "uploading" | "completed" | "error";
}

const UploadItem: React.FC<UploadItemProps> = ({ name, size, status }) => {
  const statusClass = `status ${status}`;
  return (
    <div className="col-md-6 container-upload-item">
      <div className="uploadItem">
        <div className="info">
          <div className="info-icon">
            <FaRegFile
              style={{ width: "60px", height: "80px", color: "#CBD0DC" }}
            />
          </div>
          <div className="info-detail">
            <span className="name-image">{name}</span>
            <br />
            <span className="size-image">{size}</span>
            <span className={statusClass}>{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadItem;
