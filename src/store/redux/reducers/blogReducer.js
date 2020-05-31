import * as types from "../../../constants/types";

const initalState = {
	blogList: [],
	blogDetail: {},
	errorBlog: {},
	loadingBlog: false,
	modal: false,
	comments: [],
	loadingModal: false,
};

const blogReducer = (state = initalState, action) => {
	switch (action.type) {
		case types.FETCH_BLOG_SUCCEEDED: {
			return {
				...state,
				blogList: action.blogList,
			};
		}
		case types.FETCH_BLOG_FAILED: {
			return {
				...state,
				errorBlog: action.error,
			};
		}
		case types.LIKE_BLOG_SUCCEEDED: {
			let index = state.blogList.findIndex((blog) => blog.screamId === action.likeBlog.screamId);
			state.blogList[index] = action.likeBlog;
			return {
				...state,
			};
		}
		case types.LIKE_BLOG_FAILED: {
			return {
				...state,
				errorBlog: action.error,
			};
		}
		case types.UNLIKE_BLOG_SUCCEEDED: {
			let index = state.blogList.findIndex((blog) => blog.screamId === action.unlikeBlog.screamId);
			state.blogList[index] = action.unlikeBlog;
			return {
				...state,
			};
		}
		case types.UNLIKE_BLOG_FAILED: {
			return {
				...state,
				errorBlog: action.error,
			};
		}
		case types.DELETE_BLOG_SUCCEEDED: {
			console.log(action.blogId);
			return {
				...state,
				blogList: state.blogList.filter((blog) => blog.screamId !== action.blogId),
			};
		}
		case types.DELETE_BLOG_FAILED: {
			return {
				...state,
				errorBlog: action.error,
			};
		}
		case types.ADD_BLOG_SUCCEEDED: {
			return {
				...state,
				blogList: [action.newBlog, ...state.blogList],
			};
		}
		case types.ADD_BLOG_FAILED: {
			return {
				...state,
				errorBlog: action.error,
			};
		}
		case types.GET_BLOG_DETAIL_SUCCEEDED: {
			return {
				...state,
				blogDetail: action.blogDetail,
			};
		}
		case types.GET_BLOG_DETAIL_FAILED: {
			return {
				...state,
				errorBlog: action.error,
			};
		}
		case types.SUBMIT_COMMENT_BLOG_SUCCEEDED: {
			return {
				...state,
				blogDetail: {
					...state.blogDetail,
					comments: [action.commentData, ...state.blogDetail.comments],
				},
			};
		}
		case types.SUBMIT_COMMENT_BLOG_FAILED: {
			return {
				...state,
				errorBlog: action.error,
			};
		}
		case types.LOADING_BLOG_PROCESSING: {
			console.log("loading");
			return {
				...state,
				loadingBlog: true,
			};
		}
		case types.LOADING_BLOG_PROCESSED: {
			return {
				...state,
				loadingBlog: false,
			};
		}
		case types.LOADING_MODAL_PROCESSING: {
			console.log("loading");
			return {
				...state,
				loadingModal: true,
			};
		}
		case types.LOADING_MODAL_PROCESSED: {
			return {
				...state,
				loadingModal: false,
			};
		}
		case types.CLEAR_ERROR: {
			return {
				...state,
				errorBlog: {},
			};
		}
		case types.OPEN_BLOG_MODAL: {
			return {
				...state,
				modal: true,
			};
		}
		case types.CLOSE_BLOG_MODAL: {
			return {
				...state,
				modal: false,
				errorBlog: {},
			};
		}
		default: {
			return state;
		}
	}
};

export default blogReducer;
