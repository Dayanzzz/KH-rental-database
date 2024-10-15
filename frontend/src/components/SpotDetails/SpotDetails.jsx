// src/components/SpotDetail.jsx

import React from 'react';
import './SpotDetail.css'; // Create a CSS file for styling

function SpotDetail() {
    const spot = {
        name: "Cozy Mountain Cabin",
        description: "A beautiful cabin nestled in the mountains, perfect for a peaceful getaway.",
        city: "Aspen",
        state: "Colorado",
        country: "USA",
        price: 150,
        hostName: "John Doe",
        images: [
            "https://via.placeholder.com/300x200?text=Image+1",
            "https://via.placeholder.com/300x200?text=Image+2",
            "https://via.placeholder.com/300x200?text=Image+3",
        ],
        avgRating: 4.5,
        reviewCount: 20,
    };

    return (
        <div className="spot-detail">
            <h1>{spot.name}</h1>
            <p>{spot.description}</p>
            <div className="spot-info">
                <p>Location: {spot.city}, {spot.state}, {spot.country}</p>
                <p>Price: ${spot.price} per night</p>
                <p>Host: {spot.hostName}</p>
                <div className="images">
                    {spot.images.map((image, index) => (
                        <img key={index} src={image} alt={`Spot Image ${index + 1}`} />
                    ))}
                </div>
                <div className="ratings">
                    <p>⭐ {spot.avgRating} ({spot.reviewCount} reviews)</p>
                </div>
                <button onClick={() => alert('Coming soon!')}>Reserve</button>
            </div>
        </div>
    );
}

export default SpotDetail;
