'use server'
import { BASE_URL, BusStop, NAVIGATION } from "@/lib/definitions"
import { FetchError } from "@/lib/FetchError"
import { revalidatePath } from "next/cache";

export type CreateBusStopRequest = {
    busId: string,
    busStopName: string
}

export type DeleteBusStopRequest = {
    busStopId: string
}

export type CreateBusStopResposne = {
    "statusCode": string
    "statusMsg": string
}

export async function CreateBusStop(token: string, payload: CreateBusStopRequest): Promise<BusStop> {

    // Verify credentials && get the user
    const apiUrl = new URL(`${BASE_URL}/bstp/add`);

    // Attach bus Id
    apiUrl.searchParams.append("busId", payload.busId);


    // Construct the headers, including the Authorization header if the token is provided
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ "busStopName": payload.busStopName }),
        });

        if (!response.ok) {
            if (response.status === 400) {
                throw new FetchError(response.status, response.statusText);
            }
            throw new FetchError(response.status, `Failed to create bus stop: ${response.statusText}`);
        }

        const result = await response.json();

        revalidatePath(NAVIGATION.ADMIN_BSMGT);
        revalidatePath(NAVIGATION.USER);
        return result;
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


export async function DeleteBusStop(token: string, payload: DeleteBusStopRequest): Promise<BusStop> {

    // Verify credentials && get the user
    const apiUrl = new URL(`${BASE_URL}/bstp/delete`);

    // Attach bus Id
    apiUrl.searchParams.append("busStopId", payload.busStopId);


    // Construct the headers, including the Authorization header if the token is provided
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: headers,
        });

        if (!response.ok) {
            if (response.status === 400) {
                throw new FetchError(response.status, response.statusText);
            }
            throw new FetchError(response.status, `Failed to create bus stop: ${response.statusText}`);
        }

        const result = await response.json();

        revalidatePath(NAVIGATION.ADMIN_BSMGT);
        revalidatePath(NAVIGATION.USER);
        return result;
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