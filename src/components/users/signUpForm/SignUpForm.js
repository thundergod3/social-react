import React from "react";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { TextField, Button, Typography, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import * as authActions from "../../../store/redux/actions/authAction";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

const SignUpForm = (props) => {
	const { isLogining, errorAuth, authActionsCreator } = props;
	const { signUpUserRequest } = authActionsCreator;

	return (
		<Formik
			initialValues={{ email: "", password: "", confirmPassword: "", handle: "" }}
			onSubmit={(values, actions) => {
				const { email, password, confirmPassword, handle } = values;
				signUpUserRequest(email, password, confirmPassword, handle);
			}}>
			{(props) => (
				<>
					<TextField
						id="email"
						name="email"
						type="email"
						label="Email"
						className="form-text-field"
						helperText={errorAuth.email}
						error={errorAuth.email ? true : false}
						value={props.values.email}
						onChange={props.handleChange("email")}
						onBlur={props.handleBlur("email")}
						fullWidth></TextField>
					<TextField
						id="password"
						name="password"
						type="password"
						label="Password"
						className="form-text-field"
						helperText={errorAuth.password}
						error={errorAuth.password ? true : false}
						value={props.values.password}
						onChange={props.handleChange("password")}
						onBlur={props.handleBlur("password")}
						fullWidth></TextField>
					<TextField
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						label="Confirm Password"
						className="form-text-field"
						helperText={errorAuth.confirmPassword}
						error={errorAuth.confirmPassword ? true : false}
						value={props.values.confirmPassword}
						onChange={props.handleChange("confirmPassword")}
						onBlur={props.handleBlur("confirmPassword")}
						fullWidth></TextField>
					<TextField
						id="handle"
						name="handle"
						type="text"
						label="Handle"
						className="form-text-field"
						helperText={errorAuth.handle}
						error={errorAuth.handle ? true : false}
						value={props.values.handle}
						onChange={props.handleChange("handle")}
						onBlur={props.handleBlur("handle")}
						fullWidth></TextField>
					{errorAuth.general && (
						<Typography variant="body2" className="custom-error">
							{errorAuth.general}
						</Typography>
					)}
					<Button
						onClick={props.handleSubmit}
						type="submit"
						variant="contained"
						color="primary"
						className="form-button"
						disabled={isLogining}>
						Sign Up
						{isLogining && <CircularProgress size={30} className="progress" />}
					</Button>
					<br />
					<small>
						Already have an account ? Login <Link to="/login">Here</Link>
					</small>
				</>
			)}
		</Formik>
	);
};

const mapStateToProps = (state) => {
	return {
		isLogining: state.authReducer.isLogining,
		errorAuth: state.authReducer.errorAuth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		authActionsCreator: bindActionCreators(authActions, dispatch),
	};
};

SignUpForm.propTypes = {
	isLogining: PropTypes.bool.isRequired,
	errorAuth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
