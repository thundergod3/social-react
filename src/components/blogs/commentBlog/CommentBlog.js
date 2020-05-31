import React, { Fragment } from "react";

import { useSelector } from "react-redux";

import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import "./CommentBlog.scss";

const CommentBlog = ({ comments }) => {
	return (
		<Grid container>
			{comments &&
				comments.map((comment, index) => {
					const { body, createdAt, userImage, userHandle } = comment;
					return (
						<Fragment key={createdAt}>
							<Grid item sm={12}>
								<Grid container>
									<Grid item sm={2}>
										<img src={userImage} alt="comment" className="comment-blog-image" />
									</Grid>
									<Grid item sm={9} style={{ textAlign: "left" }}>
										<div className="comment-blog-data">
											<Typography
												variant="h5"
												component={Link}
												to={`/users/${userHandle}`}
												color="primary">
												{userHandle}
											</Typography>
											<Typography variant="body2" color="textSecondary">
												{dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
											</Typography>
											<hr className="comment-blog-invisible-separator" />
											<Typography variant="body1">{body}</Typography>
										</div>
									</Grid>
								</Grid>
							</Grid>
							{index !== comments.length - 1 && <hr className="comment-blog-visible-separator" />}
						</Fragment>
					);
				})}
		</Grid>
	);
};

export default CommentBlog;
