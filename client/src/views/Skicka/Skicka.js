import React, { useState } from 'react';
import { Box, Button, TextInput} from 'grommet';
import AppWrapper from '../../common/components/AppWrapper'
import Recaptcha from '../Recaptcha/Recaptcha'

const Friend = (props) => {
    return(
        <>
            <p>I am a friend</p>
            {props.mobilNumber && <p>{props.mobilNumber}</p>}
        </>
    )
}

export default () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [money, setMoney] = useState('');

    //const [yourName, setYourName] = useState('');
    const [isVerified, setVerified] = useState(false);

    const handleOnClick = () => {
        const http = new XMLHttpRequest();

        const url = '/sendSms';
        // TODO: hantera 0 i början av nummret
        const params = 'number=' + "+46" + number;

        http.open("GET", url + '?' + params);
        http.onreadystatechange = function()
            {   
                if(http.readyState === 4 && http.status === 200) {
                    console.log(http);
                }
            }
        http.send(); 
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
                    style={{ marginTop: '25px', marginBottom: '50px' }}
                    placeholder="Summa att skänka"
                    value={money}
                    onChange={event => setMoney(event.target.value)}
                />
                <Recaptcha setVerified={setVerified}/>
                {!isVerified && <p>I am not isVerified</p>}
                {isVerified && <p>I am Verified</p>}
                <Button style={{ maxWidth: '350px', margin: "auto", marginTop: '30px' }} primary label="Skicka" onClick={handleOnClick} />
                <Friend />
            </Box>
        </AppWrapper >
    )
} 