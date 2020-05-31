import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { deleteBlogRequest } from "../../../store/redux/actions/blogAction";

import { Button, Dialog, DialogTitle, IconButton, Tooltip } from "@material-ui/core";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { Formik } from "formik";
import PropTypes from "prop-types";

import "./DelteBlogForm.scss";

const DeleteBlogForm = ({ blogId }) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	return (
		<>
			<Tooltip
				title="Delete Blog"
				onClick={() => setOpen(true)}
				placement="top"
				className="delete-blog-form-button">
				<IconButton>
					<DeleteOutline color="secondary" />
				</IconButton>
			</Tooltip>
			<Formik
				initialValues={{}}
				onSubmit={(values, actions) => {
					dispatch(deleteBlogRequest(blogId));
					setOpen(false);
				}}>
				{(props) => (
					<>
						<Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
							<DialogTitle>Are you sure want to delete this blog ?</DialogTitle>
							<Button type="submit" color="primary" onClick={props.handleSubmit}>
								Delete
							</Button>
							<Button color="secondary" onClick={() => setOpen(false)}>
								Cancel
							</Button>
						</Dialog>
					</>
				)}
			</Formik>
		</>
	);
};

DeleteBlogForm.propTypes = {
	blogId: PropTypes.string.isRequired,
};

export default DeleteBlogForm;
