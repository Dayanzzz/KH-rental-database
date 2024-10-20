import { csrfFetch } from './csrf';


export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const UPDATE_SPOT = "spots/UPDATE_SPOT";
export const REMOVE_SPOT = "spots/REMOVE_SPOT";
export const ADD_SPOT = "spots/ADD_SPOT";
export const ADD_SPOT_IMAGE="spots/ADD_SPOT_IMAGE";

const load = (spots) => {
    console.log('Dispatching load action with spots:', spots);
    return {
        type: LOAD_SPOTS,
        spots: spots.Spots
    };
};

const update = (spot) => ({
  type: UPDATE_SPOT,
  spot
});

const add = (spot) => ({
  type: ADD_SPOT,
  spot
});


const addSpotImage =(image)=>({
  type:ADD_SPOT_IMAGE,
 image,
});

const remove = (spotId) => ({
  type: REMOVE_SPOT,
  spotId
});


const isLoggedIn = (state) => {
  return state.session.user !==null; 
};
//is user logged in?


export const getSpots = () => async (dispatch) => {
  const response = await fetch('/api/spots');
  if (response.ok) {
    const spots = await response.json();
    console.log('Fetched spots:',spots);
    dispatch(load(spots));
  }
};





export const updateSpots = (spotId, data) => async (dispatch, getState) => {
  const state = getState();
  if (!isLoggedIn(state)) {
 
    alert("You must be logged in to update a spot.");
    return;
  }

  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(update(spot));
    return spot;
  }
};




export const removeSpot = (spotId) => async (dispatch, getState) => {
  const state = getState();
  if (!isLoggedIn(state)) {

    alert("You must be logged in to remove a spot.");
    return;
  }

  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(remove(spotId));
  }
};




export const addSpot = (data) => async (dispatch, getState) => {
  const state = getState();
  if (!isLoggedIn(state)) {

    alert("You must be logged in to add a spot.");
    return;
  }

  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(add(spot));

    if (data.imageUrls && data.imageUrls.length > 0) {
      await dispatch(uploadSpotImage(spot.id, data.imageUrls));
  }

  
    return spot;
  }
  //adding this else statement
  else {
    const errorData = await response.json();
    console.error('Error creating spot:', errorData); 
    throw new Error('Failed to create spot'); 
  }
};


export const uploadSpotImage = (spotId, imageUrls, previewImage) => async (dispatch) => {
  if (previewImage) {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: previewImage, preview: true }), // Set this as preview
        });

        const newPreviewImage = await response.json();
        dispatch(addSpotImage(newPreviewImage)); // Dispatch the preview image
    } catch (error) {
        throw new Error(error.message || 'Failed to upload preview image');
    }
}

// Now handle the rest of the images
const promises = imageUrls.map((url) => 
    csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, preview: false }), // Other images are not previews
    })
);

try {
    const responses = await Promise.all(promises);
    const newImages = await Promise.all(responses.map(res => res.json()));
    newImages.forEach(newImage => {
        dispatch(addSpotImage(newImage)); // Dispatch each new image
    });
} catch (error) {
    throw new Error(error.message || 'Failed to upload additional images');
}
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const newSpots = {};
      action.spots.forEach(spot => {
        newSpots[spot.id] = spot;
      })
      return {
        ...state,
        ...newSpots
      }
    }
    case REMOVE_SPOT: {
      const newState = { ...state };
      delete newState[action.spotId];
      return newState;
    }
    case ADD_SPOT:
    case UPDATE_SPOT: {
      return {
        ...state,
        [action.spot.id]: action.spot
      };
    }
    case ADD_SPOT_IMAGE:  return {
      ...state,
      [action.image.spotId]: {
          ...state[action.image.spotId],
          images: [...(state[action.image.spotId]?.images || []), action.image],
      },
  };
   
    default:
      return state;
  }
};
export default spotsReducer;