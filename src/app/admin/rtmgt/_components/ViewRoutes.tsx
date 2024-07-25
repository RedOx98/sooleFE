'use client'
import { Bus, BusStop, Session } from "@/lib/definitions"
import toast, { Toaster } from 'react-hot-toast'

import DeleteSVG from "@/components/svg/DeleteSVG";
import { CSSProperties, FormEvent, useState } from "react";
import { CreateBusStop, DeleteBusStop } from "@/lib/admin/route/action";
import { FetchError } from "@/lib/FetchError";
import { BeatLoader } from "react-spinners";

type ViewRoutes = {
    bus: Bus,
    session: Session
}

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const ViewRoutes: React.FC<ViewRoutes> = ({ bus: initialBus, session }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [bus, setBus] = useState<Bus>(initialBus)
    const [busStopId, setBusStopId] = useState<string | undefined>(undefined);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!name) {
            return;
        }

        // Set button pending state
        setLoading(true);

        (async function () {
            try {
                const bustop = await CreateBusStop(session.token, { busId: `${bus.busId}`, busStopName: name })

                // return;
                toast.success("Bus stop addeed successfully!");

                // Clear name
                setName("");

                // Copy bus
                const newBus = bus;

                // Add new bus stop
                newBus.busStops.push(bustop);

                // Save bus
                setBus(newBus);
            }

            catch (error) {
                // Clear pending state
                if (error instanceof FetchError) {
                    toast.error(error.message)
                }
            } finally {
                setLoading(false);
            }
        })();
    }

    function handleDelete(id: string) {
        // Set button pending state
        setBusStopId(id);

        (async function () {
            try {
                await DeleteBusStop(session.token, { busStopId: `${id}` })

                toast.success("Bus stop deleted successfully!");

                const currentBus = bus;

                const currentBusStops = currentBus.busStops;

                const updatedBusStops = currentBusStops.filter(item => item.busStopId != id);

                currentBus.busStops = updatedBusStops

                // Save bus
                setBus(currentBus);
            }

            catch (error) {
                // Clear pending state
                if (error instanceof FetchError) {
                    toast.error(error.message)
                }
            } finally {
                setBusStopId(undefined);
            }
        })();
    }


    return (
        <>
            <div className="w-[90vw] max-w-[400px] p-5">
                <h2 className="font-Inter-Regular flex flex-cols gap-y-2 font-medium pb-2 my-2 border-b border-gray-300">{`${bus.routeName || "Ikeja"} routes`}</h2>
                <div className="mt-5">
                    {
                        bus.busStops.map((busStop: BusStop, index: number) => {
                            return (
                                <div key={index} className="bg-gray-300 rounded-md p-3 py-2 my-2 flex justify-between items-center text-black text-sm">
                                    <p>{busStop.busStopName}</p>
                                    {busStopId == busStop.busStopId ? (
                                        <>
                                            <BeatLoader
                                                color={"#B3261E"}
                                                loading={true}
                                                cssOverride={override}
                                                size={4}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                        </>
                                    ) : (
                                        <span onClick={() => {
                                            handleDelete(busStop.busStopId);
                                            alert("Delete abeg naa");
                                        }} className="text-error cursor-pointer"><DeleteSVG /></span>
                                    )}


                                </div>
                            )
                        })
                    }
                    <div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-[5fr,_1fr] gap-x-3 mt-5">
                            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter a bus stop..." className="border border-gray-300 rounded focus:border-ecobankBlue py-1 px-3 outline-none" type="text" />
                            <button type="submit" className="bg-ecobankBlue text-white rounded hover:bg-red-900"> {loading ? (
                                <BeatLoader
                                    color={"#ffffff"}
                                    loading={true}
                                    cssOverride={override}
                                    size={8}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            ) : "Add"}</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Toast messages */}
            <Toaster />
        </>
    )
}

export default ViewRoutes