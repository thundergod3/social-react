import * as types from "../../constants/types";
import { takeLatest, call, put, select } from "redux-saga/effects";
import blogServices from "../../services/blogServices";
import {
	loadingBlogProcessed,
	loadingBlogProcessing,
	likeBlogFailed,
	unLikeBlogFailed,
	likeBlogSucceeded,
	unLikeBlogSucceeded,
	deleteBlogFailed,
	deleteBlogSucceeded,
	addBlogFailed,
	addBlogSucceeded,
	clearError,
	closeModal,
	getBlogDetailFailed,
	getBlogDetailSucceeded,
	submitCommitBlogFailed,
	submitCommentBlogSucceeded,
	fetchBlogSucceeded,
	fetchBlogFailed,
	loadingModalProcessing,
	loadingModalProcessed,
} from "../redux/actions/blogAction";

function* fetchBlog() {
	yield put(loadingBlogProcessing());
	try {
		const blogList = yield blogServices.fetchBlog();
		yield put(fetchBlogSucceeded(blogList));
		yield put(loadingBlogProcessed());

		yield put(clearError());
	} catch (error) {
		console.log(error);
		yield put(fetchBlogFailed(error.response.data));
		yield put(loadingBlogProcessed());
	}
}

function* likeBlog({ blogId }) {
	// yield put(loadingBlogProcessing());
	try {
		const responseBlog = yield blogServices.likeBlog(blogId);
		console.log(responseBlog);
		yield put(likeBlogSucceeded(responseBlog));
		yield put(clearError());

		// yield put(loadingBlogProcessed());
	} catch (error) {
		console.log(error);
		// yield put(loadingBlogProcessed());
		yield put(likeBlogFailed(error.response.data));
	}
}

function* unlikeBlog({ blogId }) {
	// yield put(loadingBlogProcessing());
	try {
		const responseBlog = yield blogServices.unlikeBlog(blogId);
		yield put(unLikeBlogSucceeded(responseBlog));
		yield put(clearError());

		// yield put(loadingBlogProcessed());
	} catch (error) {
		console.log(error);
		// yield put(loadingBlogProcessed());
		yield put(unLikeBlogFailed(error.response.data));
	}
}

function* deleteBlog({ blogId }) {
	try {
		yield blogServices.deleteBlog(blogId);
		yield put(deleteBlogSucceeded(blogId));
		yield put(clearError());
	} catch (error) {
		console.log(error);
		yield put(deleteBlogFailed(error.response.data));
	}
}

function* addBlog({ newBlog }) {
	yield put(loadingBlogProcessing());
	try {
		const responseBlog = yield blogServices.addBlog(newBlog);
		yield put(addBlogSucceeded(responseBlog));
		yield put(loadingBlogProcessed());
		yield put(closeModal());
		yield put(clearError());
	} catch (error) {
		console.log(error);
		yield put(addBlogFailed(error.response.data));
		yield put(loadingBlogProcessed());
	}
}

function* getBlogUserDetail({ blogId }) {
	yield put(loadingModalProcessing());
	try {
		const responseBlog = yield blogServices.getBlogUserDetail(blogId);
		yield put(getBlogDetailSucceeded(responseBlog));
		yield put(loadingModalProcessed());
		yield put(clearError());
	} catch (error) {
		console.log(error);
		yield put(getBlogDetailFailed(error.response.data));
		yield put(loadingModalProcessed());
	}
}

function* submitCommentBlog({ blogId, commentData }) {
	try {
		const responseBlog = yield blogServices.submitCommentBlog(blogId, commentData);
		yield put(submitCommentBlogSucceeded(responseBlog));
	} catch (error) {
		console.log(error);
		yield put(submitCommitBlogFailed(error.response.data));
	}
}

export default function* blogSaga() {
	yield takeLatest(types.FETCH_BLOG_REQUEST, fetchBlog);
	yield takeLatest(types.LIKE_BLOG_REQUEST, likeBlog);
	yield takeLatest(types.UNLIKE_BLOG_REQUEST, unlikeBlog);
	yield takeLatest(types.DELETE_BLOG_REQUEST, deleteBlog);
	yield takeLatest(types.ADD_BLOG_REQUEST, addBlog);
	yield takeLatest(types.GET_BLOG_DETAIL_REQUEST, getBlogUserDetail);
	yield takeLatest(types.SUBMIT_COMMENT_BLOG_REQUEST, submitCommentBlog);
}
