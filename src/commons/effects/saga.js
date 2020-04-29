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
      yield put(actionReducerUI.SET_SUCCESS_MESSAGE({ message: "Login successfully" }));
      yield put(actionReduceruser.SET_ACCOUNT(result.data.account));
    } else {
      yield put(actionReducerUI.SET_ERROR_MESSAGE(result));
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchMe() {
  try {
    const result = yield call(handlerSagaUser.fetchMe, null);
    if (result.success) {
      yield put(actionReduceruser.SET_ACCOUNT(result.data.account));
    } else {
      yield put(actionReducerUI.SET_ERROR_MESSAGE(result));
      console.log(result);
    }
    yield put(actionReduceruser.SET_AUTHENTICATION(false));
  } catch (error) {
    console.log(error);
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

function* rootSaga() {
  yield takeEvery(actionsSagaUI.login, login);
  yield takeEvery(actionsSagaUser.fetchMe, fetchMe);
  yield takeEvery(actionsSagaUI.logout, logout);
}

export default rootSaga;
