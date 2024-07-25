/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
'use client'
import { Modal } from "@/components/ModalWrapper"
import AddSVG from "@/components/svg/AddSVG";
import { CreateBus, deleteBus, UpdateBusStatus } from "@/lib/admin/bus/action";
import { Bus, BUS_OPERATIONAL_STATUS, Session } from "@/lib/definitions";
import { FetchError } from "@/lib/FetchError";
import classNames from "classnames";
import { CSSProperties, Dispatch, SetStateAction, useState } from "react"
import { BeatLoader } from "react-spinners";
import { useImmer } from "use-immer";
import { ConfirmationModal } from "@/components";

type ViewBusModalType = {
    bus: Bus
    session: Session;
    closeModal: () => void
}

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

type BusState = {
    number: string;
    model: string;
    capacity: number;
    color: string;
    route: string;
}

type ActionType = 'delete' | 'deactivate'

let actionToExecute: () => void = () => { return }

export const ViewBusModal: React.FC<ViewBusModalType> = ({ session, bus, closeModal }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false);
    const [actionType, setActionType] = useState<ActionType | null>(null);

    function handleDeleteBus() {
        // Set button pending state
        setLoading(true);

        (async function () {
            try {
                await deleteBus(session.token, { busId: bus.busId.toString() });
                setConfirmationModalOpen(false);
                closeModal();
            }
            catch (error) {
                // Clear pending state
                if (error instanceof FetchError) {
                    setErrorMessage(error.message);
                }
            } finally {
                setLoading(false);
            }

        })();
    }

    function handleUpdateBusStatus() {
        // Set button pending state
        setLoading(true);

        (async function () {
            try {
                await UpdateBusStatus(session.token, { busId: bus.busId }, {
                    operationalStatus: bus.operationalStatus == BUS_OPERATIONAL_STATUS.ACTIVE ? BUS_OPERATIONAL_STATUS.INACTIVE : BUS_OPERATIONAL_STATUS.ACTIVE,
                })
                setConfirmationModalOpen(false);
                closeModal();
            }
            catch (error) {
                // Clear pending state
                if (error instanceof FetchError) {
                    setErrorMessage(error.message);
                }
            } finally {
                setLoading(false);
            }

        })();
    }

    return (
        <div>
            <div className="p-7 w-[90vw] max-w-[650px]">
                <h1 className="text-ecobankBlue text-xl font-Gilroy-Medium">View Bus</h1>

                {errorMessage && <p className="text-error font-xs">{errorMessage}</p>}
                {/* Add Bus Form */}

                <form>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-5 ">
                        {/* Bus number */}
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="route" className="text-sm">Bus number</label>
                            <input
                                value={bus.busNumber}
                                disabled
                                placeholder="Bus Number"
                                type="text" required name="route" className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue"
                            />
                        </div>

                        {/* Bus model */}
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="route" className="text-sm">Model</label>
                            <input
                                required
                                value={bus.busModel}
                                disabled
                                placeholder="Bus Model"
                                type="text" name="route" className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue"
                            />
                        </div>

                        {/* Bus capacity */}
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="route" className="text-sm">Capacity</label>
                            <input
                                required
                                value={bus.busCapacity}
                                disabled
                                placeholder="Bus Capacity"
                                type="text" name="route" className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue" />
                        </div>

                        {/* Bus color */}
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="route" className="text-sm">Color</label>
                            <input
                                required
                                value={bus.busColor}
                                disabled
                                placeholder="Bus Color"
                                type="text" name="route" className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue" />
                        </div>

                        {/* Bus route */}
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="route" className="text-sm">Route</label>
                            <input
                                required
                                value={bus.routeName}
                                disabled
                                placeholder="Bus Route"
                                type="text" name="route" className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue" />
                        </div>
                    </div>

                    <div className="w-full flex justify-center items-center mt-9">
                        {
                            loading ? (
                                <BeatLoader
                                    color={"#0282ad"}
                                    loading={true}
                                    cssOverride={override}
                                    size={20}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            ) : (
                                <div className="flex gap-x-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setActionType('deactivate')
                                            actionToExecute = () => handleUpdateBusStatus();
                                            setConfirmationModalOpen(true);
                                        }}
                                        className={classNames({
                                            'rounded px-[2rem] py-3 text-sm focus:outline-none mt-5 cursor-pointer': true,
                                            'border border-error text-red-600': bus.operationalStatus == BUS_OPERATIONAL_STATUS.ACTIVE,
                                            'border border-green-800 text-green-800': bus.operationalStatus == BUS_OPERATIONAL_STATUS.INACTIVE
                                        })}>
                                        {bus.operationalStatus == BUS_OPERATIONAL_STATUS.ACTIVE ? "Deactivate" : "Activate"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setActionType('delete')
                                            actionToExecute = () => handleDeleteBus();
                                            setConfirmationModalOpen(true);

                                        }}
                                        className={classNames({
                                            'rounded px-[2rem] py-3 text-sm text-white bg-error focus:outline-none mt-5 cursor-pointer': true
                                        })}>Delete
                                    </button>
                                    <div className="hidden lg:block">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                closeModal()
                                            }}
                                            className={classNames({
                                                'rounded px-[3rem] py-3 text-sm text-white bg-darkBlue focus:outline-none mt-5 cursor-pointer': true
                                            })}>Cancel
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </form>

            </div>

            {/* Confirmation modal */}
            {isConfirmationModalOpen && actionType && (
                <Modal closeModal={() => setConfirmationModalOpen(false)} bare >
                    <ConfirmationModal title={actionType == 'delete' ? "Delete bus" : `${bus.operationalStatus == BUS_OPERATIONAL_STATUS.ACTIVE ? "Deactivate" : "Activate"} bus`} desc="Are you sure"
                        next={() => {
                            // Close modal
                            setConfirmationModalOpen(false);
                            actionToExecute();
                        }}

                        svg={actionType == 'delete' ? "/DeleteBus.svg" : "/RemoveBus.svg"}

                        nextButtonText={actionType == 'delete' ? "Delete bus" : `${bus.operationalStatus == BUS_OPERATIONAL_STATUS.ACTIVE ? "Deactivate" : "Activate"}`}

                        reverse={bus.operationalStatus == BUS_OPERATIONAL_STATUS.ACTIVE}

                        cancel={() => setConfirmationModalOpen(false)}
                    />
                </Modal>
            )
            }
        </div>
    )
}

export default ViewBusModal;
