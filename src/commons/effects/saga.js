/* eslint-disable no-console */
import { takeEvery, call, put } from "redux-saga/effects";
import * as actionsSagaUI from "../../modules/ui/actionsSaga";
import * as actionsSagaUser from "../../modules/user/actionsSaga";

import * as handlerSagaUI from "../../modules/ui/handlers";
import * as handlerSagaUser from "../../modules/user/handlers";

import * as actionReducerUI from "../../modules/ui/reducers";
import * as actionReduceruser from "../../modules/user/reducers";

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
    yield put(actionReduceruser.SET_AUTHENTICATION(true));
    const result = yield call(handlerSagaUser.fetchMe, null);
    if (result.success) {
      yield put(actionReduceruser.SET_ACCOUNT(result.data.account));
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
    yield put(actionReduceruser.SET_AUTHENTICATION(false));
  } catch (error) {
    yield put(actionReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
    // if fetch authentication error then set authenciation = false to show frontbase
    yield put(actionReduceruser.SET_AUTHENTICATION(false));
  }
}

function* logout() {
  const result = yield call(handlerSagaUI.logout, null);
  if (result.success) {
    yield put(actionReduceruser.SET_ACCOUNT(null));
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
      // yield put(actionReduceruser.SET_ACCOUNT(result.data.account));
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

function* rootSaga() {
  yield takeEvery(actionsSagaUI.login, login);
  yield takeEvery(actionsSagaUser.fetchMe, fetchMe);
  yield takeEvery(actionsSagaUI.logout, logout);
  yield takeEvery(actionsSagaUI.signup, signup);
  yield takeEvery(actionsSagaUser.updateInfo, updateInfo);
}

export default rootSaga;
