import { CLICK_CELL, REBUILD_GAMEBOARD, UPDATE_DIMENSIONS, UPDATE_NEXTCYCLE } from "../constants/action-types";

const initialState = {
    columns: 5,
    rows :5,
    cellBoardArray: []
  };
  
  function getShortcutValues(i, state){
        var valueArray = []

        var cols = state.columns
        var rows = state.rows
        var upperNeighbor = i - cols
        var lowerNeighbor = i + cols

        if( i >= cols) { //has upper neighbors
            if (i % cols != 0){
                valueArray.push (upperNeighbor-1)
            }

            valueArray.push(upperNeighbor)

            if (i % cols != cols-1){
                valueArray.push (upperNeighbor+1)
            }
        }

        if (i % cols != 0){ //has left neighbor
            valueArray.push (i-1)
        }

        if (i % cols != cols-1){ //has right neighbor
            valueArray.push (i+1)
        }

        if(parseInt(i/rows) < (rows-1)){ //has lower neighbor
            if (i % cols != 0){
                valueArray.push (lowerNeighbor-1)
            }

            valueArray.push(lowerNeighbor)

            if (i % cols != cols-1){
                valueArray.push (lowerNeighbor+1)
            }
        }

        return valueArray
  }

  function getLiveNeighborTotal(i, state){
    
    var currentCycleArray = state.cellBoardArray

    var shortcutValArray = getShortcutValues(i, state)

    var liveTotal = 0

    shortcutValArray.forEach(indexVal => {

        liveTotal =  currentCycleArray[indexVal] ? liveTotal + 1 : liveTotal

    });

    return liveTotal;

  }

  function getNextCycleArray(state){

    var currentCycleArray = state.cellBoardArray
    var nextCycleArray = new Array(currentCycleArray.length).fill(false)
    
    currentCycleArray.forEach(function (value, i) {
        
        var liveNeighbors = getLiveNeighborTotal(i , state)

        if(value == true && (liveNeighbors == 2 || liveNeighbors == 3)){
            nextCycleArray[i] = true
        }else if(value == false && (liveNeighbors == 3)){
            nextCycleArray[i] = true
        }else{
            nextCycleArray[i] = false
        }

    });

    return nextCycleArray
  }
  
  function getClearCycleArray(currentCycleArray){

    var nextCycleArray = new Array(currentCycleArray.length).fill(false)
    
    return nextCycleArray

  }

  function getInvertedCycleArray(currentCycleArray){

    var nextCycleArray = new Array(currentCycleArray.length).fill(false)
    
    currentCycleArray.forEach(function (value, i) {
        nextCycleArray[i] = !value
    });

    return nextCycleArray
  }

  function rootReducer(state = initialState, action) {

    switch (action.type) {
        case CLICK_CELL:
                var index = action.payload.index;
                var isAlive = action.payload.isAlive;
        
                var newBoardArray = [
                    ...state.cellBoardArray.slice(0, index),
                    isAlive,
                    ...state.cellBoardArray.slice(index + 1)
                ];
                
                return {
                    ...state,
                    cellBoardArray: newBoardArray
                }
            break;
        case REBUILD_GAMEBOARD:
                return {
                    ...state,
                    rows : parseInt(action.payload.rows),
                    columns: parseInt(action.payload.columns),
                    cellBoardArray: new Array(action.payload.columns * action.payload.rows).fill(false)
                }
            break;
        case UPDATE_DIMENSIONS:
                return {
                    ...state,
                    rows : parseInt(action.payload.rows),
                    columns: parseInt(action.payload.columns)
                }
            break;
        case UPDATE_NEXTCYCLE:

                var newBoardArray = []

                if (action.payload.updateType == "invert") {

                    newBoardArray =  getInvertedCycleArray(state.cellBoardArray);

                    return {
                        ...state,
                        cellBoardArray: newBoardArray
                    }

                }else if (action.payload.updateType == "clear") {

                    newBoardArray =  getClearCycleArray(state.cellBoardArray);

                    return {
                        ...state,
                        cellBoardArray: newBoardArray
                    }

                }else if ( action.payload.updateType == "next" ){

                    newBoardArray =  getNextCycleArray(state);

                    return {
                        ...state,
                        cellBoardArray: newBoardArray
                    }

                }                
                
            break;
        default:
            break;
    }

      return state;
  };
  
  export default rootReducer;