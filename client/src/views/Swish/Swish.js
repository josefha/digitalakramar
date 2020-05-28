import React, { useState } from 'react';
import { Box, Button, TextInput } from 'grommet';
import AppWrapper from '../../common/components/AppWrapper';

import '../Swish/swish.scss';

export default () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSwishPayment = () => {
    const amount = 10;
    postPayment(phoneNumber, amount);
  };

  const postPayment = (payerPhoneNumber, amount) => {
    const http = new XMLHttpRequest();

    const url = '/swishPayment';
    const params = 'number=' + payerPhoneNumber;

    http.open('GET', url + '?' + params);
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200) {
        console.log(http);
      }
    };
    http.send();
  };

  const handleFreeHug = () => {
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
      <Box className='swish-container'>
        <h1 className='swish-title'>- ta hand om varandra -</h1>
        <h2>
          MÅNGA KÄNNER SIG ENSAMMA I DESSA OROLIGA TIDER. BIDRA TILL INITIATIV
          FÖR PSYKISK HÄLSA.
        </h2>

        <TextInput
          className='swish-text-input'
          placeholder='Mobile phone number'
          value={phoneNumber}
          onChange={event => setPhoneNumber(event.target.value)}
        />

        <Button
          className='swish-primary-button'
          primary
          label='Swish 10 kr per kram'
          onClick={handleSwishPayment}
        />

        <Button
          className='swish-button'
          label='Skicka gratiskramar'
          onClick={handleFreeHug}
        />
      </Box>
    </AppWrapper>
  );
};
