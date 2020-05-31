import React from "react";
import { fetchBlogRequest } from "../store/redux/actions/blogAction";
import { getUserRequest } from "../store/redux/actions/authAction";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogList from "../components/blogs/blogList/BlogList";
import { Grid } from "@material-ui/core";
import UserProfile from "../components/users/userProfile/UserProfile";

const token = localStorage.token;

const HomePage = () => {
	const { authReducer } = useSelector((state) => state);
	const dispatch = useDispatch();
	const { notification } = authReducer;

	useEffect(() => {
		dispatch(fetchBlogRequest());
		// if (token) dispatch(getUserRequest());
	}, []);

	return (
		<>
			<Grid container spacing={4}>
				<BlogList />
				<UserProfile />
			</Grid>
		</>
	);
};

export default HomePage;
