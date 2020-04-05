import React from 'react';
import { Grommet, Box } from 'grommet';

//import "./reset.css"
import "./fonts.css"
//import "./button.css"

export default (props) => {
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
                color: "#F26E6E"
            },
            border: {
                color: "#F26E6E"
            },
            color: "white"
        }
    };

    return (
        <Grommet theme={theme} themeMode="dark">
            <Box fill {...props}>
            </Box >
        </Grommet >)
}