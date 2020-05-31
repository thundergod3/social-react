import HttpMethod from "./index";

class blogServices {
	fetchBlog = () => {
		return HttpMethod.get("/screams").then((res) => res.data);
	};

	likeBlog = (blogId) => {
		return HttpMethod.get(`/scream/${blogId}/like`).then((res) => res.data);
	};

	unlikeBlog = (blogId) => {
		return HttpMethod.get(`/scream/${blogId}/unlike`).then((res) => res.data);
	};

	deleteBlog = (blogId) => {
		return HttpMethod.delete(`/scream/${blogId}`);
	};

	addBlog = (newBlog) => {
		return HttpMethod.post("/scream", newBlog).then((res) => res.data);
	};

	getBlogUserDetail = (blogId) => {
		return HttpMethod.get(`/scream/${blogId}`).then((res) => res.data);
	};

	submitCommentBlog = (blogId, commentData) => {
		console.log(commentData);
		return HttpMethod.post(`/scream/${blogId}/comment`, commentData).then((res) => res.data);
	};
}

export default new blogServices();
