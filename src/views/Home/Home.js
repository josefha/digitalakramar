import React, { useState, useContext } from 'react';
import { Box, Button, Heading, TextInput, Paragraph } from 'grommet';
import { Apps } from 'grommet-icons';
import { navigate } from 'gatsby';
import AppBar from '../../common/components/AppBar'
import AppWrapper from '../../common/components/AppWrapper'
import { Context } from '../../common/components/State/Store'
import { GlobalStateContext, GlobalDispatchContext } from '../../common/context/GlobalContextProvider'


export default () => {
    const dispatch = useContext(GlobalDispatchContext);
    const [code, setCode] = useState("");
    const [hugs, setHugs] = useState(0);
    const [money, setMoney] = useState(0);

    const sendHug = () => {
        navigate('/skicka')
    }

    const createRoom = () => {
        dispatch({ type: 'SET_ROOM_ID', payload: makeid(4) })
        navigate('/play')
    }

    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    return (
        <AppWrapper>
            <Box justify='center' style={{ margin: 'auto', marginTop: '100px', width: '600px', textAlign: 'center' }}>
                <h1>Digitala Kramar</h1>
                <h3>Sprid kärlek</h3>
                <h3>{hugs} har skickats</h3>
                <h3>{money} har samlats in</h3>
                <Button style={{ maxWidth: '350px', margin: "auto", marginTop: '30px' }} primary label="Skicka en kram <3" onClick={() => sendHug()} />
            </Box>
        </AppWrapper >
    )
} 