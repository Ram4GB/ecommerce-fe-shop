import { takeEvery, put } from "redux-saga/effects";
import * as actionsReducerUI from "../../modules/ui/reducers";
import * as actionsSagaUI from "../../modules/ui/actionsSaga";

function* helloWord(action) {
  // CALL API WHATEVER YOU WANT use call(fn,..args[])

  // PROCESS RESULT HERE

  // DISPATCH TO STORE
  try {
    yield put(actionsReducerUI.HELLO_SAGA(action.payload));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

function* rootSaga() {
  yield takeEvery(actionsSagaUI.HELLO_SAGA, helloWord);
}

export default rootSaga;
