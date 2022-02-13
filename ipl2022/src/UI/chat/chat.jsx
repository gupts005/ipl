import React, { useContext, useEffect, useRef, useState } from 'react';
import classes from './chat.module.scss';
import { io } from "socket.io-client";
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import SwipeableTemporaryDrawer from './components/SwipableDrawer';
import { NodeJSURL } from '../../common/http-urls';
import { useFormik } from 'formik';
import AuthContext from '../../API/auth-context';
import * as yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Avatar, LinearProgress } from '@mui/material';
import { userData } from '../../common/LS';
import { stringAvatar } from '../common/components/Utils';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { sendChatData } from '../../API/chat/chat-actions';
import { chatActions } from '../../API/chat/chat-slice';

const validationSchema = yup.object({
  message: yup.string().required('message is required')
});

const tooltip = `Yellow Indicates Changes < 1h,
Red Indicates Changes < 5m ,
Blue Indicates Changes > 1h & < 2h,
Green Indicates Changes > 2h `;

const contestLogColor = {
  1: '#ff5349', // if Bet is newer than 5 minutes
  2: 'yellow', // if Bet is newer than 1 hour
  3: 'skyblue', // if Bet is greater than 1 hour and less than 2 hours
  4: '#6FFF00', // if Bet is greater than 1 hour
};

const contestLogFontColor = {
  1: '#fff', // if Bet is newer than 5 minutes
  2: 'black', // if Bet is newer than 1 hour
  3: 'white', // if Bet is greater than 1 hour and less than 2 hours
  4: 'black', // if Bet is greater than 1 hour
};

const diffMins = (dateSent) => {
  let currentDate = new Date();
  dateSent = new Date(dateSent);
  var diffMs = currentDate.getTime() - dateSent.getTime(); // milliseconds between now & Christmas
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  // console.log('ms'+diffMs,'days'+ diffDays,'hours'+diffHrs,'mins'+diffMins);
  return diffMins;
  // console.log(diffMins);
}

const diffHrs = (dateSent) => {
  let currentDate = new Date();
  dateSent = new Date(dateSent);
  var diffMs = currentDate.getTime() - dateSent.getTime(); // milliseconds between now & Christmas
  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  // console.log(diffHrs);
  return diffHrs;
}

const diffDays = (dateSent) => {
  let currentDate = new Date();
  dateSent = new Date(dateSent);
  var diffMs = currentDate.getTime() - dateSent.getTime(); // milliseconds between now & Christmas
  var diffDays = Math.floor(diffMs / 86400000); // days
  // console.log(diffDays);
  return diffDays;
}

const Chat = (props) => {

  const dispatch = useDispatch();
  const userByIdData = useSelector((state) => state.userById.items);
  const chatData = useSelector((state) => state.chat.items);
  const chatDataChanged = useSelector((state) => state.chat.changed);
  const authCtx = useContext(AuthContext);
  // const socket = io(NodeJSURL, { transports: ['websocket'] });
  const socket = useRef();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.current = io(NodeJSURL, { transports: ['websocket'] });
  }, []);

  useEffect(() => {
    setMessages(chatData);
    socket.current.emit('addUser', userByIdData);
    socket.current.on('getUsers', users => {
      setOnlineUsers(users);
      // console.log(users);
    })
    setTimeout(() => {
      scrollToBottom();
    }, 300);
  }, [chatDataChanged]);

  useEffect(() => {
    socket.current.on('newMsg', (IncomingMsg) => {
      // const tempData = [...messages, IncomingMsg];
      setMessages((prevState) => [...prevState, IncomingMsg]);
      scrollToBottom();
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
      socket.current.emit('sendMsg', chat);
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
              <div className={classes.heading}>
                <h4>Online Users</h4>
              </div>
              {onlineUsers.map((ou, index) => {
                return (
                  <div className={classes.online} key={index}>
                    {ou.userId &&
                      <div className={classes.onlineInner}>
                        <Avatar {...stringAvatar(`${ou.firstName} ${ou.lastName}`)} src={ou.profilePicture} />
                        <span>{ou.firstName} {ou.lastName}</span>
                      </div>}
                  </div>
                )
              })}
            </div>

            <div className={classes.chat_right}>
              {authCtx.screenSize.dynamicWidth < 600 ?
                <SwipeableTemporaryDrawer onlineUsers={onlineUsers} />
                : ''}
              <div className={classes.chat_upper}>
                {messages.map((item, index) => {
                  const arr = item.message.split(' -> ')
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
                          <span style={{
                            background: diffDays(item.chatTimestamp) < 1 &&
                              diffHrs(item.chatTimestamp) < 1 &&
                              diffMins(item.chatTimestamp) < 5 ? contestLogColor[1] : diffDays(item.chatTimestamp) < 1 &&
                                diffHrs(item.chatTimestamp) < 1 ? contestLogColor[2] : diffDays(item.chatTimestamp) < 1 &&
                                  diffHrs(item.chatTimestamp) < 2 ? contestLogColor[3] : contestLogColor[4],

                            color: diffDays(item.chatTimestamp) < 1 &&
                              diffHrs(item.chatTimestamp) < 1 &&
                              diffMins(item.chatTimestamp) < 5 ? contestLogFontColor[1] : diffDays(item.chatTimestamp) < 1 &&
                                diffHrs(item.chatTimestamp) < 1 ? contestLogFontColor[2] : diffDays(item.chatTimestamp) < 1 &&
                                  diffHrs(item.chatTimestamp) < 2 ? contestLogFontColor[3] : contestLogFontColor[4]

                          }}>
                            <span className={classes.spanInner}>
                              {arr[0]}
                            </span>
                            {arr[1]}
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