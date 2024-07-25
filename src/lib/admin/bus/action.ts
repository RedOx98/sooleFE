'use server'
import { revalidatePath } from "next/cache";
import { BASE_URL, BUS_OPERATIONAL_STATUS, NAVIGATION } from "../../definitions";
import { FetchError } from "../../FetchError";

export type CreateBusRequest = {
  "busNumber": string,
  "operationalStatus": "ACTIVE",
  "busModel": string,
  "busCapacity": number,
  "busColor": string
  "routeName": string
};

export type UpdateBusPayloadRequest = {
  "busNumber"?: string,
  operationalStatus?: BUS_OPERATIONAL_STATUS,
  "busModel"?: string,
  "busCapacity"?: number,
  "busColor"?: string
}

export type UpdateBusParamsRequest = {
  "busId": number
}

export type CreateBusResponse = {
  "statusCode": string,
  "statusMsg": string
}

export type DeleteBusRequest = {
  busId: string
}


export async function CreateBus(token: string, payload: CreateBusRequest): Promise<CreateBusResponse> {

  // Verify credentials && get the user
  const apiUrl = new URL(`${BASE_URL}/bus/add`);

  // Construct the headers, including the Authorization header if the token is provided
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
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

    const result = await response.json() as CreateBusResponse;

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




export async function deleteBus(token: string, requestParams: DeleteBusRequest): Promise<boolean> {
  // Base URL of your API endpoint
  const apiUrl = new URL(BASE_URL + "/bus/delete");

  // Attach bus Id
  apiUrl.searchParams.append("busId", requestParams.busId);

  // Construct the headers, including the Authorization header if the token is provided
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  try {
    const response = await fetch(apiUrl.toString(), {
      method: 'DELETE',
      headers: headers,
    });

    if (!response.ok) {
      throw new FetchError(response.status, `Failed to fetch data: ${response.statusText}`);
    }

    const result = await response.json();

    revalidatePath(NAVIGATION.ADMIN_BSMGT);
    revalidatePath(NAVIGATION.USER);

    return true;

  } catch (error) {
    if (error instanceof FetchError) {
      // Custom error handling logic
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

export async function UpdateBusStatus(token: string, params: UpdateBusParamsRequest, payload: UpdateBusPayloadRequest): Promise<CreateBusResponse> {

  // Verify credentials && get the user
  const apiUrl = new URL(`${BASE_URL}/bus/update`);

  apiUrl.searchParams.append("busId", `${params.busId}`);

  // Construct the headers, including the Authorization header if the token is provided
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };


  try {
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      if (response.status == 400) {
        throw new FetchError(response.status, `Incorrect credentials`);
      }
      throw new FetchError(response.status, `Failed to Login user: ${response.statusText}`);
    }

    const result = await response.json() as CreateBusResponse;

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