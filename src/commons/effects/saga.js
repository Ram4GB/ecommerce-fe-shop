/* eslint-disable no-console */
import { takeEvery, call, put, takeLatest } from "redux-saga/effects";

import * as actionsSagaUI from "../../modules/ui/actionsSaga";
import * as actionsSagaUser from "../../modules/user/actionsSaga";
import * as actionsSagaProducts from "../../modules/products/actionsSaga";
import * as actionsSagaProductDetail from "../../modules/productDetail/actionsSaga";

import * as handlerSagaUI from "../../modules/ui/handlers";
import * as handlerSagaUser from "../../modules/user/handlers";
import * as handlerSagaProducts from "../../modules/products/handlers";
import * as handlerSagaProductDetail from "../../modules/productDetail/handlers";

import * as actionReducerUI from "../../modules/ui/reducers";
import * as actionReducerUser from "../../modules/user/reducers";

import * as actionReducerProducts from "../../modules/products/reducers";
import * as actionReducerProductDetail from "../../modules/productDetail/reducers";

function* login(action) {
  try {
    const result = yield call(handlerSagaUI.login, action.payload);
    if (result.success) {
      yield put(actionReducerUI.SET_IS_LOGIN_FORM(false));
      yield put(actionsSagaUser.fetchMe());
      yield put(actionReducerUI.SET_SUCCESS_MESSAGE({ message: "Login successfully" }));
    } else {
      yield put(actionReducerUI.SET_ERROR_MESSAGE(result));
    }
  } catch (error) {
    yield put(actionReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
  }
}

function* fetchMe() {
  try {
    yield put(actionReducerUser.SET_AUTHENTICATION(true));
    const result = yield call(handlerSagaUser.fetchMe, null);
    if (result.success) {
      yield put(actionReducerUser.SET_ACCOUNT(result.data.account));
    } else {
      // Special case:
      // Remember password but AuthTokenExpiredError
      if (result && result.name === "AuthTokenExpiredError") {
        yield call(handlerSagaUser.refreshToken, null);
      } else {
        yield put(actionReducerUI.SET_ERROR_MESSAGE(result));
      }
      console.log(result);
    }
    yield put(actionReducerUser.SET_AUTHENTICATION(false));
  } catch (error) {
    yield put(actionReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
    // if fetch authentication error then set authenciation = false to show frontbase
    yield put(actionReducerUser.SET_AUTHENTICATION(false));
  }
}

function* logout() {
  const result = yield call(handlerSagaUI.logout, null);
  if (result.success) {
    yield put(actionReducerUser.SET_ACCOUNT(null));
    yield put(actionReducerUI.SET_SUCCESS_MESSAGE({ message: "Logout successfully" }));
  } else {
    yield put(actionReducerUI.SET_ERROR_MESSAGE(result));
  }
}

function* signup(action) {
  try {
    const result = yield call(handlerSagaUI.signup, action.payload);
    if (result.success) {
      yield put(actionReducerUI.SET_IS_LOGIN_FORM(false));
      yield put(actionReducerUI.SET_SUCCESS_MESSAGE({ message: "Signup successfully" }));
      // yield put(actionReducerUser.SET_ACCOUNT(result.data.account));
    } else {
      yield put(actionReducerUI.SET_SIGNUP_FORM_ERRORS(result));
    }
  } catch (error) {
    yield put(actionReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
  }
}

function* updateInfo(action) {
  try {
    const result = yield call(handlerSagaUser.updateInfo, action.payload);
    console.log(result);
    if (result.success === true) {
      yield put(actionReducerUI.SET_SUCCESS_MESSAGE({ message: "Update successfully" }));
    } else {
      yield put(actionReducerUI.SET_UPDATE_FORM_ERRORS(result.errors));
    }
  } catch (error) {
    yield put(actionReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
  }
}

function* fetchAttribute() {
  try {
    const result = yield call(handlerSagaProducts.getAttributes, null);
    if (result.success === true) {
      yield put(actionReducerProducts.SET_ATTRIBUTE(result.data));
    } else {
      yield put(actionReducerUI.SET_ERROR_MESSAGE(result.errors));
    }
  } catch (error) {
    yield put(actionReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
  }
}

function* fetchProducts(action) {
  try {
    const result = yield call(handlerSagaProducts.getProducts, action.payload);
    if (result.success === true) {
      yield put(actionReducerProducts.SET_PRODUCT(result.data));
    } else {
      yield put(actionReducerUI.SET_ERROR_MESSAGE(result.errors));
    }
  } catch (error) {
    console.log(error);
    yield put(actionReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
  }
}

function* fetchTypes() {
  try {
    const result = yield call(handlerSagaProducts.getTypes, null);
    if (result.success === true) {
      yield put(actionReducerProducts.SET_TYPE(result.data.types));
    } else {
      yield put(actionReducerUI.SET_ERROR_MESSAGE(result.errors));
    }
  } catch (error) {
    console.log(error);
    yield put(actionReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
  }
}

function* fetchBrands() {
  try {
    const result = yield call(handlerSagaProducts.getBrands, null);
    if (result.success === true) {
      yield put(actionReducerProducts.SET_BRANDS(result.data.brands));
    } else {
      yield put(actionReducerUI.SET_ERROR_MESSAGE(result.errors));
    }
  } catch (error) {
    console.log(error);
    yield put(actionReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
  }
}

function* filterValues() {
  try {
    const result = yield call(handlerSagaProducts.filterValues, null);
    if (result.success === true) {
      yield put(actionReducerProducts.SET_FILTER_VALUES(result.data.values));
    } else {
      yield put(actionReducerUI.SET_ERROR_MESSAGE(result.errors));
    }
  } catch (error) {
    yield put(actionReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
  }
}

function* fetchProductDetail(action) {
  try {
    const result = yield call(handlerSagaProductDetail.fetchProduct, action.payload);
    if (result.success === true) {
      yield put(actionReducerProductDetail.SET_PRODUCT(result.data.item));
      yield put(actionReducerProductDetail.SET_ERROR(null));
      console.log(result.data.item);
    } else {
      /*
      result = {
        message: "..."
        name: "..."
        success: false
      }
       */
      yield put(actionReducerProductDetail.SET_ERROR(result));
    }
  } catch (error) {
    yield put(actionReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
  }
}

function* rootSaga() {
  yield takeEvery(actionsSagaUI.login, login);
  yield takeEvery(actionsSagaUser.fetchMe, fetchMe);
  yield takeEvery(actionsSagaUI.logout, logout);
  yield takeEvery(actionsSagaUI.signup, signup);
  yield takeEvery(actionsSagaUser.updateInfo, updateInfo);
  yield takeEvery(actionsSagaProducts.fetchAttribute, fetchAttribute);
  yield takeLatest(actionsSagaProducts.fetchProducts, fetchProducts);
  yield takeLatest(actionsSagaProducts.fetchTypes, fetchTypes);
  yield takeLatest(actionsSagaProducts.fetchBrands, fetchBrands);
  yield takeLatest(actionsSagaProducts.fetchFilterValues, filterValues);
  yield takeLatest(actionsSagaProductDetail.fetchProductDetail, fetchProductDetail);
}

export default rootSaga;
