import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSpot } from '../../store/spots'; 
import { useNavigate } from 'react-router-dom';
import { uploadSpotImage } from '../../store/spots';


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

        console.log('Submitting data:', data);



        try {
            const result = await dispatch(addSpot(data));

            console.log('Result from addSpot:', result);



            if (result && result.id) {
                await dispatch(uploadSpotImage(result.id, imageUrls));
                alert('Spot created successfully!');
                navigate(`/spots/${result.id}`);
            } else {
                alert('Failed to create spot. Please check your inputs.');
            }


        } catch (error) {
            console.error('Error creating spot:', error);
            const errorMessage = error.response?.data?.error || 'An error occurred while creating the spot.';
            alert(errorMessage);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };




    return (
        <div className="new-spot">
            <h1>Create a New Spot</h1>

            <h2> Where&apos;s your place located?</h2>

            <p>Guests will only get your exact address once they booked a reservation.</p>

            <form onSubmit={handleSubmit}>

                {Object.keys(errors).length > 0 && (
                    <div className="error-summary">

                        {Object.values(errors).map((error, index) => (
                            <p key={index} className="error">{error}</p>
                        ))}

                    </div>

                )}
                <label>
                    Country:
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    {errors.country && <p className="error">{errors.country}</p>}
                </label>

                <label>
                    Address:
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && <p className="error">{errors.address}</p>}
                </label>

                <label>
                    City:
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    {errors.city && <p className="error">{errors.city}</p>}
                </label>

                <label>
                    State:
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    {errors.state && <p className="error">{errors.state}</p>}
                </label>

                <label>
                    Latitude:
                    <input
                        type="text"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                    {errors.latitude && <p className="error">{errors.latitude}</p>}
                </label>

                <label>
                    Longitude:
                    <input
                        type="text"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                    {errors.longitude && <p className="error">{errors.longitude}</p>}
                </label>

                <label>
                    Describe your place to guests:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <p className="error">{errors.description}</p>}
                </label>

                <label>
                    Create a title for your spot:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </label>

                <label>
                    Set a base price for your spot:
                    <div>
                        <span>$</span>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    {errors.price && <p className="error">{errors.price}</p>}
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
                        />
                        {errors.previewImage && <p className="error">{errors.previewImage}</p>}
                    </label>


                    <label>Image URLs:</label>
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

                <button type="submit">Create Spot</button>
            </form>
        </div>
    );
}

export default NewSpot;
