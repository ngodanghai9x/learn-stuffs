// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithCustomToken } from 'firebase/auth';
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithCustomToken } = require('firebase/auth');

const firebaseConfig = {
    apiKey: '***',
    authDomain: 'https://accounts.google.com/o/oauth2/auth',
    projectId: 'mb-dev-dev',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function loginWithCustomToken(customToken) {
    try {
        const userCredential = await signInWithCustomToken(auth, customToken);
        const idToken = await userCredential.user.getIdToken();
        console.log('ID Token:', idToken);
        return idToken;
    } catch (error) {
        console.error('Error signing in:', error);
    }
}

// Gọi hàm đăng nhập với Custom Token
const yourCustomToken =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTczODgxMzg1OCwiZXhwIjoxNzM4ODE3NDU4LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay02OWFzcUBrb3QtbW9iaWxlLWFzZWFuLXRhLWRldi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLTY5YXNxQGtvdC1tb2JpbGUtYXNlYW4tdGEtZGV2LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidWlkIjoiQURNSU5fZ2VtbWIxMTJuZCIsImNsYWltcyI6eyJ1c2VybmFtZSI6ImdlbW1iMTEybmQiLCJhY2NvdW50VHlwZSI6IkFETUlOIiwib25Cb2FyZGluZyI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSIsImRldmljZVRva2VuIjpudWxsLCJkZXZpY2VUeXBlIjpudWxsLCJwdWJsaWNrZXkiOiIqKioiLCJrb3RUQVJvbGUiOiJNQVNURVJfQURNSU4iLCJjb21wYW55SWQiOiIxODAwMDA3MTY0Iiwic2VydmVyIjoiZGV2IiwidWlkIjoiQURNSU5fZ2VtbWIxMTJuZCJ9fQ.Ulw1C2OE6j2CwP57dEtVL8F3AEP5bi1Cs0ANrdgjbKPda_RiSV8BwR4rwUY-Kr38TGQvL9GPvHYN1JGr6K1ZlqgzBmsYWNi3sJYGRWnRKx86_cLLp_cAsJQrOpNTGb4DjWpaqW-vFHsOd8fI6nGiFI02DIsPrP8fBT3MbRyy32gw9atk61-PJX3Ur93yY4FgpnmpFXySfece1R9Wtt6bs2noJlB2TzWlbjHOyloxGn3bbe2yZAFQd2mQ8I657C2Fza5nCbuIygj_VZVpm-3p6UjkVcv9bBuG7PMcEFQaJ6uQDsUbi157VNf8Uv0AeeANWd1cgoInO4P43LMtgDY9Bw';
loginWithCustomToken(yourCustomToken);
