'use server'
import { BASE_URL, ROLES } from "./definitions";
import { FetchError } from "./FetchError";
import { createSession, logout } from "./session";

export type AuthRequest = {
    email: string;
    password: string;
};

export type AuthResponse = {
    token: string;
    authorities: ROLES;
    level: string;
    firstName: string;
    lastName: string;
    username: string;
};

export async function LoginUser(payload: AuthRequest): Promise<AuthResponse> {
    if (payload.email == null || payload.password == null) {
        return Promise.reject({
            status: 400,
            message: 'Bad credentials',
        });
    }

    // Verify credentials && get the user
    const apiUrl = new URL(`${BASE_URL}/auth/token`);

    // Construct the headers
    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            if (response.status == 400) {
                throw new FetchError(response.status, `Incorrect credentials`);
            }
            throw new FetchError(response.status, `Failed to Login user: ${response.statusText}`);
        }

        const user = await response.json() as AuthResponse;

        await createSession(user);

        return user;
    } catch (error) {
        // Custom error handling logic
        if (error instanceof FetchError) {
            return Promise.reject({
                status: error.status,
                message: error.message,
            });
        }
        return Promise.reject({
            status: 500,
            message: 'Internal Server Error',
        });
    }
}

export async function LogoutUser() {
    logout()
}

