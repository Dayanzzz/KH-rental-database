//  import './SpotsLayout.css';
//  import aladin from '../images/aladin.jpg';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots'; // Adjust the path as necessary
import './SpotsLayout.css';
import aladin from '../images/aladin.jpg'; // Consider using dynamic images if available

function SpotsLayout() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots)); // Get spots from Redux store

    const starEmoji = '⭐';

    useEffect(() => {
        dispatch(getSpots()); // Fetch spots when the component mounts
    }, [dispatch]);

    return (
        <>
            <div className="row">
                {spots.map(spot => (
                    <div className="column" key={spot.id}>
                        <div className="spotTile">
                            <img className="imgLayout" src={aladin} alt="Spot" />
                            <div className="tooltip">{spot.name}</div>
                            <div className="spotGridHeader">
                                <div className="location">{spot.city}, {spot.state}</div>
                                <div className="star">{starEmoji} {spot.starRating}</div> {/* Assuming you have a starRating field */}
                            </div>
                            <div className="spotGridDetails">
                                <p>${spot.price}/night</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default SpotsLayout;












// function SpotsLayout() {
//     const starEmoji = '⭐';
//     return (
//         <>
//        <div className="row">
// {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
// <div className="column">
//  <div className="spotTile">
//  <img className="imgLayout" src={aladin} alt="Spot" />
//  <div className="tooltip">Spot 1</div>
//  <div className="spotGridHeader">
        
     
//        <div className="location">City, State</div>
//        <div className="star">{starEmoji} 4.5</div>
//  </div>
// <div className="spotGridDetails">
//     <p>$/night</p>
//  </div>
//  </div>
// </div>

  

// <div className="column">
//  <div className="spotTile">
//  <img className="imgLayout" src={aladin} alt="Spot" />
//  <div className="tooltip">Spot 2</div>
//  <div className="spotGridHeader">
        
     
//  <div className="location">City, State</div>
// <div className="star">{starEmoji} 4.5</div>
//  </div>
// <div className="spotGridDetails">
//     <p>$/night</p>
//  </div>
//  </div>
// </div>


// <div className="column">
//  <div className="spotTile">
//  <img className="imgLayout" src={aladin} alt="Spot" />
//  <div className="tooltip">Spot 3</div>
//  <div className="spotGridHeader">
        
     
//        <div className="location">City, State</div>
//        <div className="star">{starEmoji} 4.5</div>
//  </div>
// <div className="spotGridDetails">
//     <p>$/night</p>
//  </div>
//  </div>
// </div>




// <div className="column">
//  <div className="spotTile">
//  <img className="imgLayout" src={aladin} alt="Spot" />
//  <div className="tooltip">Spot 4</div>
//  <div className="spotGridHeader">
        
     
//        <div className="location">City, State</div>
//        <div className="star">{starEmoji} 4.5</div>
//  </div>
// <div className="spotGridDetails">
//     <p>$/night</p>
//  </div>
//  </div>
// </div>

// </div>


// {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

// <div className="row">


// <div className="column">
//  <div className="spotTile">
//  <img className="imgLayout" src={aladin} alt="Spot" />
//  <div className="tooltip">Spot 5</div>
//  <div className="spotGridHeader">
        
     
//        <div className="location">City, State</div>
//        <div className="star">{starEmoji} 4.5</div>
//  </div>
// <div className="spotGridDetails">
//     <p>$/night</p>
//  </div>
//  </div>
// </div>

  

// <div className="column">
//  <div className="spotTile">
//  <img className="imgLayout" src={aladin} alt="Spot" />
//  <div className="tooltip">Spot 6</div>
//  <div className="spotGridHeader">
        
     
//  <div className="location">City, State</div>
// <div className="star">{starEmoji} 4.5</div>
//  </div>
// <div className="spotGridDetails">
//     <p>$/night</p>
//  </div>
//  </div>
// </div>


// <div className="column">
//  <div className="spotTile">
//  <img className="imgLayout" src={aladin} alt="Spot" />
//  <div className="tooltip">Spot 7</div>
//  <div className="spotGridHeader">
        
     
//        <div className="location">City, State</div>
//        <div className="star">{starEmoji} 4.5</div>
//  </div>
// <div className="spotGridDetails">
//     <p>$/night</p>
//  </div>
//  </div>
// </div>




// <div className="column">
//  <div className="spotTile">
//  <img className="imgLayout" src={aladin} alt="Spot" />
//  <div className="tooltip">Spot 8</div>
//  <div className="spotGridHeader">
        
     
//        <div className="location">City, State</div>
//        <div className="star">{starEmoji} 4.5</div>
//  </div>
// <div className="spotGridDetails">
//     <p>$/night</p>
//  </div>
//  </div>
// </div>

// </div>



// </>
//     )
// }

// export default SpotsLayout;