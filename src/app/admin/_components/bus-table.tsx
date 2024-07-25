"use client";
import { Table } from "antd";
import TypedInputNumber from "antd/es/input-number";
import useMediaQuery from "@mui/material/useMediaQuery";
import SmallTable from "./small-staff";
import { useEffect, useState } from "react";
import Tags from "./table-tags";
import SmallBus from "./small-bus";
type Status = "Pending" | "Active" | "Inactive";
type Bus = {
  number: string;
  model: string;
  capacity: string;
  color: string;
  route: string;
  status: Status;
  action: string;
};

export default function BusTable() {
  const isXs = useMediaQuery("(min-width:1100px)", { noSsr: true });
  const [isnotTable, setisnotTable] = useState(false);
  useEffect(
    function () {
      setisnotTable(isXs);
    },
    [isXs]
  );
  let Busdata: Bus[] = [
    {
      number: "KRD 567 FK",
      model: "Sprinter",
      capacity: "29",
      color: "blue",
      route: "Ajah",
      status: "Pending",
      action: "",
    },
    {
      number: "KRD 566 FK",
      model: "Sprinter",
      capacity: "29",
      color: "green",
      route: "Ikorodu",
      status: "Pending",
      action: "",
    },
  ];
  return !isnotTable ? (
    <SmallBus />
  ) : (
    <div className="flex flex-col gap-2 text-[16px] ">
      <table className="w-full  border-separate border-spacing-y-4 ">
        <thead className="">
          <tr id="header" className="text-[#00567B] pb-20">
            <th className="">S/N</th>
            <th className="">Bus Number</th>
            <th className="">Model</th>
            <th className="">Capacity</th>
            <th className="">Color</th>
            <th className="">Route</th>
            <th className="">Status</th>
            <th className="">Action</th>
          </tr>
        </thead>
        <tbody className="">
          {Busdata.map((value, index) => {
            const { number, model, capacity, color, route, status, action } =
              value;
            return (
              <tr
                id="staff"
                key={number}
                className=" text-center tablerow bg-[#F4F4F4] text-[14px] text-[#4D4D4D]"
              >
                <td className="rounded-l-lg">{index + 1}</td>
                <td className=" ">{number}</td>
                <td className=" ">{model}</td>
                <td className=" ">{capacity}</td>
                <td className=" ">{color}</td>
                <td className=" ">{route}</td>
                <td className="flex justify-center ">
                  {/* <span className="flex justify-center items-center bg-red-200 py-1 rounded-lg  w-full">
                    {status}
                  </span> */}
                  <Tags statusName={status} />
                </td>
                <td className="rounded-r-lg ">View</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
// function Tags({ statusName }: { statusName: Status }) {
//   let color = statusName === "Active" ? "text-[#3C8930]" : "text-[#B3261E]";
//   let bgColor = statusName === "Active" ? "bg-[#3C893066]" : "bg-[#B3261E4D]";

//   return (
//     <span
//       className={`flex justify-center items-center ${color} ${bgColor}  py-1 rounded-lg  w-full`}
//     >
//       {statusName}
//     </span>
//   );
// }
