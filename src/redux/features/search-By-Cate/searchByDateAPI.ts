
import {
  searchByCateStart,
  searchByCateFailure,
  searchByCateSuccess

  } from "./searchByCateSlice";
  import api from "../../../services/api";


 export const searchByDate = async (dispatch: any, data: any): Promise<void> => {
  console.log(data)
  dispatch(searchByCateStart());
  try {
    const res = await api.get(`/post/search-date/${data}`);
    dispatch(searchByCateSuccess(res.data));
    console.log(res)
  } catch (err) {
    console.error(err);
    dispatch(searchByCateFailure());
  }
};
