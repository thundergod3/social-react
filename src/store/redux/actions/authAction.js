import * as types from "../../../constants/types";

export const loginUserRequest = (email, password) => {
	return {
		type: types.LOGIN_USER_REQUEST,
		email,
		password,
	};
};

export const loginUserSucceeded = () => {
	return {
		type: types.LOGIN_USER_SUCCEEDED,
	};
};

export const signUpUserRequest = (email, password, confirmPassword, handle) => {
	return {
		type: types.SIGN_UP_USER_REQUEST,
		email,
		password,
		confirmPassword,
		handle,
	};
};

export const signUpUserSucceeded = () => {
	return {
		type: types.SIGN_UP_USER_SUCCEEDED,
	};
};

export const logOutUserRequest = () => {
	return {
		type: types.LOGOUT_USER_REQUEST,
	};
};

export const logOutUserSucceeded = () => {
	return {
		type: types.LOGOUT_USER_SUCCEEDED,
	};
};

export const logOutUserFaled = () => {
	return {
		type: types.LOGOUT_USER_FAILED,
	};
};

export const getUserRequest = () => {
	return {
		type: types.GET_USER_RESQUEST,
	};
};

export const getUserSucceeded = (userData) => {
	return {
		type: types.GET_USER_SUCCEEDED,
		userData,
	};
};

export const getUserFailed = (error) => {
	return {
		type: types.GET_USER_SUCCEEDED,
		error,
	};
};

export const uploadUserImageRequest = (formData) => {
	return {
		type: types.UPLOAD_USER_IMAGE_RESQUEST,
		formData,
	};
};

export const editUserRequest = (userEditData) => {
	return {
		type: types.EDIT_USER_REQUEST,
		userEditData,
	};
};

export const editUserFailed = (error) => {
	return {
		type: types.EDIT_USER_FAILED,
		error,
	};
};

export const getUserByUserHandleRequest = (userHandle) => {
	return {
		type: types.GET_USER_BY_USERHANDLE_RESQUEST,
		userHandle,
	};
};

export const markNotificationReadRequest = (notificationId) => {
	return {
		type: types.MARK_NOTIFICATION_READ_REQUEST,
		notificationId,
	};
};

export const markNotificationReadSucceeded = () => {
	return {
		type: types.MARK_NOTIFICATION_READ_SUCCEEDED,
	};
};

export const markNotificationReadFailed = (error) => {
	return {
		type: types.MARK_NOTIFICATION_READ_FAILED,
		error,
	};
};

export const authenticatedRequest = () => {
	return {
		type: types.AUTHENTICATED_REQUEST,
	};
};

export const authenticatedSucceeded = (message) => {
	return {
		type: types.AUTHENTICATED_SUCCEEDED,
		message,
	};
};

export const authenticatedFailed = () => {
	return {
		type: types.AUTHENTICATED_FAILED,
	};
};

export const loadingProcessing = () => {
	return {
		type: types.LOADING_PROCESSING,
	};
};

export const loadingProcessed = () => {
	return {
		type: types.LOADING_PROCESSED,
	};
};

export const openModal = () => {
	return {
		type: types.OPEN_USER_MODAL,
	};
};

export const closeModal = () => {
	return {
		type: types.CLOSE_USER_MODAL,
	};
};
