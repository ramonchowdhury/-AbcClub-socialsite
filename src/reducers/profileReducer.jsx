import * as actionTypes from '../actions/types';
const initialState = {
    profile: null,
    profiles: null,
    ploading: false,
}

export default function(state = initialState, action){
    switch(action.type) {
        case actionTypes.PROFILE_LOADING:
            return {
                ...state,
                ploading: true
            };
        case actionTypes.GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                ploading: false
            };
        case actionTypes.GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                ploading: false
            };
        case actionTypes.CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        default:
            return state;
    }
} 