'use client'
import { Bus, BUS_OPERATIONAL_STATUS, NAVIGATION } from "@/lib/definitions";
import { encryptData } from "@/lib/utils/cyptoUtils";
import { prepareBusData } from "@/lib/utils/utils";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SelectBusProp = {
    buses: any[],
    route_secret?: string
}

const SelectBus: React.FC<SelectBusProp> = ({ buses, route_secret }) => {
    const [selectedBusId, setSelectedBusId] = useState<String | undefined>("");

    const router = useRouter();

    function handleBusChange(e: any) {
        const bus = buses.find((bus: Bus) => {
            return bus.busId == e
        })

        const encryptedBusDetails = encryptData(bus);

        router.push(`${NAVIGATION.USER_BOOK}?st=${encryptedBusDetails}`)
    }

    return (
        <>
            <div className="">
                <Select
                    placeholder="Where are you going?"
                    onChange={(e) => { handleBusChange(e) }}
                    style={{ width: "100%", height: 45, border: "1px" }}
                    options={prepareBusData(buses.filter((bus: Bus) => {
                        return bus.operationalStatus != BUS_OPERATIONAL_STATUS.INACTIVE
                    }))}
                />
            </div>
        </>
    )
}

export default SelectBus