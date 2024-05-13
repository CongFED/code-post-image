import React, { useEffect, useState } from "react";
import "../../styles/css/upload_page/image_subject_selector.css";
import { useRecoilState } from "recoil";
import { cateName, cateNameB } from "../../recoil/initState";

const options = [
  {
    id: 2,
    slug: "chan-dung",
    value: "Chân dung",
  },
  {
    id: 3,
    slug: "thien-nhien",
    value: "Thiên nhiên",
  },
  {
    id: 4,
    slug: "kien-truc",
    value: "Kiến trúc",
  },
];

interface IImageSubjectSelectorProps {
  setSubject: (value: string) => void;
}

const ImageSubjectSelector: React.FC<IImageSubjectSelectorProps> = ({
  setSubject,
}) => {
  const [id, setId] = useState(0);
  const [cateNameR, setCateNameR] = useRecoilState(cateName);
  const [cateNameBR, setCateNameBR] = useRecoilState(cateNameB);
  useEffect(() => {
    // Your useEffect code here if needed
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
    setCateNameR(e.target.value);
    setCateNameBR(true);
  };

  return (
    <div className="mb-3 image-subject">
      <select className="form-select" onChange={handleChange} value={cateNameR}>
        <option disabled={cateNameR !== "Select an object"}>
          Select an object
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.slug}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ImageSubjectSelector;
