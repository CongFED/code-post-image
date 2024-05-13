import React, { useEffect, useState } from "react";
import ImageSubjectSelector from "../UploadPage/ImageSubjectSelector";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/css/home/search_are.css";
import { BsFunnel } from "react-icons/bs";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { searchByCate } from "../../redux/features/search-By-Cate/searchByCateAPI";
import { searchByDate } from "../../redux/features/search-By-Cate/searchByDateAPI";
import { getAll } from "../../redux/features/search-By-Cate/getAllAPI";
import { useRecoilState } from "recoil";
import { cateName, cateNameB } from "../../recoil/initState";
interface SearchAreaProps {
  subject: string;
  handleChangeSubject: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchArea: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [subject, setSubject] = useState<string>("");
  const formattedDate = format(new Date(startDate), "dd-MM-yyyy");
  const [cateNameR, setCateNameR] = useRecoilState(cateName);
  const [cateNameBR, setCateNameBR] = useRecoilState(cateNameB);
  const isFetching = useSelector(
    (state: RootState) => state.searchCate.isFetching
  );

  useEffect(() => {
    console.log(isFetching);
    if (isFetching === true) {
      // setCateNameR("Select an object");
      setCateNameBR(false);
    }
  }, [isFetching]);
  console.log(subject);
  // Lấy ngày hiện tại
  const today = new Date();
  const dispatch = useDispatch();
  // Function xử lý việc search nha
  const handleSearch = async () => {
    if (cateNameBR === false) {
      searchByDate(dispatch, formattedDate);
    } else if (cateNameR === subject) {
      searchByCate(dispatch, subject);
    } else {
      searchByCate(dispatch, subject);
    }
  };
  const handleLoad = async () => {
    getAll(dispatch);
  };
  return (
    <div className="container-search">
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <ImageSubjectSelector setSubject={setSubject} />
      </div>
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 calendar">
        <DatePicker
          selected={startDate}
          onChange={(date: any) => setStartDate(date)}
          className="custom-datepicker"
          calendarClassName="custom-calendar"
          wrapperClassName="datepicker-wrapper"
          maxDate={today} // Chỉ cho phép chọn ngày trước hoặc bằng ngày hiện tại
        />
      </div>
      {/* <div className="col-12 col-sm-12 col-md-4 col-lg-3">
        <div onClick={handleLoad} className="wrap-btn btn">
          <div className="btn-content">
            <BsFunnel className="custom-icon" />
            <span className="btn-apply">Get All</span>
          </div>
        </div>
      </div> */}
      <div className="col-12 col-sm-12 col-md-4 col-lg-3">
        <div onClick={handleSearch} className="wrap-btn btn">
          <div className="btn-content">
            <BsFunnel className="custom-icon" />
            <span className="btn-apply">Apply</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
