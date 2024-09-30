
// let num = "123.333";
// let numsToCheck = num.split('.')[0];
// console.log(numsToCheck);


//Latitude Errors
let latNum = 123.333;
let latNumToCheck = Math.floor(latNum)

if ( latNumToCheck < -90 ) {
    console.log(`"minLat": "Minimum latitude is invalid"`); 
}
if ( latNumToCheck > 90 ) {
   console.log(`"maxLat": "Maximum latitude is invalid"`);
    
}

//Longitude Errors
let lngNum = 177.333;
let lngNumToCheck = Math.floor(latNum)

if ( lngNumToCheck < -180 ) {
    console.log(`"minLng": "Minimum longitude is invalid"`); 
}
if ( lngNumToCheck > 180 ) {
   console.log(`"maxLng": "Maximum longitude is invalid"`);
}

//Price Errors
minPrice = 0;
maxPrice = 0;

if (minPrice >= 0 ) {
    console.log(`"minPrice": "Minimum price must be greater than or equal to 0"`);
}
if (maxPrice >= 0 ) {
    console.log(`"maxPrice": "Maximum price must be greater than or equal to 0"`);
}

//Page & Size Errors


/*
  "page": "Page must be greater than or equal to 1",
    "size": "Size must be greater than or equal to 1",
    "maxLat": "Maximum latitude is invalid",
    "minLat": "Minimum latitude is invalid",
    "minLng": "Maximum longitude is invalid",
    "maxLng": "Minimum longitude is invalid",
    "minPrice": "Minimum price must be greater than or equal to 0",
    "maxPrice": "Maximum price must be greater than or equal to 0"
*/