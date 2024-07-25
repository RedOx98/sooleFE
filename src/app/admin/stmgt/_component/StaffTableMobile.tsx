"use client";

import { Account, ACCOUNT_STATUS, Session } from "@/lib/definitions";
import classNames from "classnames";
import { useState } from "react";
import ViewStaffModal from "./ViewStaffModal";
import { Modal } from "@/components/ModalWrapper";

type StaffTableMobileProps = {
  staffData: Account[];
  session: Session;
};

export default function StaffTableMobile({
  staffData,
  session,
}: StaffTableMobileProps) {
  const [openModal, setOpenModal] = useState<Account | undefined>(undefined);

  return (
    <>
      <div className="divide-y divide-gray-200">
        {staffData.map((user, index) => {
          return (
            <div
            onClick={() => setOpenModal(user)}
              key={index}
              // className="py-2 "
              className={classNames({
                " bbg-gradient-to-br from-white to-[#3C8930]/5 text-green-800":
                  user.verified.toUpperCase() == ACCOUNT_STATUS.ACCEPTED,
                " bbg-gradient-to-br from-white to-[#3C8930]/5 text-green-700":
                  user.verified.toUpperCase() == ACCOUNT_STATUS.APPROVED,
                " bbg-gradient-to-br from-white to-[#3C8930]/5 text-yellow-700":
                  user.verified.toUpperCase() == ACCOUNT_STATUS.PENDING,
                " bbg-gradient-to-br from-white to-[#B3261E]/5 text-error":
                  user.verified.toUpperCase() == ACCOUNT_STATUS.REJECTED,
                "p-2": true,
              })}
            >
              <div className="flex flex-col gap-y-1 cursor-pointer">
                <div className="flex justify-between">
                  <p>
                    <span className="text-gray-500">Name:</span>{" "}
                    <span className="text-sm">{user.firstName}</span>
                  </p>
                  <div className=" flex justify-center items-center font-Gilroy-SemiBold whitespace-nowrap ">
                    <div
                      className={classNames({
                        " text-[#3C8930] bg-[#3C8930]/40":
                          user.verified == ACCOUNT_STATUS.APPROVED,
                        " text-[#3C8930] bg-[#3C8930]/50":
                          user.verified.toUpperCase() ==
                          ACCOUNT_STATUS.ACCEPTED,
                        " text-[#a6b40c] bg-[#d5e80b]/40":
                          user.verified.toUpperCase() == ACCOUNT_STATUS.PENDING,
                        " text-[#B3261E] bg-[#B3261E]/40":
                          user.verified.toUpperCase() ==
                          ACCOUNT_STATUS.REJECTED,
                        "flex justify-center items-center max-w-[130px]  py-1 px-2 rounded w-full text-xs":
                          true,
                      })}
                    >
                      {user.verified}
                    </div>
                  </div>
                </div>
                {/* <p>
                      <span className="text-gray-500">Bus Number:</span>{" "}
                      <span className="text-sm">{bus.busNumber}</span>
                    </p> */}
                <p>
                  <span className="text-gray-500">Staff ID: </span>{" "}
                  <span className="text-sm">{user.staff_id}</span>
                </p>
                <p>
                  <span className="text-gray-500">Department: </span>{" "}
                  <span className="text-sm">{user.department}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show update staff modal  */}
      {openModal && (
        <Modal bare closeModal={() => setOpenModal(undefined)}>
          <ViewStaffModal session={session} account={openModal} closeModal={() => setOpenModal(undefined)} />
        </Modal>
      )}
    </>
  );
}
