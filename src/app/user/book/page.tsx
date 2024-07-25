import { Bus, Session } from "@/lib/definitions";
import { decryptData } from "@/lib/utils/cyptoUtils";
import { getFormattedDate } from "@/lib/utils/utils";
import { redirect } from 'next/navigation'
import { BookSeat } from "./_component";
import { getSession } from "@/lib/session";
const BookPage = async ({ searchParams }: { searchParams: { st: string } }) => {

    // Get user session
    const session: Session = await getSession();

    if (!session) {
        redirect("/login");
    }

    let busState;
    try {
        busState = decryptData(searchParams?.st || "") as Bus;
    } catch (error: any) {
        redirect("/user")
    }

    const { year, monthShort, day } = getFormattedDate(new Date());

    return (
        <>
            <div className="w-[95vw] mx-auto max-w-[928px] pb-[3rem]">
                <h1 className="text-center text-lg sm:text-xl text-ecobankBlue font-medium">Book your preferred seat</h1>

                {/* Depature details */}
                <div className="w-[85vw] max-w-[500px] mx-auto flex flex-col gap-y-3 mt-7 font-Gilroy-Regular">
                    <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Time of Departure:</p>
                        <p className="text-gray-500">6:00pm</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Boarding time:</p>
                        <p className="text-gray-500">5:40pm</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Date:</p>
                        <p className="text-gray-500">{`${day} ${monthShort}, ${year}`}</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Take-off Point:</p>
                        <p className="text-gray-500">EPAC</p>
                    </div>

                    {/* Select Location */}
                    <div className="mt-5">
                        <BookSeat bus={busState} session={session} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookPage