/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
'use client'
import { Modal } from "@/components/ModalWrapper"
import AddSVG from "@/components/svg/AddSVG";
import { CreateBus } from "@/lib/admin/bus/action";
import { BUS_OPERATIONAL_STATUS, Session } from "@/lib/definitions";
import { FetchError } from "@/lib/FetchError";
import classNames from "classnames";
import { CSSProperties, useState } from "react"
import { BeatLoader } from "react-spinners";
import { useImmer } from "use-immer";
import { ConfirmationModal } from "@/components";

type AddBusModalType = {
    session: Session;
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

let actionToExecute: () => void = () => { return }

export const AddBusModal: React.FC<AddBusModalType> = ({ session }) => {
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false);

    const [bus, updateBus] = useImmer<BusState>({
        number: '',
        model: '',
        capacity: 1,
        color: '',
        route: '',
    });

    // Set property
    const setBusProperty = <K extends keyof BusState>(property: K, value: BusState[K]) => {
        updateBus((draft: any) => {
            draft[property] = value;
        });
    };

    // Submit Add bus
    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (!bus.number || !bus.model || !bus.capacity || !bus.color || !bus.route) {
            setErrorMessage("Missing fields");
        }

        // Clear error messages
        setErrorMessage("");

        actionToExecute = () => createBus();

        setConfirmationModalOpen(true);
    }

    function createBus() {
        // Set button pending state
        setLoading(true);

        (async function () {
            try {
                await CreateBus(session.token, { routeName: bus.route, busNumber: bus.number, busCapacity: bus.capacity, busColor: bus.color, busModel: bus.model, operationalStatus: BUS_OPERATIONAL_STATUS.ACTIVE })
                setShowAddModal(false);
                setConfirmationModalOpen(false);
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

            <button onClick={() => setShowAddModal(true)} id="largegenerictable"
                className="flex cursor-pointer font-Gilroy-SemiBold w-[164px] gap-1 rounded-lg hover:scale-105 duration-300 flex-row py-2 px-[20px] text-white bg-[#005A86] justify-center items-center">
                Add bus
                <AddSVG width={28} height={28} />
            </button>


            {showAddModal && (
                <Modal bare closeModal={() => setShowAddModal(false)}>
                    <div className="p-7">
                        <h1 className="text-ecobankBlue text-xl font-Gilroy-Medium">Add Bus</h1>

                        {errorMessage && <p className="text-error font-xs">{errorMessage}</p>}
                        {/* Add Bus Form */}
                        <form onSubmit={(e) => handleSubmit(e)} >
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-5">

                                {/* Bus number */}
                                <div className="flex flex-col gap-y-1">
                                    <label htmlFor="route" className="text-sm">Bus number</label>
                                    <input
                                        value={bus.number || ''}
                                        onChange={(e) => setBusProperty('number', e.target.value)}
                                        placeholder="Bus Number"
                                        type="text" required name="route" className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue"
                                    />
                                </div>

                                {/* Bus model */}
                                <div className="flex flex-col gap-y-1">
                                    <label htmlFor="route" className="text-sm">Model</label>
                                    <input
                                        required
                                        value={bus.model || ''}
                                        onChange={(e) => setBusProperty('model', e.target.value)}
                                        placeholder="Bus Model"
                                        type="text" name="route" className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue"
                                    />
                                </div>

                                {/* Bus capacity */}
                                <div className="flex flex-col gap-y-1">
                                    <label htmlFor="route" className="text-sm">Capacity</label>
                                    <input
                                        required
                                        value={bus.capacity || ''}
                                        onChange={(e) => setBusProperty('capacity', e.target.value ? parseInt(e.target.value) : 1)}
                                        placeholder="Bus Capacity"
                                        type="text" name="route" className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue" />
                                </div>

                                {/* Bus color */}
                                <div className="flex flex-col gap-y-1">
                                    <label htmlFor="route" className="text-sm">Color</label>
                                    <input
                                        required
                                        value={bus.color || ''}
                                        onChange={(e) => setBusProperty('color', e.target.value)}
                                        placeholder="Bus Color"
                                        type="text" name="route" className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue" />
                                </div>

                                {/* Bus route */}
                                <div className="flex flex-col gap-y-1">
                                    <label htmlFor="route" className="text-sm">Route</label>
                                    <input
                                        required
                                        value={bus.route || ''}
                                        onChange={(e) => setBusProperty('route', e.target.value)}
                                        placeholder="Bus Route"
                                        type="text" name="route" className="text-xs rounded p-2 py-2 w-[15vw] min-w-[280px] outline-none border border-gray-400 focus:border-ecobankBlue" />
                                </div>
                            </div>

                            <div className="w-full flex justify-center mt-9">
                                <button
                                    type="submit"
                                    className={classNames({
                                        'rounded px-32 py-3 text-sm text-white bg-darkBlue focus:outline-none mt-5 cursor-pointer': true
                                    })}>
                                    {loading ? (
                                        <BeatLoader
                                            color={"#0282ad"}
                                            loading={true}
                                            cssOverride={override}
                                            size={10}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    ) : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}

            {/* Confirmation modal */}
            {isConfirmationModalOpen && (
                <Modal closeModal={() => setConfirmationModalOpen(false)} bare >
                    <ConfirmationModal title="Add bus" desc="Are you sure"
                        next={() => {
                            // Close modal
                            setConfirmationModalOpen(false);
                            createBus();
                        }}

                        svg={"/RemoveBus.svg"}

                        nextButtonText="Add"

                        cancel={() => setConfirmationModalOpen(false)}
                    />
                </Modal>
            )}
        </div>
    )
}

export default AddBusModal;

function delay(arg0: number) {
    throw new Error("Function not implemented.");
}
