'use client'
import { NAVIGATION } from '@/lib/definitions';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

const Custom500 = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <h1>Sorry, something went wrong on our end.</h1>
            <p className='mt-2 text-sm text-gray-600'>We have been notified and we will resolve it soon! You can go back <Link href={NAVIGATION.ADMIN} className='text-ecobankBlue'>here</Link></p>
            <img src="/error.svg" alt="Error poage" className='my-5' />
        </div>
    );
};

export default Custom500;