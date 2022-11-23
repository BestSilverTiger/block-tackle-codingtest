import React, { useState, useEffect } from 'react';
import './styles.css';

export default function YelpCard ({img, name, rating, reviewCnt, price, title, url}) {
	let categories = title.map((title) => title.title).join(",");
	const getRaitingIcon = (rating) => {
		switch (rating) {
			case 0:
				return 'images/yelp_stars/small_0.png';
			case 1:
				return 'images/yelp_stars/small_1.png';
			case 1.5:
				return 'images/yelp_stars/small_1_half.png';
			case 2:
				return 'images/yelp_stars/small_2.png';
			case 2.5:
				return 'images/yelp_stars/small_2_half.png';
			case 3:
				return 'images/yelp_stars/small_3.png';
			case 3.5:
				return 'images/yelp_stars/small_3_half.png';
			case 4:
				return 'images/yelp_stars/small_4.png';
			case 4.5:
				return 'images/yelp_stars/small_4_half.png';
			case 5:
				return 'images/yelp_stars/small_5.png';
			default:
				break;
		}
	}
	return (
		<>
			<a href={url} target="_blank" rel="noreferrer">
				<div className="main-wrapper">
					<div className="image-wrapper">
						<img className="image" src={img} alt={name} />
					</div>
					<div className="content-wrapper">
						<div className="name-text">{name}</div>
						<div className="rating-review">
							<img src={getRaitingIcon(rating)} style={{ objectFit: 'contain' }} alt='rating'/>
							{/* <div className="rating">{rating} rating - </div> */}
							<div className="review">{reviewCnt} reviews</div>
						</div>
						<div className="price">
							<span>{price}-</span>
							<span>{categories}</span>
						</div>
					</div>
				</div>
			</a>
		</>
	)
}
