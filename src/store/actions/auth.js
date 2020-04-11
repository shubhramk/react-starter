import * as actions from './actions';
import { http } from './../../common/services/http.service';
import localStore from './../../common/services/localstorage.service';
import { stringifyJSON, parseJSON } from './../../common/utils/utility';
import {
	USER_INFO,
	AUTH_TOKEN,
	AUTH_EXPIRATION,
	DEFAULT_EXPIRATION_SEC,
} from './../../common/constants/constants';
import { AUTH_API } from './../../common/configs/path.config';

export const authStart = () => {
	return {
		type: actions.AUTH_START,
	};
};

export const authSuccess = (token, userInfo) => {
	return {
		type: actions.AUTH_SUCCESS,
		idToken: token,
		userInfo: userInfo,
	};
};

export const authFail = error => {
	return {
		type: actions.AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
	localStore.remove(AUTH_TOKEN);
	localStore.remove(AUTH_EXPIRATION);
	localStore.remove(USER_INFO);

	return {
		type: actions.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
		};
		const url = AUTH_API.LOGIN;
		http
			.post(url, authData)
			.then(response => {
				const res = Object.assign({}, response.data, {
					expiresIn: DEFAULT_EXPIRATION_SEC,
					userInfo: { email: email },
				});
				const expirationDate = new Date(
					new Date().getTime() + res.expiresIn * 1000
				);

				localStore.set(AUTH_TOKEN, res.token);
				localStore.set(AUTH_EXPIRATION, expirationDate);
				localStore.set(USER_INFO, stringifyJSON(res.userInfo));

				dispatch(authSuccess(res.token, res.userInfo));
				dispatch(checkAuthTimeout(res.expiresIn));
			})
			.catch(err => {
				const errMsg = 'Something went wrong';
				dispatch(authFail(errMsg));
			});
	};
};

export const setAuthRedirectPath = path => {
	return {
		type: actions.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStore.get(AUTH_TOKEN);
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStore.get(AUTH_EXPIRATION));
			if (expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				const userInfo = parseJSON(localStore.get(USER_INFO)) || '';
				dispatch(authSuccess(token, userInfo));
				dispatch(
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
				);
			}
		}
	};
};
