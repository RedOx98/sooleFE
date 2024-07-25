'use client'
/* eslint-disable @next/next/no-img-element */
import { ReactNode } from "react";
import CloseIconSVG from "./svg/CloseIconSVG";
import { useEffect } from "react";

type ModalProps = {
    closeModal: () => void;
    children: ReactNode;
    bare?: boolean
    info?: boolean
    dark?: boolean
};

export function Modal({ closeModal, children, bare, info, dark }: ModalProps) {
    // Prevent background scroll
    useEffect(() => {
        // Add the class to the body to prevent scrolling
        document.body.classList.add("overflow-y-hidden");

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove("overflow-y-hidden");
        };
    }, []); // 


    return (
        <div
            className={`fixed inset-0 ${dark ? "bg-[#000000ec]" : "bg-[#11101036]"} flex justify-center items-center transition-colors z-[999] rounded`}
            onClick={(e) => {
                e.stopPropagation();
                closeModal();
            }}
        >
            <div className={`relative bg-white border-[1.5px] border-ecobankBlue shadow flex flex-row-reverse rounded-lg`}>
                {/* This  */}
                {(!bare) && (
                    <div className="absolute right-2 top-2">
                        <img src="/cancel.svg" alt="close" className="w-[20px]" />
                    </div>
                )}

                {/* Stop propagation to prevent closing modal */}
                <div
                    className="h-max"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
