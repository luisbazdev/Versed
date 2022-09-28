import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
    baseURL: process.env.AUTH0_BASE_URL,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    secret: process.env.AUTH0_SECRET,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    authorizationParams: {
        response_type: 'code',
        audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
        scope: process.env.AUTH0_SCOPE
    }
});