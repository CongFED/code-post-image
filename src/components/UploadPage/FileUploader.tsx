import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

import toast from "react-hot-toast";
import {
  validateFile,
  FileValidationResponse,
} from "../../utils/validation_file";

interface IFileUploaderProps {
  setImageId: (value: File | null) => void;
  resetPreview: () => void;
  imagePreviewUrl: string | null; // Thêm prop cho imagePreviewUrl
  setImagePreviewUrl: (value: string | null) => void; // Thêm prop cho setImagePreviewUrl
}

const FileUploader = ({
  setImageId,
  resetPreview,
  imagePreviewUrl,
  setImagePreviewUrl,
}: IFileUploaderProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validation: FileValidationResponse = validateFile(file);
      if (!validation.isValid) {
        // toast.error(validation.error);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
        setImageId(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <form
        className="rounded text-center form-upload"
        style={{
          border: imagePreviewUrl ? "none" : "2px dashed #7949FF",
          cursor: "pointer",
          position: "relative",
          height: "213px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <input
          type="file"
          id="fileInput"
          className="form-control"
          style={{
            opacity: 0,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            cursor: "pointer",
          }}
          onChange={handleImageChange}
        />
        {imagePreviewUrl ? (
          <img
            src={imagePreviewUrl}
            alt="Image preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <label
            htmlFor="fileInput"
            style={{ display: "block", cursor: "pointer", zIndex: 1 }}
          >
            <IoCloudUploadOutline
              style={{
                width: "80px",
                height: "60px",
                color: "#7949FF",
                marginTop: "20px",
              }}
            />
            <h6>
              Drag & drop files or <a href="#">Browse</a>
            </h6>
            <p>
              Supported formats: JPG, PNG
              <br />
              Max size: 8MB
            </p>
          </label>
        )}
      </form>
    </>
  );
};

export default FileUploader;
