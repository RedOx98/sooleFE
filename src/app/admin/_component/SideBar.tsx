/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { NAVIGATION } from '@/lib/definitions';

const navigation = [
    { name: 'Dashboard', href: `${NAVIGATION.ADMIN}`, icon: '/dashboard.svg' },
    { name: 'Staff Management', href: `${NAVIGATION.ADMIN_STMGT}`, icon: '/staff-management.svg' },
    { name: 'Check-In Management', href: `${NAVIGATION.ADMIN_CPMGT}`, icon: '/check-in-management.svg' },
    { name: 'Route Management', href: `${NAVIGATION.ADMIN_RTMGT}`, icon: '/route-management.svg' },
    { name: 'Bus Management', href: `${NAVIGATION.ADMIN_BSMGT}`, icon: '/bus-management.svg' },
    { name: 'Report', href: `${NAVIGATION.ADMIN_REPORT}`, icon: '/report.svg' },
    { name: 'User Management', href: `${NAVIGATION.ADMIN_USMGT}`, icon: '/user-management.svg' },
];

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div onClick={(e) => {
            e.stopPropagation()
            setIsOpen(false);
        }} className='fixed inset-0 z-[9999] border border-orange-600'>
            <div className="lg:hidden fixed inset-x-0 p-4 bg-ecobankTeal border border-red-800 z-[20]">
                <button onClick={toggleSidebar}>
                    <img src='/sandwich.svg' alt="menu icon" />
                </button>
            </div>
          
            {/* {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )} */}
        </div>
    );
};

export default Sidebar;
