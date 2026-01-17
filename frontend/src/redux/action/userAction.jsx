// api/auth.js
import axios from 'axios';
import { getRequest, postRequest } from '../../utils/axios';
import { UserApiUrl } from '../../constant';
import { handleAsyncAction } from '../helper';
import { setItemToLocalStorage } from '../../utils/helper';
import { storeToken } from '../reducers/userReducer';

const getUserApiUrl = (endPoints) => {
  return `${UserApiUrl}/${endPoints}`
}

export const registerUserApi = async (data, dispatch) => {
  const response = await postRequest(getUserApiUrl('register'), data, false, dispatch);
  return response.data;
};
export const getAllUser = async (data, dispatch) => {
  const response = await getRequest('user', data, true, dispatch);
  return response.data;
};

export const loginUserApi = async (data, dispatch) => {
  const response = await postRequest(getUserApiUrl('login'), data, false, dispatch);
  if (response) {

    let { data, message, success } = response?.data || {}
    if (success) {
      setItemToLocalStorage('token', data?.token)
      dispatch(storeToken(data?.token))
    }
  }
  return response.data;
};


export const registerUserAction = handleAsyncAction('auth/registerUserAction', registerUserApi);
export const loginUserAction = handleAsyncAction('auth/loginUserAction', loginUserApi);
export const getAllUserAction = handleAsyncAction('auth/getAllUserAction', getAllUser);