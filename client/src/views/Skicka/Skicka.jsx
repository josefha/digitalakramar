import React, { useState, useRef } from 'react';
import { Box, Button, TextInput } from 'grommet';
import axios from 'axios';
import Querystring from 'querystring';

import AppWrapper from '../../common/components/AppWrapper';
import Recaptcha from '../Recaptcha/Recaptcha';
import Friend from './Friend/Friend';

import './skicka.scss';

export default () => {
  const [name, setName] = useState('');
  const [money, setMoney] = useState('');

  const [isVerified, setVerified] = useState(false);

  const numberOfFriends = 3;
  const friendsNumberRef = Array(numberOfFriends)
    .fill(0)
    .map(_ => useRef(null));
  const friendsComponents = Array(numberOfFriends)
    .fill(0)
    .map((_, i) => <Friend key={i} numberRef={friendsNumberRef[i]} />);

  //window.ref = friendsNumberRef;

  const handleOnClick = () => {
    const friendsNumbers = friendsNumberRef
      .filter(friend => friend.current.validated)
      .map(friend => '+46' + friend.current.mobileNumber.slice(1));

    // Used for testing, REMOVE later
    window.friendNumbers = friendsNumbers;

    const body = {
      senderName: name,
      recievers: friendsNumbers
    };

    axios
      .request({
        url: '/sendSms',
        method: 'POST',
        data: body || {}
      })
      .then(response => {
        console.log('Response:', response);
      })
      .catch(error => console.log('Error:', error));
  };

  return (
    <AppWrapper>
      <Box className='send-hug-container'>
        <h1 className='send-hug-title'>- ta hand om varandra -</h1>
        <h2>Fyll i namn och telefonnummer</h2>

        <div className='send-hug-friends-container'>{friendsComponents}</div>

        <TextInput
          className='send-hug-text-input'
          placeholder='Namn'
          value={name}
          onChange={event => setName(event.target.value)}
        />

        <TextInput
          className='send-hug-text-input'
          placeholder='Summa att skänka'
          value={money}
          onChange={event => setMoney(event.target.value)}
        />

        <Recaptcha setVerified={setVerified} />
        <Button
          className='send-hug-button'
          primary
          label='Redo att sprida glädje'
          onClick={handleOnClick}
          disabled={!isVerified}
        />
      </Box>
    </AppWrapper>
  );
};
