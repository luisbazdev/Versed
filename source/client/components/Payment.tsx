import axios from "axios"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useUser } from '@auth0/nextjs-auth0'
import { Container } from "@mui/material";

export default function Payment({service, methods}){
    const { user, isLoading } = useUser()
    if(isLoading) return <p>Loading. . .</p>
	return (
		<Container>
		    <PayPalScriptProvider options={{ "client-id": "AVfSfby3ZxIG0khj-MuamLnLi6FC8i5a4CEUPSBA1YGgbe6v8PAYdnRpbuKpfCVBGarl4iISAMAtKvM7" }}>
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                    currency_code: 'USD',
                                    value: service.price
                                    },
                                    payee: {
                                    	merchant_id: methods[0].account_id
                                    }
                                },
                            ],
                        });
                    }}

                    onApprove={(data, actions) => {
                        return actions?.order?.capture().then( async (details) => {
                            let userId = user?.sub.replace("auth0|", "")
                            // call api
                            axios.post("/api/mentorships", {
                                mentorId: service.mentorId,
                                studentId: userId,
                                serviceId: service.id,
                                price: service.price,
                                mentoringWeeks: service.mentoringWeeks
                            })
                            .then((res) => console.log(res))
                            .catch((err) => console.log(err))              
                        });
                    }}
                />
            </PayPalScriptProvider>
		</Container>
	)
}
