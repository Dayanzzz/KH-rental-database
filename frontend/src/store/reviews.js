import { csrfFetch } from './csrf';

export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";

const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews,
});

export const getSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews));
    }
};



const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            return { ...state, [action.reviews.spotId]: action.reviews };
        default:
            return state;
    }
};

export default reviewsReducer;