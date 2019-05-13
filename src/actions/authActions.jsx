import axios from 'axios';
import * as actionTypes from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode'

export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/user/register',  userData )
        .then(res =>  history.push('/login'))
        .catch(err => dispatch({
            type: actionTypes.GET_ERROR,
            payload: err.response.data
        }))
};

export const loginUser = (userData) => dispatch => {
    axios.post('/api/user/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token); 
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));

        })
        .catch(err => dispatch({
            type: actionTypes.GET_ERROR,
            payload: err.response.data
        }))
}

export const setCurrentUser = (decoded) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}