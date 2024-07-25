/* eslint-disable @next/next/no-img-element */
'use client'
import { Session } from "@/lib/definitions"
import { BookBusResponse } from "@/lib/user/action"
import { useState } from "react"

type ViewBookingsProp = {
    session: Session
    bookings: BookBusResponse[]
}

const ViewBookings: React.FC<ViewBookingsProp> = ({ session, bookings }) => {
    const [batchItems, setBatchItems] = useState<Set<number>>(new Set());

    function toggleBatchItem(id: number) {
        if (batchItems.has(id)) {
            setBatchItems((prev) => {
                prev.delete(id);
                return new Set(prev);
            });
            return
        }
        setBatchItems((prev) => new Set(prev).add(id))
    }


    return (
        <div className="flex flex-col justify-center sm:flex-row sm:justify-between mb-[10%] mt-[8vh]" >
            <div className="w-full sm:w-1/2">
                <table className="sm:w-[80%] w-[100%] text-left">
                    <thead id='first-thead'>
                        <tr>
                            <th className='font-Gilroy-Bold text-sm'>Name</th>
                            <th className='text-center font-Gilroy-Bold text-sm'>Seat</th>
                            <th className='text-center font-Gilroy-Bold text-sm'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {bookings.map((item, index) => (
                            <tr key={index} className="border-b cursor-pointer" onClick={() => toggleBatchItem(item.id)}>
                                <td className='pt-4 font-Gilroy-Regular text-sm'>{item.name}</td>
                                <td className="font-Gilroy-SemiBold text-center pt-4 text-sm">{item.seat}</td>
                                <td className='text-center pt-4'>
                                    <div className="flex justify-center">
                                        <img
                                            src={batchItems.has(item.id) ? '/checked.svg' : '/unchecked.svg'}

                                            alt={batchItems.has(item.id) ? 'Checked' : 'Unchecked'}
                                            className="h-5 w-5"
                                        />
                                    </div>
                                </td>
                            </tr>
                        )
                        )} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewBookings