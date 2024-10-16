import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots, removeSpot } from '../../store/spots';
import { useNavigate } from 'react-router-dom';
import './ManageSpots.css'; // Ensure your CSS file is linked

const ManageSpots = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    // const spots = useSelector(state => Object.values(state.spots).filter(spot => spot.ownerId === sessionUser.id));
    const spots=useSelector(state=>{
        if(sessionUser){
            return Object.values(state.spots).filter(spot=>spot.ownerId===sessionUser.id)
        } return [];
        // return [] just in case you are logging out and user id not available and you no longer have spots to render
    })

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [spotIdToDelete, setSpotIdToDelete] = useState(null);

    useEffect(() => {
        if (!sessionUser) {
            navigate('/');
        } else {
            dispatch(getSpots());
        }
    }, [dispatch, navigate, sessionUser]);

    const handleDelete = (spotId) => {
        setSpotIdToDelete(spotId);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (spotIdToDelete) {
            dispatch(removeSpot(spotIdToDelete));
        }
        setIsModalOpen(false);
        setSpotIdToDelete(null);
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
        setSpotIdToDelete(null);
    };

    return (
        <div className="manage-spots">
            <h1>Your Managed Spots</h1>
            {spots.length === 0 ? (
                <p>You don&apos;t have any spots listed. Create a new spot!</p>
            ) : (
                <ul>
                    {spots.map(spot => (
                        <li key={spot.id}>
                            <h2>{spot.name}</h2>
                            <p>{spot.city}, {spot.state}</p>
                            <p>${spot.price} per night</p>
                            <button onClick={() => navigate(`/spots/${spot.id}/edit`)}>Edit</button>
                            <button onClick={() => handleDelete(spot.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to remove this spot?</p>
                        <div className="modal-buttons">
                            <button className="delete-button" onClick={confirmDelete}>
                                Yes (Delete Spot)
                            </button>
                            <button className="cancel-button" onClick={cancelDelete}>
                                No (Keep Spot)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageSpots;
