import * as types from "../../constants/types";
import { takeEvery, takeLatest, call, put, select, delay } from "redux-saga/effects";
import authServices from "../../services/authServices";
import jwtDecode from "jwt-decode";
import {
	getUserSucceeded,
	getUserFailed,
	loadingProcessing,
	loadingProcessed,
	getUserRequest,
	closeModal,
	markNotificationReadSucceeded,
	markNotificationReadFailed,
} from "../redux/actions/authAction";
import { fetchBlogSucceeded } from "../redux/actions/blogAction";

function* loginUser({ email, password }) {
	try {
		const responseAuth = yield authServices.loginUser({ email, password });
		yield authServices.attachTokenToHeader(responseAuth.data.token);
		yield authServices.saveToLocalStorage(responseAuth.data.token);
		yield delay(1000);
		const userData = yield authServices.getUser();
		yield put({ type: types.GET_USER_SUCCEEDED, userData });
		yield put({ type: types.LOGIN_USER_SUCCEEDED });
	} catch (error) {
		const { data } = error.response;
		yield put({ type: types.LOGIN_USER_FAILED, error: data });
	}
}

function* signUpUser({ email, password, confirmPassword, handle }) {
	try {
		const responseAuth = yield authServices.signUpUser({ email, password, confirmPassword, handle });
		yield authServices.attachTokenToHeader(responseAuth.data.token);
		yield authServices.saveToLocalStorage(responseAuth.data.token);
		const userData = yield authServices.getUserApi();
		yield put(getUserSucceeded(userData));
		yield put({ type: types.SIGN_UP_USER_SUCCEEDED });
	} catch (error) {
		const { data } = error.response;
		yield put({ type: types.SIGN_UP_USER_FAILED, error: data });
	}
}

function* logoutUser() {
	try {
		yield authServices.logoutUser();
		yield put({ type: types.LOGOUT_USER_SUCCEEDED });
	} catch (error) {
		const { data } = error.response;
		yield put({ type: types.LOGOUT_USER_FAILED, error: data });
	}
}

function* checkAuthenticated() {
	const token = localStorage.getItem("token");
	console.log("token", token);
	if (token && typeof token === "string") {
		yield authServices.attachTokenToHeader(token);
		const decodedToken = jwtDecode(token);
		if (new Date(decodedToken.exp * 1000) < Date.now()) {
			yield put({ type: types.LOGOUT_USER_REQUEST });
			window.location.href = "/login";
		} else {
			console.log("run get user after check auth");
			const userData = yield authServices.getUser();
			yield put({ type: types.GET_USER_SUCCEEDED, userData });
			yield put({ type: types.AUTHENTICATED_SUCCEEDED });
		}
	}
	// When token is not available
	else yield put({ type: types.AUTHENTICATED_FAILED });
}

function* getUser() {
	const token = localStorage.getItem("token");
	try {
		yield authServices.attachTokenToHeader(token);
		const userData = yield authServices.getUser();
		yield put(getUserSucceeded(userData));
	} catch (error) {
		console.log(error);
		yield put(getUserFailed(error.response.data));
	}
}

function* getUserByUserHandle({ userHandle }) {
	yield put(loadingProcessing());
	const token = localStorage.getItem("token");
	try {
		yield authServices.attachTokenToHeader(token);
		const userDataByUserHandle = yield authServices.getUserByUserHandle(userHandle);
		yield put(getUserSucceeded(userDataByUserHandle.user));
		yield put(fetchBlogSucceeded(userDataByUserHandle.screams));
		yield put(loadingProcessed());
	} catch (error) {
		console.log(error);
		yield put(getUserFailed(error.response.data));
		yield put(loadingProcessed());
	}
}

function* editUser({ userEditData }) {
	yield put(loadingProcessing());
	try {
		yield authServices.editUser(userEditData);
		yield put(getUserRequest());
		yield put(loadingProcessed());
		yield put(closeModal());
	} catch (error) {
		console.log(error);
		yield put(loadingProcessed());
		yield put(closeModal());
	}
}

function* uploadUserImage({ formData }) {
	const token = localStorage.getItem("token");

	yield put(loadingProcessing());
	try {
		yield authServices.attachTokenToHeader(token);
		yield authServices.uploadUserImage(formData);
		yield put(getUserRequest());
		yield delay(3000);
	} catch (error) {
		yield put(loadingProcessed());
	}
}

function* markNotificationRead({ notificationId }) {
	console.log(notificationId);
	try {
		yield authServices.markNotificationRead(notificationId);
		yield put(markNotificationReadSucceeded());
	} catch (error) {
		console.log(error);
		yield put(markNotificationReadFailed(error.response.data));
	}
}

export default function* authSaga() {
	yield takeLatest(types.LOGIN_USER_REQUEST, loginUser);
	yield takeLatest(types.SIGN_UP_USER_REQUEST, signUpUser);
	yield takeLatest(types.LOGOUT_USER_REQUEST, logoutUser);
	yield takeLatest(types.GET_USER_RESQUEST, getUser);
	yield takeLatest(types.GET_USER_BY_USERHANDLE_RESQUEST, getUserByUserHandle);
	yield takeLatest(types.EDIT_USER_REQUEST, editUser);
	yield takeLatest(types.UPLOAD_USER_IMAGE_RESQUEST, uploadUserImage);
	yield takeEvery(types.AUTHENTICATED_REQUEST, checkAuthenticated);
	yield takeLatest(types.MARK_NOTIFICATION_READ_REQUEST, markNotificationRead);
}
