import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSpot } from '../../store/spots'; 
import { useNavigate } from 'react-router-dom';
import { uploadSpotImage } from '../../store/spots';
import './NewSpot.css';

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
    const [imageUrls, setImageUrls] = useState(['', '', '', '']); 
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [errors, setErrors] = useState({});

    const handleImageChange = (index, value) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value;
        setImageUrls(newImageUrls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!country) newErrors.country = "Country is required.";
        if (!address) newErrors.address = "Street address is required.";
        if (!city) newErrors.city = "City is required.";
        if (!state) newErrors.state = "State is required.";
        if (description.length < 30) newErrors.description = "Description needs 30 or more characters.";
        if (!name) newErrors.name = "Name is required.";
        if (!price) newErrors.price = "Price per night is required.";
        if (!latitude || latitude < -90 || latitude > 90) newErrors.latitude = "Latitude must be between -90 and 90.";
        if (!longitude || longitude < -180 || longitude > 180) newErrors.longitude = "Longitude must be between -180 and 180.";
        if (!previewImage) newErrors.previewImage = "Preview image is required.";

        const imageErrors = imageUrls.map(url => {
            const isValid = url === '' || /\.(png|jpg|jpeg)$/.test(url);
            return isValid ? '' : 'Image URL needs to end in png or jpg (or jpeg)';
        });

        if (imageErrors.some(error => error !== '')) {
            newErrors.imageErrors = imageErrors;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const data = {
            name,
            description,
            address,
            city,
            state,
            country,
            price: parseFloat(price),
            previewImage,
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
            images: imageUrls.filter(image => image) 
        };

        try {
            const result = await dispatch(addSpot(data));

            if (result && result.id) {
                await dispatch(uploadSpotImage(result.id, imageUrls, previewImage));
                alert('Spot created successfully!');
                navigate(`/spots/${result.id}`);
            } else {
                alert('Failed to create spot. Please check your inputs.');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred while creating the spot.';
            alert(errorMessage);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <center><div className="new-spot">
            <h1>Create a New Spot</h1>
            <h2 className="where">Where&apos;s your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <form onSubmit={handleSubmit}>

                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder='Country'
                    />
                    {errors.country && <p className="error">{errors.country}</p>}
                </label>

                <label>
                    Street Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Address'
                    />
                    {errors.address && <p className="error">{errors.address}</p>}
                </label>
            <div className="citystate">    
                    <label className="city">
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='City'
                    />
                    {errors.city && <p className="error">{errors.city}</p>}
                </label>
<p className="comma">,</p>
                <label className="state">
                     State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder='STATE'
                    />
                    {errors.state && <p className="error">{errors.state}</p>}
                </label>
</div>
        <div className="latlng">
        <label className="lat">
                    Latitude
                    <input
                        type="text"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder='Latitude'
                    />
                    {errors.latitude && <p className="error">{errors.latitude}</p>}
                </label>
            <p className="comma">,</p>
                <label className="lng">
                     Longitude
                    <input
                        type="text"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder='Longitude'
                    />
                    {errors.longitude && <p className="error">{errors.longitude}</p>}
                </label>

        </div>
                
                <label>
                    <h2 className="where">Describe your place to guests</h2>
                    <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                    

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Please write at least 30 characters'
                    />
                    {errors.description && <p className="error">{errors.description}</p>}
                </label>

                <label>
                    <h2 className="where">Create a title for your spot</h2>
                    <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                    
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name of your spot'
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </label>

                <label>
                    <h2 className="where">Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    
                    <div>
                        <span>$</span>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder='Price per night (USD)'
                        />
                    </div>
                    {errors.price && <p className="error">{errors.price}</p>}
                </label>

                <div className="photo-section">
                    <h2 className="where">Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <label>
                       
                        <input
                            type="text"
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.target.value)}
                            placeholder='Preview Image URL'
                        />
                        {errors.previewImage && <p className="error">{errors.previewImage}</p>}
                    </label>

                  
                    {imageUrls.map((url, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => handleImageChange(index, e.target.value)}
                                placeholder="Image URL"
                            />
                            {errors.imageErrors && errors.imageErrors[index] && (
                                <p className="error">{errors.imageErrors[index]}</p>
                            )}
                        </div>
                    ))}
                </div>

                <button className="createbtn" type="submit">Create Spot</button>
            </form>
        </div>
        </center>
    );
}

export default NewSpot;
