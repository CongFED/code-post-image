
import {
  searchByCateStart,
  searchByCateFailure,
  searchByCateSuccess

  } from "./searchByCateSlice";
  import api from "../../../services/api";

// Call API và lưu giá trị vào Slice , cả 3 file getAllAPI, searchByCateAPI và searchByDate đều lưu giá trị vào 1 Slice, tại 1 cái này để hiển thị ra màn hình nha
 export const getAll = async (dispatch: any): Promise<void> => {

  dispatch(searchByCateStart());
  try {
    const res = await api.get(`/post`);
    dispatch(searchByCateSuccess(res.data));
    console.log(res)
  } catch (err) {
    console.error(err);
    dispatch(searchByCateFailure());
  }
};
