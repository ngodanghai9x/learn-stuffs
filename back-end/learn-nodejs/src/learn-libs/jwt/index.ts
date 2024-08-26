import * as jwt from 'jsonwebtoken';

const SECRET_KEY = 'abc';

// Function to generate JWT token
function generateToken(payload: object, expiresIn: string | number): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Example usage
const payload = {
    id: 4,
    username: 'haind',
    createdAt: '2024-08-14T06:33:14.125Z',
    updatedAt: '2024-08-20T05:36:45.409Z',
};

// Generate a token that expires in 60 seconds
const token = generateToken(payload, '60d');

console.log('Generated JWT Token:', token);
