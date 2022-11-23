import { initAuth0 } from '@auth0/nextjs-auth0'

export default initAuth0({
    baseURL: process.env.NEXT_PUBLIC_AUTH0_BASE_URL,
    issuerBaseURL: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL,
    secret: process.env.NEXT_PUBLIC_AUTH0_SECRET,
    clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
    authorizationParams: {
        response_type: 'code',
        audience: `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/`,
        scope: 'openid profile email read:current_user create:current_user_metadata update:current_user_metadata'
    }
})

