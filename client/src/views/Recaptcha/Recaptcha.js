import React from 'react';
import Recaptcha from 'react-recaptcha';

export default (props) => {

    const dataCallback = (response) => {
        
        console.log("dataCallback", response)
        
        const http = new XMLHttpRequest();

        const url = '/checkRecaptcha';
        const params = 'response=' + encodeURIComponent(response);

        http.open("GET", url + '?' + params);
        http.onreadystatechange = function()
            {   
                if(http.readyState === 4 && http.status === 200) {
                    console.log(http);
                    //alert(http.responseText);
                    props.setVerified(true)
                }
            }
        http.send(); 
        //console.log("dataCallback", response)
        //window.location.href = "https://us-central1-digitalakramar.cloudfunctions.net/checkRecaptcha?response=" + encodeURIComponent(response)
    }
    const dataExpiredCallback = () => {
        console.log("dataExpiredCallback")
    }
    
    const callback = () => {
        console.log('Done!!!!');
    };

    return(
        <Recaptcha 
            sitekey="6LdI_OsUAAAAALtivrS9HcR-sd1bcBbjoTv1tlzh" 
            render="explicit"
            verifyCallback={dataCallback} 
            expiredCallback={dataExpiredCallback} 
            onloadCallback={callback}/> 
    )
}




/*{

    /*
    function dataCallback(response) {
        console.log("dataCallback", response)
        window.location.href = "/checkRecaptcha?response=" + encodeURIComponent(response)
    }
    function dataExpiredCallback() {
        console.log("dataExpiredCallback")
    }
    return (
        <html>
            <head>
                <title>Firebase + reCAPTCHA</title>
                <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            </head>
            <body>
                <div class="g-recaptcha"
                data-sitekey="6LdI_OsUAAAAALtivrS9HcR-sd1bcBbjoTv1tlzh"
                data-callback="dataCallback"
                data-expired-callback="dataExpiredCallback"/>
            </body>
        </html>
    )
    
} */
