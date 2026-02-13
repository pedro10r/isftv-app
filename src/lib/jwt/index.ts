import JWT from "expo-jwt";

const SECRET_KEY = process.env.EXPO_PUBLIC_JWT_SECRET;

export interface JWTPayload {
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export const createToken = (email: string, name: string): string => {
  const payload = {
    email,
    name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  };

  return JWT.encode(payload, SECRET_KEY);
};

export const decodeToken = (token: string): JWTPayload | null => {
  try {
    return JWT.decode(token, SECRET_KEY) as JWTPayload;
  } catch {
    return null;
  }
};

export const verifyToken = (token: string): boolean => {
  try {
    const decoded = JWT.decode(token, SECRET_KEY) as JWTPayload;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  } catch {
    return false;
  }
};
