"use client";
import { Table } from "antd";
import TypedInputNumber from "antd/es/input-number";

import useMediaQuery from "@mui/material/useMediaQuery";
import { ReactNode, useEffect, useState } from "react";
import Tags from "../../_components/table-tags";
import { capitalizeFirstLetter } from "@/lib/utils/utils";
import { Account, ACCOUNT_STATUS, Session } from "@/lib/definitions";
import classNames from "classnames";
import { Modal } from "@/components/ModalWrapper";
import ViewStaffModal from "./ViewStaffModal";
type Status = "Pending" | "Active" | "Inactive";

export type StaffTableProps = {
  staffData: Account[];
  session: Session
};

export default function StaffTable({ staffData, session }: StaffTableProps) {
  const [openModal, setOpenModal] = useState<Account | undefined>(undefined);

  return (
    <>
      <div id="largegenerictable" className="flex flex-col gap-2 text-[16px] ">
        <table className="w-full  border-separate border-spacing-y-4 ">
          <thead className="">
            <tr id="header" className="text-[#00567B] pb-20">
              <th className="">S/N</th>
              <th className="font-Gilroy-SemiBold">Name</th>
              <th className="font-Gilroy-SemiBold">Department</th>
              <th className="font-Gilroy-SemiBold">Authority</th>
              <th className="font-Gilroy-SemiBold">Staff ID</th>
              <th className="font-Gilroy-SemiBold">Email Address</th>
              <th className="font-Gilroy-SemiBold">Phone Number</th>
              <th className="font-Gilroy-SemiBold">Status</th>
              <th className="font-Gilroy-SemiBold">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {staffData.map((item, index) => {
              
              return (
                <tr
                  id="staff"
                  key={index}
                  className=" text-center tablerow bg-[#F4F4F4] text-[14px] text-[#4D4D4D]"
                >
                  {" "}
                  <td className="rounded-l-lg whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td
                    className={`px-6 py-4  border-none whitespace-nowrap font-Gilroy-Regular`}
                  >
                    {item.firstName}
                  </td>
                  <td
                    className={`px-6 py-4  border-none whitespace-nowrap font-Gilroy-Regular`}
                  >
                    {item.department}
                  </td>
                  <td
                    className={`px-6 py-4  border-none whitespace-nowrap font-Gilroy-Regular`}
                  >
                    {item.authorities}
                  </td>
                  <td
                    className={`px-6 py-4  border-none whitespace-nowrap font-Gilroy-Regular`}
                  >
                    {item.staff_id}
                  </td>
                  <td
                    className={`px-6 py-4  border-none whitespace-nowrap font-Gilroy-Regular`}
                  >
                    {item.email}
                  </td>
                  <td
                    className={`px-6 py-4 border-none whitespace-nowrap font-Gilroy-Regular`}
                  >
                    {item.telephone}
                  </td>
                  <td className=" flex justify-center items-center font-Gilroy-SemiBold whitespace-nowrap ">
                    <span
                      className={classNames({
                        " text-[#3C8930] bg-[#3C8930]/40 ":
                          item.verified.toUpperCase() ==
                          ACCOUNT_STATUS.ACCEPTED,
                        " text-[#ddce2c] bg-[#ddce2c]/40":
                          item.verified.toUpperCase() == ACCOUNT_STATUS.PENDING,
                        " text-[#B3261E] bg-[#B3261E]/40":
                          item.verified.toUpperCase() ==
                          ACCOUNT_STATUS.REJECTED,
                        " text-[#3C8930] bg-[#3C8930]/40":
                          item.verified.toUpperCase() ==
                          ACCOUNT_STATUS.APPROVED,
                        "flex justify-center items-center max-w-[130px]  py-1 rounded-lg  w-full":
                          true,
                      })}
                    >
                      {item.verified.toUpperCase()}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 rounded-r-lg border-none whitespace-nowrap font-Gilroy-Regular hover:cursor-pointer hover:text-blue-500 hover:text-xl ease-in transition-all `}
                    onClick={() => setOpenModal(item)}
                  >
                    View
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* SHow update staff modal */}

      {openModal && (
        <Modal bare closeModal={() => setOpenModal(undefined)}>
          <ViewStaffModal session={session} account={openModal} closeModal={() => setOpenModal(undefined)} />
        </Modal>
      )}
    </>
  );
}
