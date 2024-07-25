'use server'
import { BASE_URL } from "@/lib/definitions";
import { FetchError } from "@/lib/FetchError";

export type FetchStatsResponse = {
    "users": number,
    "verified": number,
    "pending": number,
    "rejected": number,
    "captainorbuses": number
}

// Function to fech a bus
export async function fetchStats(token: string): Promise<FetchStatsResponse> {
    const apiUrl = new URL(`${BASE_URL}/auth/stats`);

    // Construct the headers, including the Authorization header if the token is provided
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
        const response = await fetch(apiUrl.toString(), {
            method: "GET",
            headers: headers,
        });

        if (!response.ok) {
            if (response.status == 401) {
                throw new FetchError(
                    response.status,
                    `Unauthorized: ${response.statusText}`
                );
            }
            throw new FetchError(
                response.status,
                `Failed to fetch bus: ${response.statusText}`
            );
        }

        // Return the parsed JSON response
        return await response.json();
    } catch (error) {
        // Handle custom FetchError
        if (error instanceof FetchError) {
            return Promise.reject({
                status: error.status,
                message: error.message,
            });
        }
        // Handle generic errors
        return Promise.reject({
            status: 500,
            message: "Internal Server Error",
        });
    }
}