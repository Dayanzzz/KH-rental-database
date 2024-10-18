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
            <div className="image-container">
                <div className="previewImage-container">
                    {spot.SpotImages.length > 0 && (
                        <img className="previewimage" src={spot.SpotImages[0].url} alt={spot.name} />
                    )}
                </div>
                <div className="thumbnailImages-container">
                    {spot.SpotImages.slice(1).map((image) => (
                        <div className="thumbnailimage-box" key={image.id}>
                            <img className="thumbnailimage" src={image.url} alt={spot.name} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="details-container">
                <h1>{spot.name}</h1>
                <p className="location">{spot.city}, {spot.state}, {spot.country}</p>
                <p className="price">${spot.price} per night</p>
                <div className="description">
                    <h2>Description</h2>
                    <p>{spot.description}</p>
                </div>
                <div className="reviews">
                    <p>Number of Reviews: {spot.numReviews}</p>
                    <p>Average Rating: {spot.avgStarRating}</p>
                </div>
            </div>
        </div>
    );
};

export default SpotDetails;