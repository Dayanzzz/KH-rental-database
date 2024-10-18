import { csrfFetch } from './csrf';

export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const ADD_REVIEW = "reviews/ADD_REVIEW";



const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews,
});

const addReview = (spotId, review) => ({
    type: ADD_REVIEW,
    spotId,
    review,
});



export const getSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews));
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
    }
};


const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            return { ...state, [action.reviews.spotId]: action.reviews };
            case ADD_REVIEW: {
                const spotReviews = state[action.spotId] || [];
                return {
                    ...state,
                    [action.spotId]: [...spotReviews, action.review],
                };
            }
        default:
            return state;
    }
};

export default reviewsReducer;