import * as actions from './../actions/actions';
import { updateObject } from './../../common/utils/utility';

const initialState = {
	token: null,
	userInfo: null,
	error: null,
	loading: false,
	authRedirectPath: '/home',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.AUTH_START:
			return updateObject(state, {
				error: null,
				loading: true,
			});
		case actions.AUTH_SUCCESS:
			return updateObject(state, {
				token: action.idToken,
				userInfo: action.userInfo,
				error: null,
				loading: false,
			});
		case actions.AUTH_FAIL:
			return updateObject(state, {
				error: action.error,
				loading: false,
			});
		case actions.AUTH_LOGOUT:
			return updateObject(state, {
				token: null,
				userInfo: null,
			});
		case actions.SET_AUTH_REDIRECT_PATH:
			return updateObject(state, {
				authRedirectPath: action.path,
			});
		default:
			return state;
	}
};

export default reducer;
