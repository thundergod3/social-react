import React from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { unLikeBlogRequest, likeBlogRequest } from "../../../store/redux/actions/blogAction";

import { Tooltip, IconButton, Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

import "./BlogItem.scss";
import DeleteBlogForm from "../deleteBlogForm/DeleteBlogForm";
import BlogDetail from "../blogDetail/BlogDetail";

const BlogItem = ({ blog: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount } }) => {
	const { authReducer } = useSelector((state) => state);
	const dispatch = useDispatch();
	const { authenticated, likes, userData } = authReducer;

	dayjs.extend(relativeTime);

	const findLikedBlog = () => {
		if (likes && likes.find((like) => like.screamId === screamId)) return true;
		else return false;
	};

	return (
		<Card className="blog-item-container">
			<CardMedia image={userImage} title="Profile image" className="blog-item-image" />
			<CardContent className="blog-item-content">
				<Typography variant="h5" component={Link} to={`/user/${userHandle}`} color="primary">
					{userHandle}
				</Typography>
				{authenticated && userHandle === userData.handle ? <DeleteBlogForm blogId={screamId} /> : null}
				<Typography variant="body2" color="textSecondary">
					{dayjs(createdAt).fromNow()}
				</Typography>
				<Typography variant="body1">{body}</Typography>
				{!authenticated ? (
					<Tooltip title="Like" placement="top">
						<IconButton>
							<Link to="/login">
								<FavoriteBorder color="primary" />
							</Link>
						</IconButton>
					</Tooltip>
				) : findLikedBlog() ? (
					<Tooltip title="Undo like" onClick={() => dispatch(unLikeBlogRequest(screamId))} placement="top">
						<IconButton>
							<FavoriteIcon color="primary" />
						</IconButton>
					</Tooltip>
				) : (
					<>
						<Tooltip title="Like" onClick={() => dispatch(likeBlogRequest(screamId))} placement="top">
							<IconButton>
								<FavoriteBorder color="primary" />
							</IconButton>
						</Tooltip>
					</>
				)}
				<span>{likeCount} Likes</span>
				<Tooltip title="comments" placement="top">
					<IconButton>
						<ChatIcon color="primary" />
					</IconButton>
				</Tooltip>
				<span>{commentCount} comments</span>
				<BlogDetail blogId={screamId} userHandle={userHandle} />
			</CardContent>
		</Card>
	);
};

BlogItem.propTypes = {
	blog: PropTypes.object.isRequired,
};

export default BlogItem;
