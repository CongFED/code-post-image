import React, { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
import FileUploader from "../components/UploadPage/FileUploader";
import QuoteInput from "../components/UploadPage/QuoteInput";
import ImageSubjectSelector from "../components/UploadPage/ImageSubjectSelector";
import "../styles/css/layout/upLoadPage.css";
import FileUploadPage from "./FileUploadPage";
import api from "../services/api";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { cateName } from "../recoil/initState";
const UploadPage: React.FC = () => {
  const [imageId, setImageId] = useState<File | null>(null);
  const [subject, setSubject] = useState<string>("");
  const [img_key, setImg_key] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [load, setLoad] = useState<boolean | null>(false);
  const [cateNameR, setCateNameR] = useRecoilState(cateName);
  const resetUploadState = () => {
    setImageId(null);
    setCateNameR("Select an object");
    setQuote("");
  };

  useEffect(() => {
    if (img_key !== "") {
      const data = {
        image_key: img_key,
        caption: quote,
        category: subject,
      };
      console.log("Data: ", data);
      api_create(data)
        .then((res) => {
          console.log("quote trc ", quote);
          setSubject("select-an-object");
          setImagePreviewUrl(null);
          console.log("quote sau ", quote);
          resetUploadState();
        })
        .catch((error) => {
          toast.error("Error calling API.");
        });
    }
  }, [img_key]);

  const onUpload = async (file: File) => {
    if (file) {
      try {
        const response = await axios.get(
          "http://localhost:8000/get-presigned-url/"
        );
        const { url, key, contentType } = response.data;
        await axios
          .put(url, file, {
            headers: { "Content-Type": contentType },
          })
          .then(() => {
            setImg_key(key);
          });
      } catch (error: any) {
        toast.error("Error uploading file: " + error.message);
      }
    }
  };

  const handleUpload = async () => {
    if (!imageId) {
      toast.error("Please select a file.");
      return;
    }
    if (!subject) {
      toast.error("Please select a subject.");
      return;
    }
    try {
      await onUpload(imageId);
      toast.success("Uploaded successfully!");
      setLoad(!load);
    } catch (error: any) {
      toast.error("Error uploading file or calling API.");
    }
  };

  const api_create = async (data: any) => {
    const res = await api.post("/post", data);
    return res;
  };

  return (
    <div className="container container-upload-page">
      <div className="row justify-content-center align-items-stretch">
        <div className="col-md-4 upload-file">
          <FileUploader
            setImageId={setImageId}
            resetPreview={resetUploadState}
            imagePreviewUrl={imagePreviewUrl}
            setImagePreviewUrl={setImagePreviewUrl}
          />
        </div>
        <div className="col-md-3 middle-row">
          <label className="form-label">Image subject</label>
          <ImageSubjectSelector setSubject={setSubject} />
          <QuoteInput setQuote={setQuote} quote={quote} />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button
            type="submit"
            className="btn btn-upload"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
      <FileUploadPage />
    </div>
  );
};

export default UploadPage;
