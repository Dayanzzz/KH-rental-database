import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpots } from '../../store/spots';

const UpdateSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const spot = useSelector((state) => state.spots[spotId]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState(''); // Added address
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (spot) {
            setName(spot.name || '');
            setDescription(spot.description || '');
            setAddress(spot.address || ''); // Set address if available
            setCity(spot.city || '');
            setState(spot.state || '');
            setCountry(spot.country || '');
            setPrice(spot.price || '');
            setLatitude(spot.lat || '');
            setLongitude(spot.lng || '');
        }
    }, [spot]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedSpot = {
            address, // Include address in the request
            city,
            state,
            country,
            lat: parseFloat(latitude), // Ensure lat is a number
            lng: parseFloat(longitude), // Ensure lng is a number
            name,
            description,
            price: parseFloat(price), // Ensure price is a number
        };
        
        const result = await dispatch(updateSpots(spotId, updatedSpot));

        if (result && result.errors) {
            setErrors(result.errors); // Handle errors if any
        } else {
            navigate(`/spots/${spotId}`);
        }
    };

    if (!spot) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-spot">
            <h1>Update Your Spot</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Address:
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
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
                    Country:
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Latitude:
                    <input
                        type="number"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Longitude:
                    <input
                        type="number"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Update Spot</button>
            </form>
            {errors && <div className="error">{JSON.stringify(errors)}</div>} {/* Display any errors */}
        </div>
    );
};

export default UpdateSpot;
