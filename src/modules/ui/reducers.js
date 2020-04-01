import { createSlice } from "@reduxjs/toolkit";
import { MODULE_NAME } from "./models";

const reducer = createSlice({
  initialState: {
    text: "CLICK BUTTON TO CHANGE TEXT",
    searchPage: {
      listViewStyle: "grid"
    }
  },
  name: MODULE_NAME,
  reducers: {
    HELLO_SAGA: (state, action) => ({
      ...state,
      text: action.payload
    }),
    CHANGE_LIST_VIEW_STYLE: (state, action) => ({
      ...state,
      searchPage: {
        ...state.searchPage,
        listViewStyle: action.payload
      }
    })
  }
});

export const { HELLO_SAGA, CHANGE_LIST_VIEW_STYLE } = reducer.actions;

export default reducer;
