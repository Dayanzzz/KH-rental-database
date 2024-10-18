import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots, removeSpot } from '../../store/spots';
import { useNavigate, NavLink } from 'react-router-dom';
import './ManageSpots.css'; // Ensure your CSS is linked properly

const ManageSpots = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);

    const spots = useSelector(state => {
        if (sessionUser) {
            return Object.values(state.spots).filter(spot => spot.ownerId === sessionUser.id);
        }
        return [];
    });

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

    const starEmoji = '⭐';

    return (
        <div className="manage-spots-layout">
            <h1>Managed Spots</h1>
            <button className="ManageCreate" onClick={(e) => {
                                            e.stopPropagation(); // Prevents bubbling to NavLink
                                            navigate(`/spots/new`);
                                        }}>Create a New Spot</button>
            {spots.length === 0 ? (
                <p>You don&apos;t have any spots listed. Create a new spot!</p>
            ) : (
                <div className="row">
                    {spots.map(spot => (
                        <div className="column" key={spot.id}>
                            <div className="spotTile">
                                <NavLink to={`/spots/${spot.id}`} className="spotLink">
                                    <img
                                        className="imgLayout"
                                        src={spot.previewImage} // Assuming `previewImage` is an array
                                        alt={spot.name}
                                    />
                                    <div className="tooltip">{spot.name}</div>
                                </NavLink>

                                <div className="spotGridHeader">
                                    <div className="location">{spot.city}, {spot.state}</div>
                                    <div className="star">{starEmoji} {spot.starRating}</div>
                                </div>

                                <div className="spotGridDetails">
                                    <p>${spot.price} per night</p>
                                </div>

                                <div className="spotButtons">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevents bubbling to NavLink
                                            navigate(`/spots/${spot.id}/edit`);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevents bubbling to NavLink
                                            handleDelete(spot.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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