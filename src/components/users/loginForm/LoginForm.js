import React from "react";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { TextField, Button, Typography, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import * as authActions from "../../../store/redux/actions/authAction";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

const LoginForm = (props) => {
	const { errorAuth, authActionsCreator, isLogining } = props;
	const { loginUserRequest } = authActionsCreator;

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			onSubmit={(values, actions) => {
				const { email, password } = values;
				loginUserRequest(email, password);
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
						Login
						{isLogining && <CircularProgress size={30} className="progress" />}
					</Button>
					<br />
					<small>
						Don't have an account ? Sign up <Link to="/signup">Here</Link>
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

LoginForm.propTypes = {
	isLogining: PropTypes.bool.isRequired,
	errorAuth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
