import React, { useState, useContext } from 'react';
import { Box, Button, Heading, TextInput, Paragraph } from 'grommet';
import { Apps } from 'grommet-icons';
import { navigate } from 'gatsby';
import AppBar from '../../common/components/AppBar'
import AppWrapper from '../../common/components/AppWrapper'
import { Context } from '../../common/components/State/Store'
import { GlobalStateContext, GlobalDispatchContext } from '../../common/context/GlobalContextProvider'


export default () => {
    //const [name, setName] = React.useState('');
    //const [message, setMessage] = React.useState('');
    //const [fromName, setFromName] = React.useState('');

    const name = "Carolina";
    const message = "";
    const fromName = "Carolina"
    const hugCounter = 100;
    const hugAmount = 10000;
    const moneyAmount = 100000;

    const callSmsApi = () => console.log("Skriver ett sms");

    const thisHug = `Just denna kram har spridits sig till ${hugCounter} personer.`
    const totalHugs = `Totalt har det skickats ${hugAmount} digitala kramar. Och vi har tillsammans samlat in ${moneyAmount} kr för psykisk hälsa.`

    return (
        <AppWrapper>
            <Box justify='center' style={{ margin: 'auto', marginTop: '60px', textAlign: 'center', padding: "0 20px" }}>
                <h1>- små saker gör stor skillnad -</h1>
                <h2 style={{padding: "0 22px"}}>Du har fått en digital kram</h2>
                <h1>från {name}</h1>
                <p>{message}</p>
                <div style={{padding: "0 18px", marginTop: "80px"}}>
                    <p>{thisHug}</p>
                    <p>{totalHugs}</p>
                </div>

                <Button style={{ maxWidth: '350px', margin: "50px auto 0 auto", fontSize: "15px", padding: "6px 40px", borderRadius: "50px" }} primary label="Skicka kramen vidare" onClick={() => callSmsApi()} />
            </Box>
        </AppWrapper >
    )
} 