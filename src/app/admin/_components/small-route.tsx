"use client";
import Image from "next/image";
import Export from "../../../../public/export.png";
import Driver from "../../../../public/driverpic.png";
import Add from "../../../../public/add.png";
import Captain from "../../../../public/captain.png";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useEffect, useState } from "react";

export default function SmallRoute() {
  const isXs = useMediaQuery("(min-width:710px)", { noSsr: true });
  const [isnotTable, setisnotTable] = useState(false);
  useEffect(
    function () {
      setisnotTable(isXs);
    },
    [isXs]
  );
  return (
    <>
      <div className="flex flex-col smallgenerictable max-sm:mt-2 gap-2 ">
        <div className="flex flex-row justify-between items-center font-Gilroy-SemiBold">
          <h1 className="text-[18px] m-0 text-[#023448]">Routes</h1>
          <div className="flex w-[140px] rounded-lg hover:scale-105 duration-300 flex-row py-1 px-[15px] text-white  bg-[#005A86] justify-between items-center">
            <span> Add Route </span>
            <Image src={Add} className="w-6 h-6" alt="add" />
          </div>
        </div>
        <div className="flex flex-row items-center sm:text-[13px] text-[9px] font-Gilroy-SemiBold justify-between p-3 bg-[#F4F4F4] rounded-lg">
          <span className="font-bold text-[15px] font-Gilroy-ExtraBold">Ajah</span>
          <div className="flex flex-row items-center">
            <Image src={Driver} className="w-5 h-5" alt="driver" />
            <span>Tayo Adewole</span>
          </div>
          {isnotTable && (
            <>
              <span className="">09088334456</span>
            </>
          )}
          <div className="flex flex-row items-center">
            <Image src={Captain} className="w-5 h-5" alt="driver" />
            <span>Funmi Dowson</span>
          </div>
          {isnotTable && (
            <>
              <span className="">07032496928</span>
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
      className={`flex justify-center items-center ${color} ${bgColor}  text-[10px] sm:[14px] py-1 rounded-lg px-3 `}
    >
      {statusName}
    </span>
  );
}
