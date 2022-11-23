import { Alert, Switch, Container, Box } from "@mui/material"
import PayPal from './PayPal'

export default function PaymentMethods(){
	return (
		<Box className="w-full h-full">
            <Alert severity="info">
            Students can purchase your services through different payment gateways 
            such as PayPal, provide the information needed and then enable the 
            payment gateway.
            </Alert>
            <Box className="grid grid-cols-[400px] py-4">
                <PayPal/>
            </Box>
		</Box>
	)
}
