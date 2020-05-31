import * as types from "../../../constants/types";

const initalState = {
	userData: {},
	likes: [],
	notifications: [],
	isChecingkAuth: true,
	isLogining: false,
	authenticated: false,
	loading: false,
	errorAuth: {},
	modal: false,
};

const authReducer = (state = initalState, action) => {
	switch (action.type) {
		case types.LOGIN_USER_REQUEST: {
			return {
				...state,
				isLogining: true,
			};
		}
		case types.LOGIN_USER_SUCCEEDED: {
			return {
				...state,
				isLogining: false,
				errorAuth: null,
				authenticated: true,
			};
		}
		case types.LOGIN_USER_FAILED: {
			return {
				...state,
				isLogining: false,
				errorAuth: action.error,
			};
		}
		case types.SIGN_UP_USER_REQUEST: {
			return {
				...state,
				isLogining: true,
			};
		}
		case types.SIGN_UP_USER_SUCCEEDED: {
			return {
				...state,
				isLogining: false,
				errorAuth: null,
				authenticated: true,
			};
		}
		case types.SIGN_UP_USER_FAILED: {
			return {
				...state,
				isLogining: false,
				errorAuth: action.error,
			};
		}
		case types.LOGOUT_USER_SUCCEEDED: {
			return {
				...state,
				errorAuth: {},
				authenticated: false,
				userData: [],
			};
		}
		case types.LOGOUT_USER_FAILED: {
			return {
				...state,
				errorAuth: action.error,
				authenticated: false,
				userData: [],
			};
		}
		case types.GET_USER_SUCCEEDED: {
			return {
				...state,
				userData: action.userData.credentials ? action.userData.credentials : action.userData,
				likes: action.userData.likes,
				notifications:
					action.userData.notifications !== undefined ? action.userData.notifications : state.notifications,
			};
		}
		case types.GET_USER_FAILED: {
			return { ...state, userData: {}, errorAuth: action.error };
		}
		case types.EDIT_USER_FAILED: {
			return {
				...state,
				errorAuth: action.error,
			};
		}
		case types.LIKE_BLOG_SUCCEEDED: {
			return {
				...state,
				likes: [
					...state.likes,
					{
						userHandle: state.userData.handle,
						screamId: action.likeBlog.screamId,
					},
				],
			};
		}
		case types.UNLIKE_BLOG_SUCCEEDED: {
			return {
				...state,
				likes: state.likes.filter((like) => like.screamId !== action.unlikeBlog.screamId),
			};
		}
		case types.MARK_NOTIFICATION_READ_SUCCEEDED: {
			state.notifications.forEach((not) => (not.read = true));
			return {
				...state,
			};
		}

		case types.AUTHENTICATED_REQUEST: {
			return { ...state, isChecingkAuth: true };
		}
		case types.AUTHENTICATED_SUCCEEDED: {
			return { ...state, authenticated: true, isChecingkAuth: false };
		}
		case types.AUTHENTICATED_FAILED: {
			return { ...state, authenticated: false, isChecingkAuth: false };
		}
		case types.LOADING_PROCESSING: {
			return {
				...state,
				loading: true,
			};
		}
		case types.LOADING_PROCESSED: {
			return {
				...state,
				loading: false,
			};
		}
		case types.OPEN_USER_MODAL: {
			return {
				...state,
				modal: true,
			};
		}
		case types.CLOSE_USER_MODAL: {
			return {
				...state,
				modal: false,
			};
		}
		default: {
			return state;
		}
	}
};

export default authReducer;
