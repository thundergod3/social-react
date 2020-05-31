import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import { Grid, Dialog, DialogContent, Typography, IconButton, Tooltip, CircularProgress } from "@material-ui/core";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

import { useSelector, useDispatch } from "react-redux";
import { getBlogDetailRequest } from "../../../store/redux/actions/blogAction";
import CloseIcon from "@material-ui/icons/Close";

import PropTypes from "prop-types";
import dayjs from "dayjs";

import "./BlogDetail.scss";
import CommentBlog from "../commentBlog/CommentBlog";
import CommentForm from "../commentForm/CommentForm";

const BlogDetail = ({ blogId, userHandle, history }) => {
	const { blogReducer, authReducer } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [state, setState] = useState({
		open: false,
		oldPath: "",
		newPath: "",
	});
	const { blogDetail, loadingModal } = blogReducer;
	const { authenticated } = authReducer;

	const handleOpen = () => {
		if (authenticated) {
			let oldPath = window.location.pathname;
			const newPath = `/user/${userHandle}/scream/${blogId}`;

			window.history.pushState(null, null, newPath);

			if (oldPath === newPath) oldPath = `/user/${userHandle}`;

			setState((prevState) => {
				return {
					...prevState,
					open: true,
					oldPath,
					newPath,
				};
			});
			dispatch(getBlogDetailRequest(blogId));
		} else {
			history.push("/login");
		}
	};

	useEffect(() => {
		function triggerModal() {
			if (window.location.pathname.substring(12, window.location.pathname.length) === `scream/${blogId}`) {
				dispatch(getBlogDetailRequest(blogId));
				setState((prevState) => {
					return {
						...prevState,
						open: true,
					};
				});
			}
		}
		triggerModal();
	}, [window.location.pathname.substring(12, window.location.pathname.length)]);

	const handleClose = () => {
		window.history.pushState(null, null, state.oldPath);

		setState((prevState) => {
			return {
				...prevState,
				open: false,
			};
		});

		if (window.location.pathname.substring(12, window.location.pathname.length) === `scream/${blogId}`) {
			history.push("/");
		}
	};

	return (
		<>
			<Tooltip title="Expand Blog" placement="top" className="blog-detail-expand-btn">
				<IconButton onClick={() => handleOpen()}>
					<UnfoldMore color="primary" />
				</IconButton>
			</Tooltip>
			<Dialog open={state.open} onClose={() => handleClose()} fullWidth maxWidth="sm">
				<Tooltip title="Close" placement="top" className="blog-detail-icon-close-btn">
					<IconButton onClick={() => handleClose()}>
						<CloseIcon />
					</IconButton>
				</Tooltip>
				<DialogContent style={{ textAlign: "center", padding: "20px" }}>
					{loadingModal ? (
						<div className="blog-detail-spinner">
							<CircularProgress size={200} thickness={2} />
						</div>
					) : (
						<Grid container spacing={16} className="blog-detail-container">
							<Grid item sm={5}>
								<img src={blogDetail.userImage} alt="Profile" className="blog-detail-user-image" />
							</Grid>
							<Grid item sm={7}>
								<Typography component={Link} color="primary" variant="h5" to={`/user/${userHandle}`}>
									@{userHandle}
								</Typography>
								<hr className="blog-detail-invisible-separator" />
								<Typography variant="body2" color="textSecondary">
									{dayjs(blogDetail.createdAt).format("h:mm a, MMMM DD YYYY")}
								</Typography>
								<hr className="blog-detail-invisible-separator" />
								<Typography variant="body1">{blogDetail.body}</Typography>
							</Grid>
							<hr className="blog-detail-visible-separator" />
							<CommentForm blogId={blogId} />
							<CommentBlog comments={blogDetail.comments} />
						</Grid>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};

BlogDetail.propTypes = {
	blogId: PropTypes.string.isRequired,
	userHandle: PropTypes.string.isRequired,
};

export default withRouter(BlogDetail);
