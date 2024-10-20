import { csrfFetch } from './csrf';

export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const ADD_REVIEW = "reviews/ADD_REVIEW";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

const loadReviews = (spotId,reviews) => ({
    type: LOAD_REVIEWS,
    spotId,
    reviews,
});

const addReview = (spotId, review) => ({
    type: ADD_REVIEW,
    spotId,
    review,
});

const remove = (reviewId, spotId) => ({
    type: REMOVE_REVIEW,
    spotId,
    reviewId,
});

// const isLoggedIn = (state) => {
//     return state.session.user !== null; 
// };

export const getSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        console.log('Fetched reviews:',reviews);
        dispatch(loadReviews(reviews));
    } else {
        console.error("Failed to load reviews:", response);
    }
};

export const removeReview = (reviewId, spotId) => async (dispatch) => {
    console.log("Attempting to delete review with ID:", reviewId, "for spot ID:", spotId);
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(remove(spotId, reviewId));
        return { ok: true, data }; 
    } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete review');
    }
};

export const submitReview = (spotId, reviewData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
    });

    if (response.ok) {
        const newReview = await response.json();
        dispatch(addReview(spotId, newReview));
        return newReview;
    } else {
        console.error("Failed to submit review:", response);
    }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            return { ...state, [action.reviews.spotId]: action.reviews };
        case ADD_REVIEW:
            return {
                ...state,
                [action.spotId]: [...(state[action.spotId] || []), action.review],
            };
        case REMOVE_REVIEW: {
            const newReviews = state[action.spotId]?.filter(review => review.id !== action.reviewId) || [];
            return {
                ...state,
                [action.spotId]: newReviews,
            };
        }
        default:
            return state;
    }
};

export default reviewsReducer;
