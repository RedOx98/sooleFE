'use server'

import { BASE_URL, NAVIGATION } from "@/lib/definitions"
import { FetchError } from "@/lib/FetchError"
import { revalidatePath } from "next/cache"
import { CreateBusResponse } from "../bus/action"

export type UpdateBusRouteDetailsParam = {
    busId: number
}

export type UpdateBusRouteDetailsPayload = {
    "driverId": number | null,
    "captainId": number | null,
    "routeName": string
}

export type UpdateBusRouteDetailsResponse = {
    "statusCode": string,
    "statusMsg": string
}

export async function UpdateBusRouteDetails(token: string, params: UpdateBusRouteDetailsParam, payload: UpdateBusRouteDetailsPayload): Promise<UpdateBusRouteDetailsResponse> {

    // Verify credentials && get the user
    const apiUrl = new URL(`${BASE_URL}/bus/route/update`);

    // Set the params
    apiUrl.searchParams.append("busId", `${params.busId}`);

    // Construct the headers, including the Authorization header if the token is provided
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(payload)
        });


        if (!response.ok) {
            if (response.status == 400) {
                throw new FetchError(response.status, response.statusText);
            }
            throw new FetchError(response.status, `Error performing action: ${response.statusText}`);
        }

        const result = await response.json() as CreateBusResponse;

        revalidatePath(NAVIGATION.ADMIN_CPMGT);

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