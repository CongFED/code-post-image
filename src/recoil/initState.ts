import { atom } from "recoil";
// lưu trữ biến toàn cục
export const cateName = atom({
  key: "cateName",
  default:  "Select an object",
});
export const cateNameB = atom({
  key: "cateNameB",
  default:  false,
});
export const initState = atom({
  key: "initText",
  default: "",
});


export default initState;
