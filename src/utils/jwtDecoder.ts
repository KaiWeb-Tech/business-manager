import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
    id: string;
    email: string;
    companyName: string;
    exp: number; // Timestamp d'expiration
}

// Fonction pour décoder le token JWT
export function decodeToken(): JwtPayload | null {
    const token = localStorage.getItem('bmToken');
    if (!token) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(token);

        const currentTime = Math.floor(Date.now() / 1000); // Timestamp actuel en secondes
        if (decoded.exp < currentTime) {
            console.error('Token expired');
            localStorage.removeItem('bmToken'); // Supprimer le token expiré
            return null;
        }

        return decoded;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}