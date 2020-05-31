import React from "react";

import Paper from "@material-ui/core/Paper";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import LocationOn from "@material-ui/icons/LocationOn";

import NoImage from "../../../images/blank-profile-picture-973460_1280.png";

import "./ProfileSkeleton.scss";

const ProfileSkeleton = () => {
	return (
		<Paper className="loding-profile-paper">
			<div className="loading-profile">
				<div className="loading-profile-image-wrapper">
					<img src={NoImage} alt="Profile" className="loading-profile-image" />
				</div>
				<div className="loading-profile-detail">
					<div className="loading-profile-handle" />
					<hr />
					<div className="loading-profile-fullline" />
					<div className="loading-profile-fullline" />
					<hr />
					<LocationOn color="primary" />
					<span>Location</span>
					<hr />
					<LinkIcon color="primary" /> https://website.com <hr /> <CalendarToday color="primary" />
					Joined Date
				</div>
			</div>
		</Paper>
	);
};

export default ProfileSkeleton;
