import React, { useContext, useEffect, useRef, useState } from 'react';
import classes from './chat.module.scss';
import socketIOClient from "socket.io-client";
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import SwipeableTemporaryDrawer from '../common/components/SwipableDrawer';
import styled from 'styled-components';
import { chatBaseURL, ContestLogBaseURL, NodeJSURL } from '../../common/http-urls';
import { useFormik } from 'formik';
import AuthContext from '../../API/auth-context';
import * as yup from 'yup';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Avatar, LinearProgress } from '@mui/material';
import { Token, userData } from '../../common/LS';
import { stringAvatar } from '../common/components/Utils';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { sendChatData } from '../../API/chat/chat-actions';
import { chatActions } from '../../API/chat/chat-slice';

const validationSchema = yup.object({
  message: yup.string().required('message is required')
});

const Chat = (props) => {

  const dispatch = useDispatch();
  const userByIdData = useSelector((state) => state.userById.items);
  const chatData = useSelector((state) => state.chat.items);
  const chatDataChanged = useSelector((state) => state.chat.changed);
  const authCtx = useContext(AuthContext);
  const socket = socketIOClient(NodeJSURL, { transports: ['websocket'] });
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  // const [logs, setLogs] = useState([]);
  // const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    setMessages(chatData);
    setTimeout(() => {
      scrollToBottom();
    }, 300);
  }, [chatDataChanged]);

  // useEffect(() => {
  //   const tempD = [...messages, ...logs];
  //   setCombinedData(tempD);
  // }, [messages, logs]);

  useEffect(() => {
    socket.once('newMsg', (IncomingMsg) => {
      const tempData = [...messages, IncomingMsg]
      setMessages(tempData);
      scrollToBottom();
      // socket.off("newMsg", IncomingMsg);
      socket.disconnect();
    });
  }, [socket]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
  }

  const formik = useFormik({
    initialValues: {
      message: ''
    },
    validationSchema: validationSchema,
    onSubmit: (selectedFormData, { resetForm }) => {
      // console.log(selectedFormData);
      socket.connect();
      const message = selectedFormData.message;
      const userId = userData.userId;
      const firstName = userByIdData.firstName;
      const lastName = userByIdData.lastName;
      const profilePicture = userByIdData.profilePicture;
      const chatTimestamp = new Date().getTime();
      const publicChatId = Math.max.apply(Math, messages.map(function (o) { return o.publicChatId + 1; }));
      const status = true;
      const chat = { userId, message, firstName, lastName, profilePicture, chatTimestamp, publicChatId, status };
      const kjk = { userId, message };
      // saveMsg(kjk);
      socket.emit('sendMsg', chat);
      dispatch(chatActions.updateChat(chat));
      dispatch(sendChatData(kjk));
      resetForm();
    }
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200)
  }, []);

  return (

    <div className={classes.chat_parent}>
      {loading &&
        <>
          <Box sx={{ width: '100%', marginTop: '70px', position: 'absolute' }}>
            <LinearProgress />
          </Box>
        </>
      }
      <div className={classes.chat_child}>
        {!loading &&
          <>
            <div className={classes.chat_left}>

            </div>

            <div className={classes.chat_right}>
              {authCtx.screenSize.dynamicWidth < 600 ?
                <SwipeableTemporaryDrawer />
                : ''}
              <div className={classes.chat_upper}>
                {messages.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.userId !== userData.userId && !item.contestLogId &&
                        <div className={classes.notUserId}>
                          <Avatar {...stringAvatar(`${item.firstName} ${item.lastName}`)} src={item.profilePicture} />
                          <div className={classes.notUserIdInner}>
                            <span>
                              {item.message}
                            </span>
                            <span className={classes.time}>
                              <span>
                                ~ {item.firstName + ' ' + item.lastName}
                              </span>
                              <span>
                                {moment(item.chatTimestamp).format('MMM Do, h:mm')}
                              </span>
                            </span>
                          </div>
                        </div>
                      }
                      {item.userId === userData.userId && !item.contestLogId &&
                        <div className={classes.isUserId}>
                          <div className={classes.isUserIdInner}>
                            <span className={classes.isUser1span}>
                              {item.message}
                            </span>
                            <span className={classes.time}>
                              <span>
                                {moment(item.chatTimestamp).format('MMM Do, h:mm')}
                              </span>
                              <span>
                                {item.firstName + ' ' + item.lastName} ~
                              </span>
                            </span>
                          </div>
                          <Avatar {...stringAvatar(`${item.firstName} ${item.lastName}`)} src={item.profilePicture} />
                        </div>
                      }
                      {item.contestLogId &&
                        <div className={classes.log}>
                          <span style={{ background: 'silver' }}>
                            {item.message}
                          </span>
                        </div>
                      }
                      <div ref={messagesEndRef} />
                    </div>
                  );
                })}
              </div>
              <div className={classes.chat_lower}>
                <form onSubmit={formik.handleSubmit}>
                  <div className={classes.chat_input_msg}>
                    <textarea
                      className={classes.chat_msg}
                      type="text"
                      placeholder='enter message'
                      name='message'
                      onChange={formik.handleChange}
                      value={formik.values.message}
                    />
                  </div>
                  <div className={classes.chat_submit_btn}>
                    <Fab color="secondary" type='submit'>
                      <SendIcon />
                    </Fab>
                  </div>
                </form>
              </div>
            </div>
          </>
        }
        {loading &&
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
          >
            <CircularProgress color="secondary" />
          </Box>
        }
      </div>
    </div >
  )
}

export default Chat;