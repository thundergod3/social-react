import React, { useState, useEffect } from "react";
import { Formik } from "formik";

import { useSelector, useDispatch } from "react-redux";
import { addBlogRequest, openModal, closeModal } from "../../../store/redux/actions/blogAction";

import {
	Button,
	TextField,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Tooltip,
	CircularProgress,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import "./AddBlogForm.scss";

const AddBlogForm = () => {
	const { blogReducer } = useSelector((state) => state);
	const { errorBlog, loadingBlog, modal } = blogReducer;
	const dispatch = useDispatch();

	return (
		<>
			<Tooltip title="Post a Blog" placement="top">
				<IconButton onClick={() => dispatch(openModal())}>
					<AddIcon />
				</IconButton>
			</Tooltip>
			<Formik
				initialValues={{ body: "" }}
				onSubmit={(values, actions) => {
					dispatch(addBlogRequest(values));
					actions.resetForm();
				}}>
				{(props) => (
					<>
						<Dialog open={modal} onClose={() => dispatch(closeModal())} fullWidth maxWidth="sm">
							<Tooltip title="Close" placement="top" className="add-form-icon-close-btn">
								<IconButton onClick={() => dispatch(closeModal())}>
									<CloseIcon />
								</IconButton>
							</Tooltip>
							<DialogTitle>Post a new blog</DialogTitle>
							<DialogContent>
								<TextField
									name="body"
									type="text"
									label="BLOG!!!"
									multiline
									rows="3"
									placeholder="Blog at your fellow apes"
									error={errorBlog.body ? true : false}
									helperText={errorBlog.body}
									className="add-blog-form-text-field"
									onChange={props.handleChange("body")}
									fullWidth
								/>
								<Button
									type="submit"
									onClick={props.handleSubmit}
									variant="contained"
									color="primary"
									className="add-form-submit-btn"
									disabled={loadingBlog}>
									Submit
									{loadingBlog && (
										<CircularProgress size={30} className="add-form-progress-spinner" />
									)}
								</Button>
							</DialogContent>
						</Dialog>
					</>
				)}
			</Formik>
		</>
	);
};

export default AddBlogForm;
