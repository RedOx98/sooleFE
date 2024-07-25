// import { BusStop, Account, Bus, BUS_OPERATIONAL_STATUS } from "../definitions";

import { Account, ACCOUNT_STATUS, Bus, BUS_OPERATIONAL_STATUS, ROLES } from "../definitions";

export const mockAccounts: Account[] = [
    {
        "id": 1,
        "email": "user1@example.com",
        "authorities": ROLES.CAPTAIN,
        "createdAt": new Date("2023-11-19 21:24:08.248272"),
        "level": "Level 5",
        "telephone": "+1234567891",
        "firstName": "FirstName1",
        "lastName": "LastName1",
        "username": "username1",
        "verified": ACCOUNT_STATUS.PENDING,
        "route": "Route 9",
        "department": "Department 1",
        "affiliate": "Affiliate 3",
        "staff_id": "staff_1"
    },
    {
        "id": 2,
        "email": "user2@example.com",
        "authorities": ROLES.CAPTAIN,
        "createdAt": new Date("2023-12-11 21:24:08.248287"),
        "level": "Level 1",
        "telephone": "+1234567892",
        "firstName": "FirstName2",
        "lastName": "LastName2",
        "username": "username2",
        "verified": ACCOUNT_STATUS.ACCEPTED,
        "route": "Route 7",
        "department": "Department 1",
        "affiliate": "Affiliate 3",
        "staff_id": "staff_2"
    },
    {
        "id": 3,
        "email": "user3@example.com",
        "authorities": ROLES.CAPTAIN,
        "createdAt": new Date("2024-02-06 21:24:08.248295"),
        "level": "Level 5",
        "telephone": "+1234567893",
        "firstName": "FirstName3",
        "lastName": "LastName3",
        "username": "username3",
        "verified": ACCOUNT_STATUS.PENDING,
        "route": "Route 10",
        "department": "Department 1",
        "affiliate": "Affiliate 3",
        "staff_id": "staff_3"
    }
]

export const mockBuses: Bus[] = [
    {
        "busId": 1,
        "busNumber": "BUS1",
        "operationalStatus": BUS_OPERATIONAL_STATUS.ACTIVE,
        "busModel": "Model B",
        "busCapacity": 21,
        "busColor": "Green",
        "routeName": "Route 9",
        "driverId": 2,
        "captain": {
            "id": 1,
            "email": "user1@example.com",
            "authorities": "USER",
            "createdAt": new Date("2023-11-19 21:24:08.248272"),
            "level": "Level 5",
            "telephone": "+1234567891",
            "firstName": "FirstName1",
            "lastName": "LastName1",
            "username": "username1",
            "verified": ACCOUNT_STATUS.PENDING,
            "route": "Route 9",
            "department": "Department 1",
            "affiliate": "Affiliate 3",
            "staff_id": "staff_1"
        },
        "busStops": [
            {
                "busStopId": "stop_1",
                "busStopName": "Stop 1",
                "createdAt": new Date("2024-01-14 21:24:08.248412"),
                "createdBy": 3,
                "updatedAt": new Date("2023-08-20 21:24:08.248413"),
                "updatedBy": 1
            },
            {
                "busStopId": "stop_2",
                "busStopName": "Stop 2",
                "createdAt": new Date("2024-07-18 21:24:08.248417"),
                "createdBy": 1,
                "updatedAt": new Date("2024-04-30 21:24:08.248418"),
                "updatedBy": 2
            },
            {
                "busStopId": "stop_3",
                "busStopName": "Stop 3",
                "createdAt": new Date("2024-03-27 21:24:08.248423"),
                "createdBy": 1,
                "updatedAt": new Date("2024-07-20 21:24:08.248425"),
                "updatedBy": 2
            }
        ],
        "accounts": [],
        "createdAt": new Date("2024-07-20 21:24:08.248425"),
        "createdBy": 1,
        "updatedAt": new Date("2024-07-20 21:24:08.248425"),
        "updatedBy": 2
    },
    {
        "busId": 2,
        "busNumber": "BUS2",
        "operationalStatus": BUS_OPERATIONAL_STATUS.ACTIVE,
        "busModel": "Model C",
        "busCapacity": 28,
        "busColor": "Black",
        "routeName": "Route 10",
        "driverId": 1,
        "captain": {
            "id": 2,
            "email": "user2@example.com",
            "authorities": "USER",
            "createdAt": new Date("2024-07-20 21:24:08.248425"),
            "level": "Level 1",
            "telephone": "+1234567892",
            "firstName": "FirstName2",
            "lastName": "LastName2",
            "username": "username2",
            "verified": ACCOUNT_STATUS.ACCEPTED,
            "route": "Route 7",
            "department": "Department 1",
            "affiliate": "Affiliate 3",
            "staff_id": "staff_2"
        },
        "busStops": [
            {
                "busStopId": "stop_1",
                "busStopName": "Stop 1",
                "createdAt": new Date("2024-07-20 21:24:08.248425"),
                "createdBy": 2,
                "updatedAt": new Date("2024-07-20 21:24:08.248425"),
                "updatedBy": 3
            },
            {
                "busStopId": "stop_2",
                "busStopName": "Stop 2",
                "createdAt": new Date("2024-07-20 21:24:08.248425"),
                "createdBy": 1,
                "updatedAt": new Date("2024-07-20 21:24:08.248425"),
                "updatedBy": 3
            },
        ],
        "accounts": [],
        "createdAt": new Date("2024-07-20 21:24:08.248425"),
        "createdBy": 1,
        "updatedAt": new Date("2024-07-20 21:24:08.248425"),
        "updatedBy": 2
    }
]
