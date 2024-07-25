'use client'

import { Account } from "@/lib/definitions";
import { prepareCaptainData } from "@/lib/utils/utils";
import { Select } from "antd";
import { Dispatch, SetStateAction } from "react";

type SelectCaptainProp = {
    captains: Account[]
    setCaptain: Dispatch<SetStateAction<Account | null>>
}

export default function SelectCaptain({ captains, setCaptain }: SelectCaptainProp) {

    function handleChange(captainId: number) {
        const selectedCaptain = captains.find((captain: Account) => {
            return captain.id == captainId
        })

        if (selectedCaptain) {
            setCaptain(selectedCaptain);
        }
    }

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <div className="min-w-[200px] w-full">
                <Select
                    style={{ width: "100%", height: "40px" }}
                    onChange={(e) => handleChange(e)}
                    showSearch
                    placeholder="Select a captain"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={prepareCaptainData(captains)}
                />
            </div>
        </div>
    );
}