'use server'

import { revalidatePath } from "next/cache";
import {
  BASE_URL,
  BOOKING_TYPE,
  Bus,
  BUS_OPERATIONAL_STATUS,
  PagedResponse,
} from "../definitions";
import { FetchError } from "../FetchError";

export type FetchBusParams = {
  page?: number;
  size?: number;
  query?: string;
  sortDirection?: string;
  operationalStatus?: BUS_OPERATIONAL_STATUS;
};

export type BookBusParams = {
  userId: number;
  busId: number;
  route: string;
  drop_off_point: string;
};
export type BookBusResponse = {
  time_of_departure: Date,
  createdAt: Date,
  take_off_point: string,
  drop_off_point: string,
  status: BOOKING_TYPE,
  route: "string",
  board: string
}

// Function to fech a bus
export async function fetchBus(
  token: string,
  requestParams: FetchBusParams
): Promise<PagedResponse<Bus>> {
  const apiUrl = new URL(`${BASE_URL}/bus/list`);

  // Append query parameters
  Object.entries(requestParams).forEach(([key, value]) => {
    if (value !== undefined) {
      apiUrl.searchParams.append(key, value.toString());
    }
  });

  // Adjust 'page' parameter to be zero-based
  if (requestParams.page !== undefined) {
    apiUrl.searchParams.set("page", (requestParams.page - 1).toString());
  }

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

// Function to book a bus
export async function bookBus(
  token: string,
  requestParams: BookBusParams
): Promise<BookBusResponse> {
  const apiUrl = new URL(`${BASE_URL}/booking/bookseat`);

  // Append query parameters
  Object.entries(requestParams).forEach(([key, value]) => {
    if (value !== undefined) {
      apiUrl.searchParams.append(key, value.toString());
    }
  });

  // Construct the headers, including the Authorization header if the token is provided
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await fetch(apiUrl.toString(), {
      method: "POST",
      headers: headers,
    });

    if (!response.ok) {
      throw new FetchError(
        response.status,
        `Failed to create idea: ${response.statusText}`
      );
    }

    // Return the parsed JSON response
    // return await response.json();

    const busResponse = await response.json()

    return busResponse
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
