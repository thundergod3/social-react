import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { authenticatedRequest } from "../store/redux/actions/authAction";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import AppIcon from "../images/logo512.png";
import LoginForm from "../components/users/loginForm/LoginForm";

const LoginPage = () => {
	const authReducer = useSelector((state) => state.authReducer);
	const dispatch = useDispatch();
	const { authenticated, isChecingkAuth } = authReducer;

	useEffect(() => {
		dispatch(authenticatedRequest());
	}, []);

	if (isChecingkAuth) {
		return null;
	}

	if (authenticated) {
		return <Redirect to="/" />;
	}

	return (
		<Grid container className="login-page-container">
			<Grid item sm />
			<Grid item sm>
				<img src={AppIcon} alt="monkey" className="page-image-logo" />
				<Typography variant="h2" className="page-title">
					Login
				</Typography>
				<LoginForm />
			</Grid>
			<Grid item sm />
		</Grid>
	);
};

export default LoginPage;
