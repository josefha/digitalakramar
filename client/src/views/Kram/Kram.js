import React, { useState, useEffect, useContext } from 'react';
import { Box, Button} from 'grommet';
import AppWrapper from '../../common/components/AppWrapper'
import { FirebaseContext } from "gatsby-plugin-firebase"

export default () => {
    const DB_HUGS_COUNTER = 'hug_counter'
    const firebase = useContext(FirebaseContext)

    const [name, setName] = useState('Carolina');
    //const [fromName, setFromName] = useState('Carolina');

    const [hugCounter, setHugCounter] = useState(100);

    const hugAmount = 10000;
    const moneyAmount = 100000;

    //setName('Carolina')

    useEffect(() => {
        if (!firebase) {
            return
        }
        ListenOnDbValue(DB_HUGS_COUNTER)
    }, [firebase])


    const ListenOnDbValue = (name) => {
        var inboxRef = firebase.database().ref(name);
        inboxRef.on('value', function (snapshot) {
            setHugCounter(snapshot.val());
        });
    }
/*
    const updateDbValue = (name) => {
        var inboxRef = firebase.database().ref(name);

        //let key = firebase.database().ref().child(name).push().key;

        let data = 0
        let updates = {};
        updates['/hub_counter/'] = data;

        firebase.database().ref().update(updates);
    }
*/
    const callSmsApi = () => console.log("Skriver ett sms");

    const thisHug = `Just denna kram har spridits sig till ${hugCounter} personer.`
    const totalHugs = `Totalt har det skickats ${hugAmount} digitala kramar. Och vi har tillsammans samlat in ${moneyAmount} kr för psykisk hälsa.`

    return (
        <AppWrapper>
            <Box justify='center' style={{ margin: 'auto', marginTop: '60px', textAlign: 'center', padding: "0 20px" }}>
                <h1>- små saker gör stor skillnad -</h1>
                <h2 style={{ padding: "0 22px" }}>Du har fått en digital kram</h2>
                <h1>från {name}</h1>
                <p></p>
                <div style={{ padding: "0 18px", marginTop: "80px" }}>
                    <p>{thisHug}</p>
                    <p>{totalHugs}</p>
                </div>

                <Button style={{ maxWidth: '350px', margin: "50px auto 0 auto", fontSize: "15px", padding: "6px 40px", borderRadius: "50px" }} primary label="Skicka kramen vidare" onClick={() => callSmsApi()} />
            </Box>
        </AppWrapper >
    )
} 