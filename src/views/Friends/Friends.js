import React, { useState, useContext } from 'react';
import { Box, Button, Heading, TextInput, Paragraph } from 'grommet';
import { Apps } from 'grommet-icons';
import { navigate } from 'gatsby';
import AppBar from '../../common/components/AppBar'
import AppWrapper from '../../common/components/AppWrapper'
import { Context } from '../../common/components/State/Store'
import { GlobalStateContext, GlobalDispatchContext } from '../../common/context/GlobalContextProvider'


export default () => {


    const callSmsApi = () => console.log("Skriver ett sms");

    return (
        <AppWrapper>
            <Box justify='center' style={{ margin: 'auto', marginTop: '60px', textAlign: 'center', padding: "0 40px" }}>
                <h1>- ta hand om varandra -</h1>
                <h2 style={{padding: "0 22px", marginBottom: "60px"}}>Krama dina vänner helt riskfritt</h2>

                <Friend />
                <Friend />
                <Friend />

                <p>Hälsa från:      Fyll i ditt namn</p>

                <Button style={{ maxWidth: '350px', margin: "50px auto 0 auto", fontSize: "15px", padding: "6px 40px", borderRadius: "50px" }} primary label="Redo att sprida glädje" onClick={() => callSmsApi()} />
            </Box>
        </AppWrapper >
    )
} 


const Friend = () => {
    return (
        <div style={{display: "flex", alignItems: "center"}}>
            <div style={{width: "43px", height: "43px", borderRadius: "100%", background: "#F26E6E", marginRight: "20px"}}></div>
            <p>Fyll i mobilnummer</p>
        </div>
    )
}