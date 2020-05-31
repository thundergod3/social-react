import React from "react";

import { Card, CardMedia, CardContent } from "@material-ui/core";

import NoImage from "../../../images/blank-profile-picture-973460_1280.png";

import "./BlogSkeleton.scss";

const BlogLoadingSkeleton = () => {
	return (
		<>
			{Array.from({ length: 5 }).map((item, index) => {
				return (
					<Card className="loading-blog-card" key={index}>
						<CardMedia className="loading-blog-image" image={NoImage} />
						<CardContent className="loading-blog-card-content">
							<div className="loading-blog-handle"></div>
							<div className="loading-blog-date"></div>
							<div className="loading-blog-fullline"></div>
							<div className="loading-blog-fullline"></div>
							<div className="loading-blog-halfline"></div>
						</CardContent>
					</Card>
				);
			})}
		</>
	);
};

export default BlogLoadingSkeleton;
