import React from 'react';
import { Box, Button } from 'grommet';
import { navigate } from 'gatsby';
import AppWrapper from '../../common/components/AppWrapper';
import People from '../../../static/undraw_people_tax5.svg';

export default () => {
  //const dispatch = useContext(GlobalDispatchContext);
  //const [code, setCode] = useState("");
  //const [hugs, setHugs] = useState(0);
  //const [money, setMoney] = useState(0);
  const hugs = 347056;
  const money = 27680;

  const sendHug = () => {
    navigate('/skicka');
  };
  /*
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
    */
  const peppTalk = 'Ibland är allt man behöver en stor kram';
  const socialDistance =
    'Social distansiering gör att många känner sig ensamma i dessa oroliga tider.';
  const amountOfHugs = `Totalt har det skickats ${hugs} digitala kramar. Och vi har tillsammans samlat in ${money} kr för psykisk hälsa.`;
  const effect = 'Redo att starta en kedjeeffekt?';
  return (
    <AppWrapper>
      <Box
        justify='center'
        style={{
          margin: 'auto',
          marginTop: '60px',
          width: '600px',
          textAlign: 'center',
          padding: '0px 44px'
        }}>
        <h1>- sprid lite glädje -</h1>
        <h2>{peppTalk}</h2>
        <h3>{socialDistance}</h3>
        <h3 style={{ color: '#F26E6E' }}>{amountOfHugs}</h3>
        <div style={{ display: 'flex', marginBottom: '30px' }}>
          <People style={{ width: '50%', height: '50%', margin: 'auto' }} />
        </div>
        <p
          style={{
            fontSize: '15px',
            textTransform: 'uppercase',
            margin: '0 -20px'
          }}>
          {effect}
        </p>
        {false && (
          <Button
            style={{
              maxWidth: '350px',
              margin: 'auto',
              marginTop: '10px',
              fontSize: '15px'
            }}
            primary
            label='Skicka en digital kram'
            onClick={() => sendHug()}
          />
        )}
      </Box>
    </AppWrapper>
  );
};
