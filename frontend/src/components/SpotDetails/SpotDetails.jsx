
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SpotDetail.css';

const SpotDetails = () => {
    const { spotId } = useParams();
    const [spot, setSpot] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    
   
     
    // const currentUser = useSelector((state) => state.session.user);


    const handleReserveClick = () => {
        alert("Feature coming soon");
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
                       <h2>Hosted by: {spot.Owner.firstName}{spot.Owner.lastName}</h2>
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
                <span>{spot.numReviews} Review{spot.numReviews !== 1 ? 's' : ''}</span>
            </>
            ) : (
            <span>New</span>
          )}
                 </p>
                <button onClick={handleReserveClick}>Reserve</button>
             </div>
            </div>
            

            </div>



            <div className="reviews-summary">
            <span role="img" aria-label="star">⭐</span>
            {spot.numReviews > 0 ? (
             <>
            <span>{spot.avgStarRating.toFixed(1)} </span>
            <span> • </span>
            <span>{spot.numReviews} Review{spot.numReviews !== 1 ? 's' : ''}</span>
             </>
              ) : (
                 <span>New</span>
             )}
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