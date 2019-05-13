import * as actionTypes from '../actions/types';

const initialState = {}

export default function(state = initialState , action){
    switch(action.type) {
        case actionTypes.GET_ERROR:
            return action.payload;
        case actionTypes.CLEAR_ERROR:
            return {};
        default: 
            return state;
    }
} 