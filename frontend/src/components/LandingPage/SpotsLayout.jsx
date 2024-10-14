//  import './SpotsLayout.css';
//  import aladin from '../images/aladin.jpg';

// import React, { useEffect, useState } from 'react';
import './SpotsLayout.css';
import aladin from '../images/aladin.jpg'; // Fallback image

// function SpotsLayout() {
//   const [spots, setSpots] = useState([]); // State to hold fetched spots

//   useEffect(() => {
//     const fetchSpots = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/spots'); // Update with your backend URL
//         const data = await response.json();
//         setSpots(data.Spots || []); // Set the spots from the response, default to an empty array
//       } catch (error) {
//         console.error('Error fetching spots:', error);
//       }
//     };

//     fetchSpots();
//   }, []);

//   return (
//     <>
//       {/* Render spots in a grid layout */}
//       <div className="row">
//         {spots.length > 0 ? (
//           spots.map((spot) => (
//             <div className="column" key={spot.id}>
//               <img className="imgLayout" src={spot.previewImage || aladin} alt={spot.name} />
//               <div className="spotGridHeader">
//                 <h2>{spot.name}</h2>
//                 <p>STAR {spot.avgRating || 'N/A'}</p>
//               </div>
//               <div className="spotGridDetails">
//                 <p>{spot.city}, {spot.state}</p>
//                 <p>${spot.price}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No spots available</p>
//         )}
//       </div>
//     </>
//   );
// }

// export default SpotsLayout;







 function SpotsLayout() {
    const starEmoji = '⭐';
    return (
        <>
       <div className="row">
{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
<div className="column">
 <div className="spotTile">
 <img className="imgLayout" src={aladin} alt="Spot" />
 <div className="tooltip">Spot 1</div>
 <div className="spotGridHeader">
        
     
       <div className="location">City, State</div>
       <div className="star">{starEmoji} 4.5</div>
 </div>
<div className="spotGridDetails">
    <p>$/night</p>
 </div>
 </div>
</div>

  

<div className="column">
 <div className="spotTile">
 <img className="imgLayout" src={aladin} alt="Spot" />
 <div className="tooltip">Spot 2</div>
 <div className="spotGridHeader">
        
     
 <div className="location">City, State</div>
<div className="star">{starEmoji} 4.5</div>
 </div>
<div className="spotGridDetails">
    <p>$/night</p>
 </div>
 </div>
</div>


<div className="column">
 <div className="spotTile">
 <img className="imgLayout" src={aladin} alt="Spot" />
 <div className="tooltip">Spot 3</div>
 <div className="spotGridHeader">
        
     
       <div className="location">City, State</div>
       <div className="star">{starEmoji} 4.5</div>
 </div>
<div className="spotGridDetails">
    <p>$/night</p>
 </div>
 </div>
</div>




<div className="column">
 <div className="spotTile">
 <img className="imgLayout" src={aladin} alt="Spot" />
 <div className="tooltip">Spot 4</div>
 <div className="spotGridHeader">
        
     
       <div className="location">City, State</div>
       <div className="star">{starEmoji} 4.5</div>
 </div>
<div className="spotGridDetails">
    <p>$/night</p>
 </div>
 </div>
</div>

</div>


{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

<div className="row">


<div className="column">
 <div className="spotTile">
 <img className="imgLayout" src={aladin} alt="Spot" />
 <div className="tooltip">Spot 5</div>
 <div className="spotGridHeader">
        
     
       <div className="location">City, State</div>
       <div className="star">{starEmoji} 4.5</div>
 </div>
<div className="spotGridDetails">
    <p>$/night</p>
 </div>
 </div>
</div>

  

<div className="column">
 <div className="spotTile">
 <img className="imgLayout" src={aladin} alt="Spot" />
 <div className="tooltip">Spot 6</div>
 <div className="spotGridHeader">
        
     
 <div className="location">City, State</div>
<div className="star">{starEmoji} 4.5</div>
 </div>
<div className="spotGridDetails">
    <p>$/night</p>
 </div>
 </div>
</div>


<div className="column">
 <div className="spotTile">
 <img className="imgLayout" src={aladin} alt="Spot" />
 <div className="tooltip">Spot 7</div>
 <div className="spotGridHeader">
        
     
       <div className="location">City, State</div>
       <div className="star">{starEmoji} 4.5</div>
 </div>
<div className="spotGridDetails">
    <p>$/night</p>
 </div>
 </div>
</div>




<div className="column">
 <div className="spotTile">
 <img className="imgLayout" src={aladin} alt="Spot" />
 <div className="tooltip">Spot 8</div>
 <div className="spotGridHeader">
        
     
       <div className="location">City, State</div>
       <div className="star">{starEmoji} 4.5</div>
 </div>
<div className="spotGridDetails">
    <p>$/night</p>
 </div>
 </div>
</div>

</div>







</>
    )
}

export default SpotsLayout;