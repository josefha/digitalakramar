import React from 'react';
import { Grommet, Box } from 'grommet';

import './fonts.scss';

export default props => {
  let theme = {
    global: {
      font: {
        family: 'Roboto',
        weight: '300',
        align: 'center'
      }
    },
    button: {
      primary: {
        color: '#F26E6E'
      },
      border: {
        color: '#F26E6E'
      },
      color: 'white'
    },
    textInput: {
      extend: () => `
        background: #F1F1F1;
      `
    }
  };
  //themeMode='dark'
  return (
    <Grommet theme={theme}>
      <Box fill {...props}></Box>
    </Grommet>
  );
};
