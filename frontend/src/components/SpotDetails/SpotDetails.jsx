// // src/components/SpotDetail.jsx

// import React from 'react';
// import './SpotDetail.css'; // Create a CSS file for styling

// function SpotDetail() {
//     const spot = {
//         name: "Cozy Mountain Cabin",
//         description: "A beautiful cabin nestled in the mountains, perfect for a peaceful getaway.",
//         city: "Aspen",
//         state: "Colorado",
//         country: "USA",
//         price: 150,
//         hostName: "John Doe",
//         images: [
//             "https://via.placeholder.com/300x200?text=Image+1",
//             "https://via.placeholder.com/300x200?text=Image+2",
//             "https://via.placeholder.com/300x200?text=Image+3",
//         ],
//         avgRating: 4.5,
//         reviewCount: 20,
//     };

//     return (
//         <div className="spot-detail">
//             <h1>{spot.name}</h1>
//             <p>{spot.description}</p>
//             <div className="spot-info">
//                 <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
//                 <p>Price: ${spot.price} per night</p>
//                 <p>Host: {spot.hostName}</p>
//                 <div className="images">
//                     {spot.images.map((image, index) => (
//                         <img key={index} src={image} alt={`Spot Image ${index + 1}`} />
//                     ))}
//                 </div>
//                 <div className="ratings">
//                     <p>⭐ {spot.avgRating} ({spot.reviewCount} reviews)</p>
//                 </div>
//                 <button onClick={() => alert('Coming soon!')}>Reserve</button>
//             </div>
//         </div>
//     );
// }

// export default SpotDetail;
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SpotDetail.css';

const SpotDetails = () => {
    const { spotId } = useParams();
    const [spot, setSpot] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSpotDetails = async () => {
            try {
                const response = await fetch(`/api/spots/${spotId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch spot details');
                }
                const data = await response.json();
                setSpot(data);

                const reviewsResponse = await fetch(`/api/spots/${spotId}/reviews`);
                if (!reviewsResponse.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const reviewsData = await reviewsResponse.json();
                setReviews(reviewsData.Reviews);


            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSpotDetails();
    }, [spotId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!spot) {
        return <div>Spot not found</div>;
    }

    return (
        <div className="spot-details">
            <div className="details-container">
                <h1>{spot.name}</h1>
                <p className="location">{spot.city}, {spot.state}, {spot.country}</p>
            </div>
            <div className="image-container">
                <div className="previewImage-container">
                    {spot.SpotImages.length > 0 && (
                        <img className="previewimage" src={spot.SpotImages[0].url} alt={spot.name} />
                    )}
                </div>
                <div className="thumbnailImages-container">
                    {spot.SpotImages.slice(1).map(image => (
                        <div className="thumbnailimage-box" key={image.id}>
                            <img className="thumbnailimage" src={image.url} alt={spot.name} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="hostname">
                <p>Hosted by: {spot.ownerId}</p>
            </div>
            <div className="description">
                <h2>{spot.description}</h2>
            </div>
            <div className="reviews-summary">
                <span role="img" aria-label="star">⭐</span>
                <span>{spot.avgStarRating.toFixed(1)} </span> {/* Ensures one decimal place */}
                <span> • </span>
                <span>{spot.numReviews} Review{spot.numReviews !== 1 ? 's' : ''}</span> {/* Singular/plural adjustment */}
            </div>
            <div className="reviews">
                
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className="review">
                            <p>
                                <strong>{review.User.firstName}</strong> - {new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </p>
                            <p>{review.review}</p>
                        </div>
                    ))
                ) : (
                    <p>Be the first to post a review!</p>
                )}
            </div>
        </div>
    );
    
};

export default SpotDetails;