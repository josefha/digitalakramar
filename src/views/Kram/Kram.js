import React, { useState, useContext } from 'react';
import { Box, Button, Heading, TextInput, Paragraph } from 'grommet';
import { Apps } from 'grommet-icons';
import { navigate } from 'gatsby';
import AppBar from '../../common/components/AppBar'
import AppWrapper from '../../common/components/AppWrapper'
import { Context } from '../../common/components/State/Store'
import { GlobalStateContext, GlobalDispatchContext } from '../../common/context/GlobalContextProvider'


export default () => {
    const [name, setName] = React.useState('Anna');
    const [message, setMessage] = React.useState('');
    const [fromName, setFromName] = React.useState('Josef');


    return (
        <AppWrapper>
            <Box justify='center' style={{ margin: 'auto', marginTop: '100px', textAlign: 'center' }}>
                <h2>{name}</h2>
                <p>Du har fått en digital kram</p>
                <p>{message}</p>
                <h3>{fromName}</h3>
                <p>Denna kram har skickats {hugCounter} gånger</p>
                <p>Totalt kramar: {hugAmount}</p>
                <p> {moneyAmount} gånger</p>

                <Button style={{ maxWidth: '350px', margin: "auto", marginTop: '30px' }} primary label="Skicka" onClick={() => callSmsApi()} />
            </Box>
        </AppWrapper >
    )
} 