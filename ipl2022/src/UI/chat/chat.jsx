import React from 'react';
import './chat.scss';
import socketIOClient from "socket.io-client";
import { EndPoint } from '../common/constants/data';

const Chat = () => {

  const [messages, setMessages] = React.useState([]);

  const socket = socketIOClient(EndPoint, { transports: ['websocket'] });

  React.useEffect(() => {
    socket.on('message', data => {
      let temp = messages;
      temp.push(data.text);
      setMessages([...temp]);
      console.log(temp, ' sdsdsdsds');
    });
  }, [socket]);

  const [enteredMessage, setEnteredMessage] = React.useState('');
  const [enteredMsgTouched, setEnteredMsgTouched] = React.useState(false);

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

  const messageInputClasses = msgInputIsInvalid ? 'msg_invalid' : 'msg';

  return (

    <div className='parent'>
      <div className="child">
        <div className="left">

        </div>

        <div className="right">
          <div className="upper">
            {messages.map((i) => (
              <p> {i} </p>
            ))}
          </div>
          <div className="lower">
            <form onSubmit={sendChatDataHandler}>
              <div className='input_msg'>
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
              <div className="submit_btn">
                <button>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat;