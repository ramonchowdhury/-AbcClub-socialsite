import axios from 'axios';
import * as actionTypes from './types';

export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => {
            
            dispatch({
                type: actionTypes.GET_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: actionTypes.GET_PROFILE,
                payload: {}
            })
        })
}

export const createProfile = (profileData, history) => dispatch => {
    axios.post('/api/profile',profileData)
        .then(res => history.push('/'))
        .catch(err => dispatch({
            type: actionTypes.GET_ERROR,
            payload: err.response.data
        }))
}


export const addExperience = (expData, history) => dispatch => {
    axios.post('/api/profile/experience', expData)
        .then(res => history.push('/about'))
        .catch(err => dispatch({
            type: actionTypes.GET_ERROR,
            payload: err.response.data
        }))
}

export const addEducation = (eduData, history) => dispatch => {
    axios.post('/api/profile/education', eduData)
        .then(res => history.push('/about'))
        .catch(err => dispatch({
            type: actionTypes.GET_ERROR,
            payload: err.response.data
        }))
}

export const deleteAccount = () => dispatch => {
    if(window.confirm('Are you Sure? this can not be undoen!')){
        axios.delete('/api/profile')
            .then(res => {
                localStorage.removeItem('jwtToken');
                dispatch({
                    type: actionTypes.SET_CURRENT_USER,
                    payload: {}
                })
                dispatch(clearCurrentProfile())
            })
            .catch(err => dispatch({
                type: actionTypes.GET_ERROR,
                payload: err.response.data
            }))
    } 
}

export const getProfiles = () => dispatch => {
    axios.get('/api/profile/all')
        .then(res => dispatch({
            type: actionTypes.GET_PROFILES,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_PROFILES,
            payload: null
        }))
}

export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());
    axios.get(`/api/profile/handle/${handle}`)
        .then(res => dispatch({
            type: actionTypes.GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_PROFILE,
            payload: null
        }))
}


export const deleteExperience = (id) => dispatch => {
    axios.delete(`/api/profile/experience/${id}`)
        .then(res => dispatch({
            type: actionTypes.GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_ERROR,
            payload: err.response.data
        }))
}

export const deleteeEducation = (id) => dispatch => {
    axios.delete(`/api/profile/education/${id}`)
        .then(res => dispatch({
            type: actionTypes.GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_ERROR,
            payload: err.response.data
        }))
}

export const doFollow = (id) => dispatch => {
    axios.post(`/api/profile/follow/${id}`)
        .then(res => dispatch({
            type: actionTypes.FOLLOW,
            payload: {}
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_ERROR,
            payload: {}
        }))
}

export const doUnfollow = (id) => dispatch => {
    axios.post(`/api/profile/unfollow/${id}`)
        .then(res => dispatch({
            type: actionTypes.UNFOLLOW,
            payload: {}
        }))
        .catch(err => dispatch({
            type: actionTypes.GET_ERROR,
            payload: {}
        }))
}



//
export const setProfileLoading = () => {
    return {
        type: actionTypes.PROFILE_LOADING
    }
}

export const clearCurrentProfile = () => {
    return {
        type: actionTypes.CLEAR_CURRENT_PROFILE
    }
}