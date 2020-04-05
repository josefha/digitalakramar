import React, { useState, useContext } from 'react';
import { Box, Button, Heading, TextInput, Paragraph } from 'grommet';
import { Apps } from 'grommet-icons';
import { navigate } from 'gatsby';
import AppBar from '../../common/components/AppBar'
import AppWrapper from '../../common/components/AppWrapper'
import { Context } from '../../common/components/State/Store'
import { GlobalStateContext, GlobalDispatchContext } from '../../common/context/GlobalContextProvider'


export default () => {
    const [name, setName] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [money, setMoney] = React.useState('');
    const [yourName, setYourName] = React.useState('');


    const callSmsApi = () => {
        console.log("sending");
    }

    return (
        <AppWrapper>
            <Box justify='center' style={{ margin: 'auto', marginTop: '100px', textAlign: 'center' }}>
                <h1>Skicka kramar</h1>
                <p>Fyll i namn och telefonnummer</p>
                <TextInput
                    placeholder="Namn"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
                <TextInput
                    style={{ marginTop: '25px' }}
                    placeholder="Telefonnummer"
                    value={number}
                    onChange={event => setNumber(event.target.value)}
                />

                <TextInput
                    style={{ marginTop: '25px' }}
                    placeholder="Summa att skänka"
                    value={money}
                    onChange={event => setMoney(event.target.value)}
                />

                <Button style={{ maxWidth: '350px', margin: "auto", marginTop: '30px' }} primary label="Skicka" onClick={() => callSmsApi()} />
            </Box>
        </AppWrapper >
    )
} 