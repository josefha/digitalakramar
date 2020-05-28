import React, { useState, useRef } from 'react';
import { Box, Button, TextInput } from 'grommet';
import axios from 'axios';

import AppWrapper from '../../common/components/AppWrapper';
import Recaptcha from '../Recaptcha/Recaptcha';
import Friend from './Friend/Friend';

import './skicka.scss';

export default () => {
  const [name, setName] = useState('');
  const [money, setMoney] = useState('');

  const [isVerified, setVerified] = useState(false);

  const numberOfFriends = 2;
  const friendsNumberRef = Array(numberOfFriends)
    .fill(0)
    .map((_, i) => useRef(null));
  const friendsComponents = Array(numberOfFriends)
    .fill(0)
    .map((_, i) => <Friend key={i} numberRef={friendsNumberRef[i]} />);

  if (typeof window != 'undefined'){
    window.ref = friendsNumberRef
  }

  const handleOnClick = () => {
    //const number = listOfFriends[0].mobileNumber.slice(1);
    //console.log(listOfFriends[0].mobileNumber);
    const body = {
      senderName: name,
      recipients
    };

    axios
      .request({
        url: '/sendSms',
        method: 'get',
        params: {
          number: '+46' + friendsNumberRef[0].mobileNumber
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  };

  const handleOnClickOld = () => {
    const http = new XMLHttpRequest();

    const url = '/sendSms';
    // TODO: hantera 0 i början av nummret
    const params = 'number=+46' + friendOne.mobileNumber;

    http.open('GET', url + '?' + params);
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200) {
        console.log(http);
      }
    };
    http.send();
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
