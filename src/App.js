import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import "./App.scss";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Navbar from "./components/util/navbar/Navbar";
import * as authActions from "./store/redux/actions/authAction";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import UserPage from "./pages/UserPage";

const theme = createMuiTheme({
	palette: {
		primary: {
			light: "#33c9dc",
			main: "#00bcd4",
			dark: "#008394",
			contrastText: "#fff",
		},
		secondary: {
			light: "#ff6333",
			main: "#ff3d00",
			dark: "#b22a00",
			contrastText: "#fff",
		},
		typography: {
			useNextVariants: true,
		},
	},
});

const App = () => {
	const dispatch = useDispatch();
	const { authenticatedRequest } = authActions;

	useEffect(() => {
		dispatch(authenticatedRequest());
	}, []);

	return (
		<MuiThemeProvider theme={theme}>
			<Navbar />
			<div className="container">
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/login" component={LoginPage} />
					<Route path="/signup" component={SignUpPage} />
					<Route path="/user/:handle" component={UserPage} />
				</Switch>
			</div>
		</MuiThemeProvider>
	);
};

App.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	authActionsCreator: PropTypes.object.isRequired,
};

export default App;
