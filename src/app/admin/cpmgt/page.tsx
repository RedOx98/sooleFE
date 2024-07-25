import { Account, Bus, ROLES, Session } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { FetchBusParams, fetchBus } from "@/lib/user/action";
import { redirect } from "next/navigation";
import CaptainTable from "./_component/CaptainTable";
import { FetchUserParams, fetchUsers } from "@/lib/admin/staff/action";

export default async function CaptainManagement({ searchParams }: { searchParams: FetchUserParams & FetchBusParams }) {
    const session: Session = await getSession();

    if (!session) {
        redirect("/login");
    }

    const users = await fetchUsers(session.token, {
        page: searchParams.page || 1,
        authority: ROLES.CAPTAIN
    });


    const busResponse = await fetchBus(session.token, {
        page: searchParams.page || 1,
        size: 10,
        operationalStatus: searchParams.operationalStatus,
        query: searchParams.query
    });

    const buses: Bus[] = busResponse.content;


    return (
        <>
            <div className="px-4 lg:px-inlinePage">
                <h1 className="text-[32px] max-sm:text-[25px] font-Gilroy-SemiBold text-[#023448] mt-2">
                    Captain Management
                </h1>

                <div className="flex flex-col gap-y-3 my-3 items-end">
                    {/* <AddBusModal session={session} />
                    <DateSelector placeholder="Search Bus..." /> */}
                </div>

                <div className="hidden lg:block">
                    <CaptainTable buses={buses} session={session} users={users} />
                </div>

                <div className="lg:hidden">
                    {/* <BusTableMV buses={buses} session={session} /> */}
                </div>
            </div>
        </>
    )
}

/**
 * "use client";
import React from "react";
import { Button } from "reactstrap";
import Image from "next/image";
import DateSelector from "../_components/dateselector";
import SlidingBar from "../_components/slidingbar";
import Add from "../../../../public/add.png";
import GenericTable, { Data } from "../_components/generic-table";


export default function CaptainPage() {
    const [modalOpen, setModalOpen] = React.useState(false);
    
    let Captaindata: Data[] = [
        {
            bus_number: "KRD 567 FK",
            captain: "Funmi Dawson",
            captain_number: "09097786465",
            driver: "Tayo Adewole",
            driver_number: "09058897701",
            status: "Active",
        },
    ];
    return (
        <div className="flex flex-col h-full font-[500] trans-range:px-6 px-[57px] max-sm:px-4 max-sm:w-full py-[33px] gap-8 max-sm:gap-4">
            <h1 className="text-[32px] max-sm:text-[25px] text-[#023448]">
                Captain Management
            </h1>
            <div className="flex flex-col">
                <div className="flex flex-row max-sm:flex-col gap-4 w-full items-center max-sm:items-start justify-between">
                    <SlidingBar sections={["Captain List"]}>
                    <Button id="largegenerictable" className="flex w-[164px] font-Gilroy-SemiBold gap-1 rounded-lg max-sm:hidden hover:scale-105 duration-300 flex-row py-2 px-[20px] text-white bg-[#005A86] justify-center items-center"
                        type="button">
                        <span > Add Captain </span>
                        <Image src={Add} className="w-6 h-6" alt="add" />
                    </Button>
                        
                    </SlidingBar>
                </div>

                <div className="flex flex-row items-center"></div>
            </div>
            <DateSelector />
            <GenericTable
                data={Captaindata}
                tableHeaders={[
                    "Bus Number",
                    "Captain",
                    "Phone Number",
                    "Driver",
                    "Phone Number",
                    "Status",
                ]} children={undefined}            >
            </GenericTable>{" "}

           
        </div>
    );
}
 * 
 * 
 */