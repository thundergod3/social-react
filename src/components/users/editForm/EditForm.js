import React, { useState } from "react";
import { Formik } from "formik";

import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Tooltip,
	CircularProgress,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { useSelector, useDispatch } from "react-redux";
import { editUserRequest, openModal, closeModal } from "../../../store/redux/actions/authAction";

import "./EditForm.scss";

const EditForm = () => {
	const { authReducer } = useSelector((state) => state);
	const dispatch = useDispatch();
	const { userData, loading, modal } = authReducer;

	return (
		<>
			<Tooltip title="Edit Details" placement="top">
				<IconButton onClick={() => dispatch(openModal())} className="edit-form-icon-button">
					<EditIcon color="primary" />
				</IconButton>
			</Tooltip>
			<Dialog open={modal} onClose={() => dispatch(closeModal())} fullWidth maxWidth="sm">
				<DialogTitle>Edit your details</DialogTitle>
				<Formik
					initialValues={{
						bio: userData.bio ? userData.bio : "",
						website: userData.website ? userData.website : "",
						location: userData.location ? userData.location : "",
					}}
					onSubmit={(values, actions) => {
						dispatch(editUserRequest(values));
					}}>
					{(props) => (
						<>
							<DialogContent>
								<TextField
									name="bio"
									type="text"
									label="Bio"
									multiline
									rows="3"
									placeholder="A short bio about your seft"
									className="edit-form-text-field"
									value={props.values.bio}
									onChange={props.handleChange("bio")}
									fullWidth
								/>
								<TextField
									name="website"
									type="text"
									label="Website"
									placeholder="Your personal/professional website"
									className="edit-form-text-field"
									value={props.values.website}
									onChange={props.handleChange("website")}
									fullWidth
								/>
								<TextField
									name="location"
									type="text"
									label="Location"
									placeholder="Where you live"
									className="edit-form-text-field"
									value={props.values.location}
									onChange={props.handleChange("location")}
									fullWidth
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={() => dispatch(closeModal())} color="primary">
									Cancel
								</Button>
								<Button onClick={props.handleSubmit} color="primary">
									Save
									{loading && <CircularProgress size={30} className="edit-form-progress-spinner" />}
								</Button>
							</DialogActions>
						</>
					)}
				</Formik>
			</Dialog>
		</>
	);
};

export default EditForm;
