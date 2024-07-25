'use client'
import { Bus, BUS_OPERATIONAL_STATUS } from "@/lib/definitions"
import classNames from "classnames"
import { Session } from "@/lib/definitions"
import { useState } from "react"
import { Modal } from "@/components/ModalWrapper"
import ViewRoutes from "./ViewRoutes"

type RouteTableProps = {
    buses: Bus[]
    session: Session
}

const RouteTable: React.FC<RouteTableProps> = ({ buses, session }) => {

    const [currentBus, setCurrentBus] = useState<Bus | undefined>(undefined);

    return (
        <>
            <div id="largegenerictable" className="flex flex-col gap-2 text-[16px] ">
                <table className="w-full  border-separate border-spacing-y-4 ">
                    <thead className="">
                        <tr id="header" className="text-[#00567B] pb-20">
                            <th className="">S/N</th>
                            <th className="font-Gilroy-SemiBold">
                                Bus Number
                            </th>
                            <th className="font-Gilroy-SemiBold">
                                Model
                            </th>
                            <th className="font-Gilroy-SemiBold">
                                Capacity
                            </th>
                            <th className="font-Gilroy-SemiBold">
                                Route
                            </th>
                            <th className="font-Gilroy-SemiBold">
                                Status
                            </th>
                            <th className="font-Gilroy-SemiBold">
                                Bus stops
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {buses.map((bus, index) => {
                            return (
                                <tr
                                    id="staff"
                                    key={index}
                                    className=" text-center tablerow bg-[#F4F4F4] text-[14px] text-[#4D4D4D]"
                                >
                                    {" "}
                                    <td className="rounded-l-lg whitespace-nowrap">{index + 1}</td>
                                    <td
                                        className={`px-6 py-4 border-none whitespace-nowrap font-Gilroy-Regular`}
                                    >
                                        {bus.busNumber}
                                    </td>
                                    <td
                                        className={`px-6 py-4 border-none whitespace-nowrap font-Gilroy-Regular`}
                                    >
                                        {bus.busModel}
                                    </td>
                                    <td
                                        className={`px-6 py-4 border-none whitespace-nowrap font-Gilroy-Regular`}
                                    >
                                        {bus.busCapacity}
                                    </td>
                                    <td
                                        className={`px-6 py-4 border-none whitespace-nowrap font-Gilroy-Regular`}
                                    >
                                        {bus.routeName}
                                    </td>
                                    <td className=" flex justify-center items-center font-Gilroy-SemiBold whitespace-nowrap ">
                                        <span
                                            className={classNames({
                                                ' text-[#3C8930] bg-[#3C8930]/40': bus.operationalStatus == BUS_OPERATIONAL_STATUS.ACTIVE,
                                                ' text-[#B3261E] bg-[#B3261E]/40': bus.operationalStatus == BUS_OPERATIONAL_STATUS.INACTIVE,
                                                'flex justify-center items-center max-w-[130px]  py-1 rounded-lg  w-full': true
                                            })}
                                        >
                                            {bus.operationalStatus}
                                        </span>
                                    </td>
                                    <td
                                        className={`px-6 py-4 border-none whitespace-nowrap font-Gilroy-Bold cursor-pointer text-ecobankBlue`}
                                        onClick={() => setCurrentBus(bus)}
                                    >
                                        View
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div >

            {/* Confirmation modal */}
            {currentBus && (
                <Modal closeModal={() => setCurrentBus(undefined)} bare >
                    <>
                        {/* <ViewBusModal session={session} bus={currentBus} closeModal={() => setCurrentBus(undefined)} /> */}
                        <ViewRoutes bus={currentBus} session={session} />
                    </>
                </Modal>
            )}
        </>
    )
}

export default RouteTable