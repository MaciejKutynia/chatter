import React, { useEffect, useState } from 'react';

import socket from '../api';

import { getDate } from '../getDate';

import { v4 as uuidv4 } from 'uuid';

import { useSelector } from 'react-redux';

const Chat = () => {
  const name = useSelector((state) => state.name);

  const [msg, setMsg] = useState('');

  const [messages, setMessages] = useState([]);

  const sendMsgHandler = (event) => {
    event.preventDefault();
    socket.emit('sendMessage', msg);
    const now = getDate();
    setMessages([...messages, { user: name, msg, date: now }]);
    event.target.parentElement.children[0].value = '';
  };

  const keyUpHandler = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      sendMsgHandler(event);
    }
  };

  useEffect(() => {
    socket.on('botMsg', ({ user, msg }) => {
      const now = getDate();
      setMessages([...messages, { user, msg, date: now }]);
    });

    socket.on('newUser', ({ user, msg }) => {
      const now = getDate();
      setMessages([...messages, { user, msg, date: now }]);
    });

    socket.on('newMessage', ({ user, msg }) => {
      const now = getDate();
      setMessages([...messages, { user, msg, date: now }]);
    });
  }, [messages]);

  return (
    <div>
      <div className='msg-container'>
        {messages.length &&
          messages.map((message) => (
            <div
              className={message.user === name ? 'msg sender' : 'msg'}
              key={uuidv4()}>
              <h2>{message.user}</h2>
              <p>{message.msg}</p>
              <small>{message.date}</small>
            </div>
          ))}
      </div>
      <form id='sendMsg'>
        <textarea
          onChange={(event) => {
            setMsg(event.target.value);
          }}
          onKeyUp={keyUpHandler}></textarea>
        <button type='submit' onClick={sendMsgHandler}>
          Wyślij
        </button>
      </form>
    </div>
  );
};

export default Chat;
