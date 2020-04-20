import React from 'react';

export default () => {

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
} 
