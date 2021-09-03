import jwt from 'jsonwebtoken';
import {LOGIN_SUCCESSFUL, LOGOUT_REQUEST} from "./actionTypes";

const options = (data) => {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(data)
    };
};

export const handleSignupRequest = UserSignupDetails => {
    return dispatch => {
        return fetch('/api/users/signup', options(UserSignupDetails));
    };
};

export const handleLoginRequest = UserLoginDetails => {
    return dispatch => {
        return fetch('/api/users/login', options(UserLoginDetails))
            .then(res => res.json())
            .then(res => {
                let message = res.message || '';
                if (Boolean(message)) {
                    let token = res.data.token;
                    delete res.data;
                    // localStorage.setItem('jwtToken', token);
                    sessionStorage.setItem('jwtToken', token);
                    token = jwt.decode(token);
                    dispatch({
                        type: LOGIN_SUCCESSFUL,
                        authorizedUser: token.name,
                        userId: token.userId
                    });
                }
                return res;
            });
    }
}

export const handleLogoutRequest = () => {
    return dispatch => {
        sessionStorage.removeItem('jwtToken');
        localStorage.removeItem('AllArticles');
        localStorage.removeItem('MyArticles');
        sessionStorage.removeItem('LoginPage');
        dispatch({ type: LOGOUT_REQUEST });
    }
};