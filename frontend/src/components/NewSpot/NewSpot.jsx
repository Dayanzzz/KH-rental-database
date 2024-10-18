import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSpot } from '../../store/spots'; 
import { useNavigate } from 'react-router-dom';

function NewSpot() {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [imageUrls, setImageUrls] = useState(['', '', '', '']); // Array for image URLs
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleImageChange = (index, value) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value;
        setImageUrls(newImageUrls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data to be submitted
        const data = {
            name,
            description,
            address,
            city,
            state,
            country,
            price: parseFloat(price), // Ensure price is a number
            previewImage: previewImage.startsWith('http') ? previewImage : `http://${previewImage}`,
            imageUrls: imageUrls.filter(url => url.startsWith('http')), // Filter out invalid URLs
            latitude: parseFloat(latitude), // Ensure latitude is a number
            longitude: parseFloat(longitude), // Ensure longitude is a number
        };

        console.log('Submitting data:', data);
        
        // Dispatch the addSpot action
        try {
            const result = await dispatch(addSpot(data));
            console.log('Result from addSpot:', result);
    
            if (result) {
                alert('Spot created!');
                navigate(`/spots/${result.id}`); // Navigate to the new spot's detail page
                // Optionally reset the form here
            } else {
                alert('Failed to create spot.');
            }
        } catch (error) {
            console.error('Error creating spot:', error);
    
            // Handle specific error messages
            const errorMessage = error.response?.data?.error || 'An error occurred while creating the spot.';
            alert(errorMessage);
        }
    };

    return (
        <div className="new-spot">
            <h1>Create a New Spot</h1>

            <h2>Where&apos;s your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Country:
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        placeholder="Street Address"
                    />
                </label>
                <label>
                    City:
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State:
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Latitude:
                    <input
                        type="text"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="Latitude"
                        required
                    />
                </label>

                <label>
                    Longitude:
                    <input
                        type="text"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="Longitude"
                        required
                    />
                </label>

                <label>
                    Describe your place to guests:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood. Please write at least 30 characters."
                    />
                </label>

                <label>
                    Create a title for your spot:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name of your spot"
                        required
                    />
                </label>

                <label>
                    Set a base price for your spot:
                    <div>
                        <span>$</span>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            placeholder="Price per night (USD)"
                        />
                    </div>
                </label>

                <div className="photo-section">
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <label>
                        Preview Image URL:
                        <input
                            type="text"
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value)}
                            placeholder="Preview Image URL"
                            required
                        />
                    </label>
                    <label>Image URLs:</label>
                    {imageUrls.map((url, index) => (
                        <input
                            key={index}
                            type="text"
                            value={url}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            placeholder="Image URL"
                        />
                    ))}
                </div>
               
                <button type="submit">Create Spot</button>
            </form>
        </div>
    );
}

export default NewSpot;
