import React, { useState } from 'react';
import { Box, Button, TextInput } from 'grommet';
import AppWrapper from '../../common/components/AppWrapper';
import Recaptcha from '../Recaptcha/Recaptcha';

import Friend from './Friend/Friend';

import './skicka.scss';

export default () => {
  const [name, setName] = useState('');
  const [money, setMoney] = useState('');

  const [isVerified, setVerified] = useState(false);

  const handleOnClick = () => {
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

  const friendOne = <Friend />;
  const friendTwo = <Friend />;
  const friendThree = <Friend />;

  return (
    <AppWrapper>
      <Box className='send-hug-container'>
        <h1 className='send-hug-title'>- ta hand om varandra -</h1>
        <h2>Fyll i namn och telefonnummer</h2>

        <div className='send-hug-friends-container'>
          {friendOne}
          {friendTwo}
          {friendThree}
        </div>

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
