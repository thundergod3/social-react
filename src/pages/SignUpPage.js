import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppIcon from "../images/logo512.png";
import SignUpForm from "../components/users/signUpForm/SignUpForm";

const SignUpPage = () => {
	const authReducer = useSelector((state) => state.authReducer);
	const { authenticated, isChecingkAuth } = authReducer;

	if (isChecingkAuth) {
		return null;
	}

	if (authenticated) {
		return <Redirect to="/" />;
	}

	return (
		<Grid container className="sign-up-page-container">
			<Grid item sm />
			<Grid item sm>
				<img src={AppIcon} alt="monkey" className="page-image-logo" />
				<Typography variant="h2" className="page-title">
					Sign Up
				</Typography>
				<SignUpForm />
			</Grid>
			<Grid item sm />
		</Grid>
	);
};

export default SignUpPage;
