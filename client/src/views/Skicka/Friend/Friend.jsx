import React, { useState } from 'react';
import { TextInput } from 'grommet';
import HeadIcon from '../../../../static/head-icon.svg';
import CheckMark from '../../../../static/check-mark.svg';

import './friend.scss';

const validateMobileNumber = mobileNumber => {
  var mobileNumberRegularExpression = /^\d{10}$/;
  return mobileNumberRegularExpression.test(mobileNumber);
};

export default () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberValidated, setMobileNumberValidated] = useState(false);

  const handleMobileInput = input => {
    if (validateMobileNumber(input)) {
      setMobileNumber(input);
      setMobileNumberValidated(true);
    } else setMobileNumberValidated(false);
  };

  return (
    <div className='friend-row'>
      <HeadIcon className='friend-icon' />
      <TextInput
        className='friend-text-input'
        placeholder='Telefonnummer'
        value={mobileNumber}
        onChange={event => handleMobileInput(event.target.value)}
      />
      {mobileNumberValidated ? (
        <CheckMark className='friend-check-mark' />
      ) : (
        <div className='friend-check-mark-placeholder' />
      )}
    </div>
  );
};
