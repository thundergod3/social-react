import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { markNotificationReadRequest } from "../../../store/redux/actions/authAction";

import { Menu, MenuItem, IconButton, Tooltip, Typography, Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Notifications = () => {
	const { authReducer } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState(null);
	const { notifications } = authReducer;

	let notificationIcon;

	dayjs.extend(relativeTime);

	const onMenuOpen = () => {
		let unReadNotificationId = notifications.filter((not) => !not.read).map((not) => not.notificationId);
		dispatch(markNotificationReadRequest(unReadNotificationId));
	};

	if (notifications && notifications.length !== 0) {
		notifications.filter((not) => not.read === false).length > 0
			? (notificationIcon = (
					<Badge badgeContent={notifications.filter((not) => not.read === false).length} color="secondary">
						<NotificationsIcon />
					</Badge>
			  ))
			: (notificationIcon = <NotificationsIcon />);
	} else {
		notificationIcon = <NotificationsIcon />;
	}

	return (
		<>
			<Tooltip placement="top" title="Notifications">
				<IconButton
					aria-owns={anchorEl ? "simple-menu" : undefined}
					aria-haspopup="true"
					onClick={(e) => setAnchorEl(e.target)}>
					{notificationIcon}
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}
				onEntered={() => onMenuOpen()}>
				{notifications && notifications.length !== 0 ? (
					notifications.map((not) => {
						const verb = not.type === "like" ? "liked" : "commented on";
						const time = dayjs(not.createdAt).fromNow;
						const iconColor = not.read ? "primary" : "secondary";
						const icon =
							not.type === "like" ? (
								<FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
							) : (
								<ChatIcon color={iconColor} style={{ marginRight: 10 }} />
							);
						return (
							<MenuItem key={not.createdAt} onClick={() => setAnchorEl(null)}>
								{icon}
								<Typography
									component={Link}
									color="default"
									variant="body2"
									to={`/user/${not.recipient}/scream/${not.screamId}`}>
									{not.sender} {verb} your blog {time}
								</Typography>
							</MenuItem>
						);
					})
				) : (
					<MenuItem onClick={() => setAnchorEl(null)}>You have no notifications yet</MenuItem>
				)}
			</Menu>
		</>
	);
};

export default Notifications;
