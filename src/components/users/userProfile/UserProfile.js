import React from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { uploadUserImageRequest, logOutUserRequest } from "../../../store/redux/actions/authAction";

import { Grid, Button, Paper, Typography, IconButton, Tooltip } from "@material-ui/core";
import MUILink from "@material-ui/core/Link";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import EditIcon from "@material-ui/icons/Edit";

import "./UserProfile.scss";
import ProfileSkeleton from "../../util/profileSkeleton/ProfileSkeleton";
import EditForm from "../editForm/EditForm";

import dayjs from "dayjs";

let handle, createdAt, imageUrl, bio, website, location;
const token = localStorage.getItem("token");

const UserProfile = () => {
	const { authReducer } = useSelector((state) => state);
	const dispatch = useDispatch();
	const { userData, authenticated, loading } = authReducer;

	if (userData) {
		handle = userData.handle;
		createdAt = userData.createdAt;
		imageUrl = userData.imageUrl;
		bio = userData.bio;
		website = userData.website;
		location = userData.location;
	}

	const handleImageChange = (e) => {
		const image = e.target.files[0];
		const formData = new FormData();
		formData.append("image", image, image.name);
		dispatch(uploadUserImageRequest(formData));
	};

	const handleEditImage = () => {
		const fileInput = document.getElementById("imageInput");
		fileInput.click();
	};

	return (
		<Grid item sm={4} xs={12}>
			{!authenticated ? (
				!token && (
					<Paper className="user-profile-paper">
						<Typography variant="body2" align="center">
							No profile found, please login again
						</Typography>
						<div className="user-profile-button">
							<Button variant="contained" color="primary" component={Link} to="/login">
								Login
							</Button>
							<Button variant="contained" color="secondary" component={Link} to="/signup">
								Sign Up
							</Button>
						</div>
					</Paper>
				)
			) : Object.keys(userData).length === 0 ? (
				<ProfileSkeleton />
			) : (
				<Paper className="user-profile-paper">
					<div className="user-profile-container">
						<div className="user-profile-wrapper">
							<img src={imageUrl} alt="profile" className="user-profile-image " />
							<input type="file" id="imageInput" hidden="hidden" onChange={handleImageChange} />
							<Tooltip title="Edit profile picture" placement="top">
								<IconButton onClick={handleEditImage} className="user-profile-icon-button">
									<EditIcon color="primary" />
								</IconButton>
							</Tooltip>
						</div>
						<hr />
						<div className="user-profile-detail">
							<MUILink component={Link} to={`/user/${handle}`} color="primary" variant="h5">
								@{handle}
							</MUILink>
							<hr />
							{bio && <Typography variant="body2">{bio}</Typography>}
							<hr />
							{location && (
								<>
									<LocationOn color="primary"></LocationOn>
									<span>{location}</span>
									<hr />
								</>
							)}
							{website && (
								<>
									<LinkIcon color="primary"></LinkIcon>
									<a href={website} target="_blank" rel="noopener noreferrer">
										{" "}
										{website}
									</a>
									<hr />
								</>
							)}
							<CalendarToday color="primary" /> <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
						</div>
						<Tooltip title="Logout" placement="top">
							<IconButton onClick={() => dispatch(logOutUserRequest())}>
								<KeyboardReturn color="primary" />
							</IconButton>
						</Tooltip>
						<EditForm />
					</div>
				</Paper>
			)}
		</Grid>
	);
};

export default UserProfile;
