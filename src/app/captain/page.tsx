import { fetchBookings } from "@/lib/captain/action"
import { Session } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function CaptainPage() {

    const session: Session = await getSession();

    if (!session) {
        redirect("/login");
    }

    let currentBookings;

    try {
        currentBookings = await fetchBookings(session.token, { busId: 1 });
    } catch (error) {
        return (
            <>
                <p>An error has occurred!</p>
            </>
        )
    }


    return (
        <div className="px-4 lg:px-inlinePage">

            {/* Hero Section */}
            <div className="flex flex-col max-w-[100vh] w-[90%] mx-auto mb-[10vh]">
                <div className="mt-[3vh]">
                    <h1 className="text-lg text-gray-600 font-Gilroy-Bold text-center mb-[5%]">
                        {`Hello ${session.firstName} ${session.lastName}`}
                    </h1>
                    <div className="flex flex-col  sm:flex-row items-center sm:justify-center whitespace-nowrap ">
                        <div className="flex sm:self-end ">
                            <div className="px-6 py-4 space-y-3 self-end">
                                <div className="flex flex-row space-x-9 justify-between">
                                    <h3 className="text-sm text-gray-500 font-Gilroy-UltraLight">Route:</h3>
                                    <p className="text-gray-600 text-sm font-Gilroy-SemiBold">{ }</p>
                                </div>
                                <div className="flex flex-row space-x-9 justify-between">
                                    <h3 className="text-sm  text-gray-500 font-Gilroy-UltraLight">Bus Driver:</h3>
                                    <p className="text-gray-600 text-sm font-Gilroy-SemiBold">Tayo Adewale</p>
                                </div>
                                <div className="flex flex-row space-x-9 justify-between">
                                    <h3 className="text-sm text-gray-500 font-Gilroy-UltraLight">Phone Number:</h3>
                                    <p className="text-gray-600 text-sm font-Gilroy-SemiBold">0803&nbsp;327&nbsp;7625</p>
                                </div>

                            </div>
                        </div>
                        <div>
                            <Image src="/busBlue.svg" width={200} height={200} alt="bus image" />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}