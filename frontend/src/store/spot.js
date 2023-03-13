const LOAD_SPOTS = "spots/load";
const loadSpots = (spots) => {
  type: LOAD_SPOTS, 
  spots,
};

const initialState = {
  allSpots: {},
  singleSpot: {},
};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
        const allSpots = {};
        action.spots.forEach(spot=>{
            allSpots[spot.id] = spot
        })
        return {...state, allSpots:{...allSpots}}
    default:
      return state;
  }
};

export default spotReducer;
