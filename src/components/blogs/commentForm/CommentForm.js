import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { submitCommentBlogRequest } from "../../../store/redux/actions/blogAction";

import { Button, Grid, TextField } from "@material-ui/core";

import { Formik } from "formik";

import "./CommentForm.scss";

const CommentForm = ({ blogId }) => {
	const { blogReducer, authReducer } = useSelector((state) => state);
	const dispatch = useDispatch();
	const { errorBlog } = blogReducer;
	const { authenticated } = authReducer;

	return (
		authenticated && (
			<Formik
				initialValues={{ body: "" }}
				onSubmit={(values, actions) => {
					dispatch(submitCommentBlogRequest(blogId, values));
					actions.resetForm();
				}}>
				{(props) => (
					<Grid item sm={12} style={{ textAlign: "center" }}>
						<TextField
							name="body"
							type="text"
							label="Comment on blog"
							error={errorBlog.comment ? true : false}
							helperText={errorBlog.comment}
							value={props.values.body}
							onChange={props.handleChange("body")}
							className="comment-form-text-field"
							fullWidth
						/>
						<Button
							variant="contained"
							type="submit"
							color="primary"
							className="comment-form-button"
							onClick={props.handleSubmit}>
							Submit
						</Button>
						<hr className="comment-form-visible-separator" />
					</Grid>
				)}
			</Formik>
		)
	);
};

export default CommentForm;
