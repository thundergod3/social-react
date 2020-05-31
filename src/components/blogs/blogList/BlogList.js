import React from "react";

import { connect, useSelector } from "react-redux";

import { Grid } from "@material-ui/core";

import BlogItem from "../blogItem/BlogItem";
import BlogSkeleton from "../../util/blogSkeleton/BlogSkeleton";

const BlogList = () => {
	const { blogReducer, authReducer } = useSelector((state) => state);
	const { blogList, loadingBlog } = blogReducer;
	const { loading } = authReducer;

	return (
		<Grid item sm={8} xs={12}>
			{loadingBlog || loading ? (
				<BlogSkeleton />
			) : blogList.length !== 0 ? (
				blogList.map((blog) => <BlogItem key={blog.screamId} blog={blog} />)
			) : (
				<p>No Scream from this user</p>
			)}
		</Grid>
	);
};

export default BlogList;
