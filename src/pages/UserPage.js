import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Grid } from "@material-ui/core";
import { getUserByUserHandleRequest, authenticatedRequest } from "../store/redux/actions/authAction";

import BlogList from "../components/blogs/blogList/BlogList";
import UserProfile from "../components/users/userProfile/UserProfile";
import { Redirect } from "react-router-dom";

const UserPage = (props) => {
	const { authReducer } = useSelector((state) => state);
	const { authenticated, isChecingkAuth } = authReducer;
	const dispatch = useDispatch();

	useEffect(() => {
		const handle = props.match.params.handle;
		// dispatch(getUserByUserHandleRequest(handle));
		// dispatch(authenticatedRequest());
	}, []);

	if (isChecingkAuth) {
		return null;
	}

	if (!authenticated) {
		return <Redirect to="/login" />;
	}

	return (
		<Grid container spacing={4}>
			<BlogList />
			<UserProfile />
		</Grid>
	);
};

export default UserPage;
