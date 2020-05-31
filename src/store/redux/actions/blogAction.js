import * as types from "../../../constants/types";

export const fetchBlogRequest = () => {
	return {
		type: types.FETCH_BLOG_REQUEST,
	};
};

export const fetchBlogSucceeded = (blogList) => {
	return {
		type: types.FETCH_BLOG_SUCCEEDED,
		blogList,
	};
};

export const fetchBlogFailed = (error) => {
	return {
		type: types.FETCH_BLOG_FAILED,
		error,
	};
};

export const likeBlogRequest = (blogId) => {
	return {
		type: types.LIKE_BLOG_REQUEST,
		blogId,
	};
};

export const likeBlogSucceeded = (likeBlog) => {
	return {
		type: types.LIKE_BLOG_SUCCEEDED,
		likeBlog,
	};
};

export const likeBlogFailed = (error) => {
	return {
		type: types.LIKE_BLOG_FAILED,
		error,
	};
};

export const unLikeBlogRequest = (blogId) => {
	return {
		type: types.UNLIKE_BLOG_REQUEST,
		blogId,
	};
};

export const unLikeBlogSucceeded = (unlikeBlog) => {
	return {
		type: types.UNLIKE_BLOG_SUCCEEDED,
		unlikeBlog,
	};
};

export const unLikeBlogFailed = (error) => {
	return {
		type: types.UNLIKE_BLOG_FAILED,
		error,
	};
};

export const deleteBlogRequest = (blogId) => {
	return {
		type: types.DELETE_BLOG_REQUEST,
		blogId,
	};
};

export const deleteBlogSucceeded = (blogId) => {
	return {
		type: types.DELETE_BLOG_SUCCEEDED,
		blogId,
	};
};

export const deleteBlogFailed = (error) => {
	return {
		type: types.DELETE_BLOG_FAILED,
		error,
	};
};

export const addBlogRequest = (newBlog) => {
	return {
		type: types.ADD_BLOG_REQUEST,
		newBlog,
	};
};

export const addBlogSucceeded = (newBlog) => {
	return {
		type: types.ADD_BLOG_SUCCEEDED,
		newBlog,
	};
};

export const addBlogFailed = (error) => {
	return {
		type: types.ADD_BLOG_FAILED,
		error,
	};
};

export const getBlogDetailRequest = (blogId) => {
	return {
		type: types.GET_BLOG_DETAIL_REQUEST,
		blogId,
	};
};

export const getBlogDetailSucceeded = (blogDetail) => {
	return {
		type: types.GET_BLOG_DETAIL_SUCCEEDED,
		blogDetail,
	};
};

export const getBlogDetailFailed = (error) => {
	return {
		type: types.GET_BLOG_DETAIL_FAILED,
		error,
	};
};

export const submitCommentBlogRequest = (blogId, commentData) => {
	return {
		type: types.SUBMIT_COMMENT_BLOG_REQUEST,
		blogId,
		commentData,
	};
};

export const submitCommentBlogSucceeded = (commentData) => {
	return {
		type: types.SUBMIT_COMMENT_BLOG_SUCCEEDED,
		commentData,
	};
};

export const submitCommitBlogFailed = (error) => {
	return {
		type: types.SUBMIT_COMMENT_BLOG_FAILED,
		error,
	};
};

export const loadingBlogProcessing = () => {
	return {
		type: types.LOADING_BLOG_PROCESSING,
	};
};

export const loadingBlogProcessed = () => {
	return {
		type: types.LOADING_BLOG_PROCESSED,
	};
};

export const loadingModalProcessing = () => {
	return {
		type: types.LOADING_MODAL_PROCESSING,
	};
};

export const loadingModalProcessed = () => {
	return {
		type: types.LOADING_MODAL_PROCESSED,
	};
};

export const clearError = () => {
	return {
		type: types.CLEAR_ERROR,
	};
};

export const openModal = () => {
	return {
		type: types.OPEN_BLOG_MODAL,
	};
};

export const closeModal = () => {
	return {
		type: types.CLOSE_BLOG_MODAL,
	};
};
