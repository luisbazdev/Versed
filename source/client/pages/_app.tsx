import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0'
import AuthContext from '../context/AuthContext'
import UseFor from '../components/UseFor'

import io from "socket.io-client"

const socket = io("http://localhost:3005")

function MyApp({ Component, pageProps }: AppProps) {
  return(
  	<UserProvider>
  		<AuthContext.Provider value={socket}>
			<UseFor>
    			<Component {...pageProps} />  
			</UseFor>
  		</AuthContext.Provider>
  	</UserProvider> 
  )
}

export default MyApp
