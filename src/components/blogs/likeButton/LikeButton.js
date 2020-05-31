import React from "react";
import { Link } from "react-router-dom";

import { Tooltip } from "@material-ui/core";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const LikeButton = () => {
	return (
		<Tooltip title="Like" placement="top">
			<Link to="/login">
				<FavoriteBorder color="primary" />
			</Link>
		</Tooltip>
	);
};

export default LikeButton;
