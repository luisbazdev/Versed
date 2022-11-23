import Script from 'next/script'
import { Card, Container, Switch, Box } from "@mui/material"
import { useEffect, useState } from 'react'
import axios from 'axios'

const label = { inputProps: { 'aria-label': 'Enable Gateway' } };

export default function PayPal(){
    const [linked, setLinked] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("/api/user")
        .then((response) => {
            setLinked(response.data.data.user.payment_methods)
            setLoading(false)
        })
    }, [])
  if(loading) return <p>Loading paypal</p> 
	return (
        <Card variant="outlined" className="grid grid-cols-[1fr_auto] p-4">
            <Box className="flex flex-col">
                <span className="text-lg font-semibold">PayPal</span>     
                { linked[0] ? <span className="text-gray-600">Your account is connected</span> : <span className="text-gray-600">Your account is not connected</span>}     
            </Box>
            <Switch {...label} disabled defaultChecked />
            { !linked[0] && <span id='lippButton'></span>}

            <Script 
            src="https://www.paypalobjects.com/js/external/api.js"
            onReady={() => {
                paypal.use( ['login'], function (login) {
                  login.render ({
                "appid":"AQ99AORMmyqggJndml-JdtJgQhZr7ZuktCFxJplPeAlfc03FQdtuFO2MDww5HZRuwxDkrhnulNDw7h3U",
                "authend":"sandbox",
                "scopes":"openid profile email https://uri.paypal.com/services/paypalattributes",
                "containerid":"lippButton",
                "responseType":"code",
                "locale":"en-us",
                "buttonType":"LWP",
                "buttonShape":"pill",
                "buttonSize":"lg",
                "fullPage":"true",
                "returnurl":"http://127.0.0.1:3000/api/paypal/callback"
                      });
                });
            }}/> 

        </Card>
	)
}
