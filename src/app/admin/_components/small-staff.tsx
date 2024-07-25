"use client";
import Image from "next/image";
import Export from "../../../../public/export.png";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useEffect, useState } from "react";

export default function SmallTable() {
  const [isnotTable, setisnotTable] = useState(false);
  const isXs = useMediaQuery("(min-width:710px)", { noSsr: true });

  useEffect(
    function () {
      setisnotTable(isXs);
    },
    [isXs]
  );
  return (
    <>
      <div className="flex smallgenerictable flex-col max-sm:mt-2 gap-2 ">
        <div className="flex flex-row justify-between items-center font-Gilroy-SemiBold">
          <h1 className="text-[18px] m-0 text-[#023448] ">Staff</h1>
          <div className="flex w-[120px] rounded-lg hover:scale-105 duration-300 flex-row py-1 px-[20px] text-white bg-[#005A86] justify-between items-center">
            <span> Export </span>
            <Image src={Export} className="w-4 h-4" alt="export" />
          </div>
        </div>
        <div className="flex flex-row items-center sm:text-[12px] text-[9px] justify-between font-Gilroy-SemiBold p-3 bg-[#F4F4F4] rounded-lg">
          <div className="flex flex-col">
            <span className=" font-Gilroy-ExtraBold">
              Joyce Orimolowo (ENG)
            </span>
            <span className="text-[9px] sm:text-[10px]  ">
              Marketing & Corp Comms
            </span>
          </div>
          <span className="">ENG/FST/067</span>
          {isnotTable && (
            <>
              <span className="">07032496928</span>
              <span className="">mmuokamsiyo@gmail.com</span>
            </>
          )}

          <Tags statusName="Pending" />
        </div>
      </div>
    </>
  );
}
type Status = "Pending" | "Active" | "Inactive";

function Tags({ statusName }: { statusName: Status }) {
  let color = statusName === "Active" ? "text-[#3C8930]" : "text-[#B3261E]";
  let bgColor = statusName === "Active" ? "bg-[#3C893066]" : "bg-[#B3261E4D]";

  return (
    <span
      className={`flex justify-center items-center ${color} ${bgColor}  text-[12px] sm:[14px] py-1 rounded-lg px-3 `}
    >
      {statusName}
    </span>
  );
}
