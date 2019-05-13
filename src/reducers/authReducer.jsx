import * as actionTypes from '../actions/types';
import _ from 'lodash';


const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState , action){
    switch(action.type) {
        case actionTypes.SET_CURRENT_USER:
        return {
            ...state,
            isAuthenticated: !_.isEmpty(action.payload),
            user: action.payload
        }
        default: 
            return state;
    }
}