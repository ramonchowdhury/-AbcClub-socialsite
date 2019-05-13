import * as actionTypes from '../actions/types';

const initialState = {
    posts: [],
    post: {},
    loading: false
}

export default function(state = initialState , action){
    switch(action.type) {
        case actionTypes.POST_LOADING:
        return {
            ...state,
            loading: true
        }
        case actionTypes.ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case actionTypes.GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case actionTypes.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => {return action.payload !== post._id})
            }
        case actionTypes.GET_POST:
            return {
                ...state,
                post: action.payload
            }
        default: 
            return state;
    }
}