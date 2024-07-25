'use client'
import { BookBusResponse } from '@/lib/user/action';
import { getFormattedDate } from '@/lib/utils/utils';
import { QRCodeCanvas } from 'qrcode.react';

type BookingDetailProp = {
    bookRecord: BookBusResponse
}

function getDate(date: Date) {
    const { year, monthShort, day } = getFormattedDate(new Date(date));

    return `${day}, ${monthShort} ${year}`
}

function extractTime(dateString: Date) {
    // Parse the date string to a Date object
    const date = new Date(dateString);
    
    // Extract hours, minutes, and seconds
    let hours: any = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    // Determine AM or PM suffix
    const period = hours >= 12 ? 'PM' : 'AM';
    
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    hours = hours.toString().padStart(2, '0');
    
    // Format the time string
    const timeString = `${hours}:${minutes}:${seconds} ${period}`;
    
    return timeString;
}

const BookingDetail: React.FC<BookingDetailProp> = ({bookRecord}) => {

    // Get this details from the backend
   

    return (
        <>
            <div className='flex flex-col-reverse items-center justify-center sm:flex-row gap-5 gap-x-12 max-w-[500px] mx-auto'>
                {/* Booking details */}
                <div>
                    <QRCodeCanvas value="https://reactjs.org/" size={120} />
                </div>


                {/* Depature details */}
                <div className="w-[85vw] max-w-[500px] mx-auto flex flex-col gap-y-3 font-Gilroy-Regular">
                    <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Time of Departure:</p>
                        <p className="text-gray-500">{getDate(new Date(bookRecord.time_of_departure))}</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Boarding time:</p>
                        <p className="text-gray-500">{extractTime(new Date(bookRecord.createdAt))}</p>
                    </div>
                    {/* <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Date:</p>
                        <p className="text-gray-500">{`${day} ${monthShort}, ${year}`}</p>
                    </div> */}
                    <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Take-off Point:</p>
                        <p className="text-gray-500">{bookRecord.take_off_point}</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Drop off point</p>
                        <p className="text-gray-500">{bookRecord.drop_off_point}</p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p className="font-bold">Route</p>
                        <p className="text-gray-500">{bookRecord.route}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingDetail