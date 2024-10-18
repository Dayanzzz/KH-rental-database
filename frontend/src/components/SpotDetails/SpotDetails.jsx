
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {  submitReview } from '../../store/reviews';
import ReviewModal from './ReviewModal';
import './SpotDetail.css';

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [spot, setSpot] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const currentUser = useSelector((state) => state.session.user);

     
    // const currentUser = useSelector((state) => state.session.user);


    const handleReserveClick = () => {
        alert("Feature coming soon");
    };


    const handleReviewSubmit = (reviewText) => {
        const reviewData = {
            review: reviewText,
            userId: currentUser.id,
        };
        dispatch(submitReview(spotId, reviewData));
        setIsModalOpen(false); // Close modal after submission
    };

    useEffect(() => {
        const fetchSpotDetails = async () => {
            try {
                const response = await fetch(`/api/spots/${spotId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch spot details');
                }
                const data = await response.json();
                console.log('Fetched spot data', data);
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
{/* 
//////////////////////////////////////////////////////////////////////////////////////////////////// */}


            <div className="detailsbody">
                    
              <div className="leftdetails">
                    <div className="hostname">
                       <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                     </div>
                  <div className="description">
                         <p>{spot.description}</p>
             </div>
                    </div>
            

            <div className="rightdetails">

              <div className="callout-box">

                <h3>Price: ${spot.price.toFixed(2)} night</h3>
                <p>
                    <span role="img" aria-label="star">⭐</span>
                    {spot.numReviews > 0 ? (
            <>
                <span>{spot.avgStarRating.toFixed(1)} </span>
                <span> • </span>
                <span>{spot.numReviews} review{spot.numReviews !== 1 ? 's' : ''}</span>
            </>
            ) : (
            <span>New</span>
          )}
                 </p>
                <button onClick={handleReserveClick}>Reserve</button>
             </div>
            </div>
            

            </div>

            <hr style={{ margin: '20px 0' }} />

            <div className="reviews-summary">
            <span role="img" aria-label="star">⭐</span>
            {spot.numReviews > 0 ? (
             <>
            <span>{spot.avgStarRating.toFixed(1)} </span>
            <span> • </span>
            <span>{spot.numReviews} review{spot.numReviews !== 1 ? 's' : ''}</span>
             </>
              ) : (
                 <span>New</span>
             )}
            </div>

             <div className="review-modal">

             {currentUser && spot.Owner.id !== currentUser.id &&(
                <button onClick={() => setIsModalOpen(true)}>Post Your Review</button>
            )}
            <ReviewModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleReviewSubmit} 
            />
             </div>



            <div className="reviews">
                
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className="review">
                            <p>
                                <strong>{review.User.firstName}</strong> 
                            </p>
                            <p> {new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                            <p>{review.review}</p>
                        </div>
                    ))
                ) : (
                    <p className="first">Be the first to post a review!</p>
                )}
            </div>


        </div>
    );
    
};

export default SpotDetails;