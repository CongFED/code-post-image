import { configureStore, ThunkAction, Action,combineReducers } from "@reduxjs/toolkit";
import opitionpostSlice from "./opitionpostSlice";


import searchByCateSlice from "./features/search-By-Cate/searchByCateSlice"



const rootReducer = combineReducers({  
 
  opition: opitionpostSlice,


  searchCate:searchByCateSlice,

});


export const store = configureStore({
  reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
