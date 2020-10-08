const { google } = require('googleapis');

// Configure Google 
const googleConfig = {
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    redirect: 'http://localhost:3000/auth/google/callback'// this must match your google api settings
};

// Create the google auth object which gives us access to talk to google's apis.
function createConnection() {
    return new google.auth.OAuth2(
      googleConfig.clientId,
      googleConfig.clientSecret,
      googleConfig.redirect
    );
}

// Google Login URL
// default scope we want in our request
const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
];

// Google SignIn page URL
function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
      access_type: 'offline',
      // access type and approval prompt will force a new refresh token to be made each time signs in
      prompt: 'consent', 
      scope: defaultScope
    });
}

// Google URL which will be sent to the client
function urlGoogle() {
    const auth = createConnection(); // this is from previous step
    const url = getConnectionUrl(auth);
    return url;
}

export const googleSignIn = urlGoogle();