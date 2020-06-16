import { createSlice } from "@reduxjs/toolkit";
import { MODULE_NAME } from "./models";

let lang = localStorage.getItem("lang");
if (lang) {
  // check lang is
  const langArray = ["en", "vi"];
  if (!langArray.includes(lang)) {
    lang = "en";
  }
} else {
  lang = "en";
}

const reducer = createSlice({
  initialState: {
    lang,
    searchPage: {
      listViewStyle: "grid"
    },
    toggleMenuMobile: false,
    isLoginForm: false,
    errorMessage: "",
    successMessage: "",
    errorsSignupForm: null,
    errorsUpdateForm: null,
    checkoutPage: {
      activeNavItem: "#payment",
      values: {},
      isError: false,
      isCheckUpdateInfo: false
    },
    isLoading: false,
    financeOption: null,
    footerData: {}
  },
  name: MODULE_NAME,
  reducers: {
    SET_FOOTER_DATA: (state, action) => ({
      ...state,
      footerData: action.payload
    }),
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
    }),
    TOGGLE_MENU_MOBILE: (state, action) => ({
      ...state,
      toggleMenuMobile: action.payload
    }),
    SET_IS_LOGIN_FORM: (state, action) => ({
      ...state,
      isLoginForm: action.payload
    }),
    SET_ERROR_MESSAGE: (state, action) => ({
      ...state,
      errorMessage: action.payload
    }),
    SET_SUCCESS_MESSAGE: (state, action) => ({
      ...state,
      successMessage: action.payload
    }),
    SET_SIGNUP_FORM_ERRORS: (state, action) => ({
      ...state,
      errorsSignupForm: action.payload
    }),
    SET_UPDATE_FORM_ERRORS: (state, action) => ({
      ...state,
      errorsUpdateForm: action.payload
    }),
    SET_CURRENT_PAGE_CHECKOUT_PAGE: (state, action) => ({
      ...state,
      checkoutPage: {
        ...state.checkoutPage,
        activeNavItem: action.payload
      }
    }),
    SET_VALUE_FORM_CHECKOUT: (state, action) => ({
      ...state,
      checkoutPage: {
        ...state.checkoutPage,
        values: {
          ...state.checkoutPage.values,
          ...action.payload
        }
      }
    }),
    SET_LOADING: (state, action) => ({
      ...state,
      isLoading: action.payload
    }),
    SET_FINANCE_OPTIONS: (state, action) => ({
      ...state,
      financeOption: action.payload
    }),
    SET_IS_ERROR_PAYMENT: (state, action) => ({
      ...state,
      checkoutPage: {
        ...state.checkoutPage,
        isError: action.payload
      }
    }),
    SET_IS_CHECK_UPDATE_INFO: (state, action) => ({
      ...state,
      checkoutPage: {
        ...state.checkoutPage,
        isCheckUpdateInfo: action.payload
      }
    }),
    CLEAR_CHECKOUT_PAGE_INFO: state => {
      localStorage.removeItem("cart");

      return {
        ...state,
        checkoutPage: {
          activeNavItem: "#payment",
          values: {},
          isError: false,
          isCheckUpdateInfo: false
        }
      };
    },
    SET_LANG: (state, action) => {
      localStorage.setItem("lang", action.payload);
      return {
        ...state,
        lang: action.payload
      };
    }
  }
});

export const {
  SET_FOOTER_DATA,
  HELLO_SAGA,
  CHANGE_LIST_VIEW_STYLE,
  TOGGLE_MENU_MOBILE,
  SET_IS_LOGIN_FORM,
  SET_ERROR_MESSAGE,
  SET_SUCCESS_MESSAGE,
  SET_SIGNUP_FORM_ERRORS,
  SET_UPDATE_FORM_ERRORS,
  SET_CURRENT_PAGE_CHECKOUT_PAGE,
  SET_VALUE_FORM_CHECKOUT,
  SET_LOADING,
  SET_FINANCE_OPTIONS,
  SET_IS_ERROR_PAYMENT,
  SET_IS_CHECK_UPDATE_INFO,
  CLEAR_CHECKOUT_PAGE_INFO,
  SET_LANG
} = reducer.actions;

export default reducer;
