 import './SpotsLayout.css';
 import aladin from '../images/aladin.jpg';



 function SpotsLayout() {
    
    return (
        <>
       <div className="row">
{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
  <div className="column">
        <img className="imgLayout" src={aladin}  />
        <div className="spotGridHeader">
    <h2>Spot 2</h2>
    <p>STAR 4.5</p>
  </div>

  <div className="spotGridDetails">
     <p>City, State</p>
  <p>$ PRICE $</p>
  </div>
   
  </div>
  

  <div className="column" >
  <img className="imgLayout" src={aladin}  />
  <div className="spotGridHeader">
    <h2>Spot 2</h2>
    <p>STAR 4.5</p>
  </div>
    
 <div className="spotGridDetails">
     <p>City, State</p>
  <p>$ PRICE $</p>
  </div>
  </div>


  <div className="column" >
  <img className="imgLayout" src={aladin}  />
  <div className="spotGridHeader">
    <h2>Spot 2</h2>
    <p>STAR 4.5</p>
  </div>
  <div className="spotGridDetails">
     <p>City, State</p>
  <p>$ PRICE $</p>
  </div>
  </div>


</div>


{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

<div className="row">


<div className="column">
<img className="imgLayout" src={aladin}  />
<div className="spotGridHeader">
    <h2>Spot 2</h2>
    <p>STAR 4.5</p>
  </div>
  <div className="spotGridDetails">
     <p>City, State</p>
  <p>$ PRICE $</p>
  </div>
</div>


<div className="column" >
<img className="imgLayout" src={aladin}  />
<div className="spotGridHeader">
    <h2>Spot 2</h2>
    <p>STAR 4.5</p>
  </div>
  <div className="spotGridDetails">
     <p>City, State</p>
  <p>$ PRICE $</p>
  </div>
</div>


<div className="column" >
<img className="imgLayout" src={aladin}  />
<div className="spotGridHeader">
    <h2>Spot 2</h2>
    <p>STAR 4.5</p>
  </div>
  <div className="spotGridDetails">
     <p>City, State</p>
  <p>$ PRICE $</p>
  </div>
</div>


</div>


</>
    )
}

export default SpotsLayout;