import axios from 'axios';
import * as actionTypes from './types';

export const addPost = (postData) => dispatch => {
    dispatch(clearError());
    axios.post('/api/posts', postData)
        .then(res => dispatch({
            type: actionTypes.ADD_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_ERROR,
            payload: err.response.data
        }))
}


export const addComment = (postId, commentData) => dispatch => {
    dispatch(clearError());
    axios.post(`/api/posts/comment/${postId}`, commentData)
        .then(res => dispatch({
            type: actionTypes.GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_ERROR,
            payload: err.response.data
        }))
}

export const getPostByHandle = (id) => dispatch => {
    axios.get(`/api/posts/getpostsbyhandle/${id}`)
        .then(res => dispatch({
            type: actionTypes.GET_POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_POSTS,
            payload: null
        }))
}


export const getPosts = () => dispatch => {
    dispatch(setPostLodaing);
    axios.get('/api/posts')
        .then(res => dispatch({
            type: actionTypes.GET_POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_POSTS,
            payload: null
        }))
}


export const getPost = (id) => dispatch => {
    dispatch(setPostLodaing);
    axios.get(`/api/posts/${id}`)
        .then(res => dispatch({
            type: actionTypes.GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_POST,
            payload: null
        }))
}



export const addLike = (id) => dispatch => {
    axios.post(`/api/posts/like/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type: actionTypes.GET_ERROR,
            payload: err.response.data
        }))
}

export const removeLike = (id) => dispatch => {
    axios.post(`/api/posts/unlike/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type: actionTypes.GET_ERROR,
            payload: err.response.data
        }))
}

export const addLikeByHandle = (id, handle) => dispatch => {
    axios.post(`/api/posts/like/${id}`)
        .then(res => dispatch(getPostByHandle(handle)))
        .catch(err => dispatch({
            type: actionTypes.GET_ERROR,
            payload: err.response.data
        }))
}

export const removeLikeByHandle = (id, handle) => dispatch => {
    axios.post(`/api/posts/unlike/${id}`)
        .then(res => dispatch(getPostByHandle(handle)))
        .catch(err => dispatch({
            type: actionTypes.GET_ERROR,
            payload: err.response.data
        }))
}


export const deletePost = (id) => dispatch => {
    axios.delete(`/api/posts/${id}`)
        .then(res => dispatch({
            type: actionTypes.DELETE_POST,
            payload: id
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_ERROR,
            payload: err.response.data
        }))
}

export const deleteComment = (postId, commentId) => dispatch => {
    axios.delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res => dispatch({
            type: actionTypes.GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_ERROR,
            payload: err.response.data
        }))
}


// set loading state 
export const setPostLodaing = () => {
    return {
        type: actionTypes.POST_LOADING
    }
}
export const clearError = () => {
    return{
        type: actionTypes.CLEAR_ERROR
    }
}