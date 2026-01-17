import { getRequest, postRequest } from '../../utils/axios';
import { ChatApiUrl } from '../../constant';
import { handleAsyncAction } from '../helper';

const getChatApiUrl = (endPoints) => {
  return endPoints ? `${ChatApiUrl}/${endPoints}` : ChatApiUrl
}

export const getChats = async (data, dispatch) => {
  const response = await getRequest(getChatApiUrl(''), data, true, dispatch);
  return response?.data;
};

export const getChat= async (data, dispatch) => {
  const response = await getRequest(getChatApiUrl(`task/${data}`), data, true, dispatch);
  return response?.data;
};


export const getChatsAction = handleAsyncAction('sign/getChatsAction', getChats, 'get');
export const getChatAction = handleAsyncAction('sign/getChatAction', getChat, 'get');