import axios from 'axios';
import { chatBaseURL, ContestLogBaseURL } from '../../common/http-urls';
import { Token } from '../../common/LS';
import { chatActions } from './chat-slice';

export const fetchChatData = () => {
  
  return async (dispatch) => {
    const fetchData = async () => {
      const resp = await axios.get(chatBaseURL + `/last-days/${10}`,Token);
      const resp1 = await axios.get(ContestLogBaseURL + `/last-days/${10}`, Token);
      
      if (resp.status !== 200) {
        throw new Error('Could not fetch chat data!');
      }
      
      const chat = await resp.data;
      const log = await resp1.data;
      const newChat = log.map((obj) => {
        obj['chatTimestamp'] = obj['logTimestamp'];
        delete obj['logTimestamp'];
        return obj;
      });
      // console.log(data,' bot file');
      let combineData = chat.concat(newChat).sort((a, b) => new Date(a.chatTimestamp) - new Date(b.chatTimestamp));
      console.log(combineData);
      return combineData;
    }

    try {
      const chatData = await fetchData();
      dispatch(
        chatActions.replaceChat({
          items : chatData || [],
          changed: true
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const sendChatData = (chatData) => {
  return async (dispatch) => {
    
    const sendRequest = async () => {
      const response = await axios.post(chatBaseURL, chatData,Token);

      if (response.status !== 201) {
        throw new Error('Could not send chatData data!');
      }

      const data = await response.data;
      // console.log(data,' chatData success');

      return data;
    };

    try {
      await sendRequest();
      
    } catch (error) {
      // console.log(error);
    }
  };
};
