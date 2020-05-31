import { fork, all } from "redux-saga/effects";
import blogSaga from "./saga/blogSaga";
import authSaga from "./saga/authSaga";

export default function* rootSaga() {
	yield all([fork(blogSaga)]);
	yield all([fork(authSaga)]);
}
