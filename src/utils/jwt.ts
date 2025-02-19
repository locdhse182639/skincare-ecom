import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const generateAccessToken = (user: {id: string; role:string}) => {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
}

export const generateRefreshToken = (user: {id: string; role:string}) => {
    return jwt.sign(user, REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
}