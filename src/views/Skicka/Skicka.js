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

    const callSmsApi = () => {
        console.log("sending");
    }

    return (
        <AppWrapper>
            <Box style={{ margin: '20px' }} direction='column' flex overflow={{ horizontal: 'hidden' }}>
                <Box justify='center'>
                    <h1>Skicka en kram</h1>
                    <Button style={{ maxWidth: '350px', margin: "5px" }} primary label="Skicka" onClick={() => callSmsApi()} />
                </Box>
            </Box>
        </AppWrapper >
    )
} 