import { Account, Bus, BusStop } from "../definitions";

export function prepareBusData(data?: Bus[]) {
    if (!data) {
        return [];
    }

    return data.map((option: Bus) => {
        return ({
            label: option.routeName,
            value: option.busId + ""
        })
    })
}

export function prepareBusStopData(data?: BusStop[]) {
    if (!data) {
        return [];
    }
    return data.map((option: BusStop) => {
        return ({
            label: option.busStopName,
            value: option.busStopId + ""
        })
    })
}


export function prepareCaptainData(data?: Account[]) {
    if (!data) {
        return [];
    }
    return data.map((option: Account) => {
        return ({
            label: getUserName(option.firstName, option.lastName),
            value: option.id + ""
        })
    })
}

export function getFormattedDate(date: Date = new Date()) {
    // const date = new Date();

    const time = date.toLocaleTimeString(["en-US"], { hour: "2-digit", minute: "2-digit" });

    const year = date.getFullYear();

    const month = date.toLocaleString('default', { month: "long" });

    const monthShort = date.toLocaleString('default', { month: "short" });

    const day = date.toLocaleString('default', { day: "2-digit" });

    const hours = date.getHours();

    const minutes = date.getMinutes()

    return { year, month, monthShort, day, time, hours, minutes };
}

export function capitalizeFirstLetter(string: string) {
    if (typeof string !== "string" || string.length === 0) {
        return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getUserName(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`
}