import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { Tooltip, IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";

import "./Navbar.scss";

import AddBlogForm from "../../blogs/addBlogForm/AddBlogForm";
import Notifications from "../notifications/Notifications";

const Navbar = () => {
	const { authReducer } = useSelector((state) => state);
	const { authenticated } = authReducer;

	return (
		<AppBar>
			<Toolbar className="nav-container">
				{authenticated ? (
					<>
						<AddBlogForm />
						<Link to="/">
							<Tooltip title="Home">
								<IconButton>
									<HomeIcon />
								</IconButton>
							</Tooltip>
						</Link>
						<Notifications />
					</>
				) : (
					<>
						<Button color="inherit" component={Link} to="/">
							Home
						</Button>
						<Button color="inherit" component={Link} to="/login">
							Login
						</Button>
						<Button color="inherit" component={Link} to="/signup">
							SignUp
						</Button>
					</>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
