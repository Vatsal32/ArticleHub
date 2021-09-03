import * as actionType from '../actions/actionTypes';
import jwt from 'jsonwebtoken';

const validatedCredentials = () => {
    const token = sessionStorage.getItem('jwtToken');
    if (token === null) {
        return false;
    } else {
        try {
            jwt.decode(token);
            return true;
        } catch (err) {
            return false;
        }
    }
}

const initialState = {
    userId: validatedCredentials() ? jwt.decode(sessionStorage.getItem('jwtToken')).userId : '',
    isAuthorized: validatedCredentials(),
    authorizedUser: validatedCredentials() ? jwt.decode(sessionStorage.getItem('jwtToken')).userName : '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LOGIN_SUCCESSFUL:
            return {
                ...state,
                userId: action.userId,
                isAuthorized: true,
                authorizedUser: action.authorizedUser,
            }
        case actionType.LOGOUT_REQUEST:
            return {
                isAuthorized: false,
                userId: '',
                authorizedUser: ''
            }
        default:
            return state;
    }
};

export default reducer;