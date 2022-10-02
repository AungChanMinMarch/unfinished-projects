import {ActionTypes} from '@app/constants';

function doesHttpOnlyCookieExist(cookieName){
    const newCookie = cookieName + '=new_value;path=/;'
    document.cookie = newCookie
    const doesExist = document.cookie.indexOf(cookieName + '=') === -1;
    document.cookie = newCookie + '=;Max-Age=-999999'
    return doesExist;
}

const isAuth = (state = doesHttpOnlyCookieExist('token'), action)=>{
	switch(action.type){
		case ActionTypes.SIGN_IN:
			return true;
		case ActionTypes.SIGN_OUT:
			return false;
		default:
			return state;
	}
}

export default isAuth