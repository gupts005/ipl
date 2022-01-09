import React, { useEffect, useState } from 'react';
import './chat.scss';
import socketIOClient from "socket.io-client";
import { EndPoint } from '../common/constants/data';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import SwipeableTemporaryDrawer from '../common/components/SwipableDrawer';
import styled from 'styled-components';

const Chat = () => {

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    });
  }
  
  useEffect(() => {
    window.addEventListener('resize', setDimension);
    
    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize]);

  const [messages, setMessages] = useState([]);
  
  const socket = socketIOClient(EndPoint, { transports: ['websocket'] });

  useEffect(() => {
    socket.on('message', data => {
      let temp = messages;
      temp.push(data.text);
      setMessages([...temp]);
      console.log(temp, ' sdsdsdsds');
    });

  }, [socket]);

  const [enteredMessage, setEnteredMessage] = useState('');
  const [enteredMsgTouched, setEnteredMsgTouched] = useState(false);

  const enteredMessageIsValid = enteredMessage.trim() !== '';
  const msgInputIsInvalid = !enteredMessageIsValid && enteredMsgTouched;

  let formIsValid = false;

  if (enteredMessageIsValid) {
    formIsValid = true;
  }

  const msgInputChangeHandler = event => {
    setEnteredMessage(event.target.value);
  };

  const msgInputBlurHandler = () => {
    setEnteredMsgTouched(true);
  };

  const sendChatDataHandler = event => {
    event.preventDefault();

    setEnteredMsgTouched(true);

    if (!enteredMessageIsValid) {
      return;
    }

    // console.log(enteredMessage);
    socket.emit('sendMsg', enteredMessage);

    setEnteredMessage('');
    setEnteredMsgTouched(false);
  };

  console.log(enteredMessage, ' mess');

  const messageInputClasses = msgInputIsInvalid ? 'chat_msg_invalid' : 'chat_msg';

  return (

    <div className='chat_parent'>
      <div className="chat_child">
        <div className="chat_left">

        </div>

        <div className="chat_right">
          {screenSize.dynamicWidth < 600 ? 
            <SwipeableTemporaryDrawer />
          :''}
          <div className="chat_upper">
            {messages.map((i) => (
              <p> {i} </p>
            ))}
          </div>
          <div className="chat_lower">
            <form onSubmit={sendChatDataHandler}>
              <div className='chat_input_msg'>
                <textarea
                  // onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                  className={messageInputClasses}
                  type="text"
                  id='message'
                  placeholder='enter message'
                  onChange={msgInputChangeHandler}
                  onBlur={msgInputBlurHandler}
                  value={enteredMessage} />
              </div>
              <div className="chat_submit_btn">
                <Fab color="secondary">
                  <SendIcon />
                </Fab>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat;