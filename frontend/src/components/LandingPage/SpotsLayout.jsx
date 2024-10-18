//  import './SpotsLayout.css';
//  import aladin from '../images/aladin.jpg';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots'; 
import './SpotsLayout.css';
import { NavLink } from 'react-router-dom';

function SpotsLayout() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots)); // Get spots from Redux store

    const starEmoji = '⭐';

    useEffect(() => {
        dispatch(getSpots()); // Fetch spots 
    }, [dispatch]);

    console.log(spots);

    return (
        <>
            <div className="row">
                {spots.map(spot => { 
                    const averageRating = spot.avgStarRating ? spot.avgStarRating.toFixed(2) : 'New';
               
                    
                    return (
                    <div className="column" key={spot.id}>
                        <NavLink to={`/spots/${spot.id}`} className="spotTile"> 
                        {/* might need to add previewImage[0] */}
                           <div className="spotslayout-imagecontainer"> <img className="imgLayout" src={spot.previewImage} alt={spot.name} /></div>

                            
                            <div className="tooltip">{spot.name}</div>
                          <div className="spotslayout-infocontainer"> 
                             <div className="spotGridHeader">
                                <div className="location">{spot.city}, {spot.state}</div>
                                <div className="star">{starEmoji} {averageRating}
                                            </div> 
                                {/* {reviews.length===0 ? (
                                    <span>{starEmoji} New </span>
                                 ):(
                            <span>{starEmoji}{spot.starRating}</span>)}
 */}


                            </div>
                            <div className="spotGridDetails">
                                <p>${spot.price} night</p>
                            </div>
                            </div>
                        </NavLink>
                    </div>
                )
})}
            </div>
        </>
    );
}

export default SpotsLayout;



//{console.log('Rendering image for spot:', spot.name, 'URL:', spot.previewImage);







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