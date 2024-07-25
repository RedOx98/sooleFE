"use client";
import Image from "next/image";
import Export from "../../../../public/export.png";
import Add from "../../../../public/add.png";
import Groups from "../../../../public/groups.png";
import Route from "../../../../public/routepic.png";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useEffect, useState } from "react";

export default function SmallBus() {
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
          <h1 className="text-[18px] m-0 text-[#023448]">Buses</h1>
          <div className="flex w-[140px] rounded-lg hover:scale-105 duration-300 flex-row py-1 px-[15px] text-white bg-[#005A86] justify-between items-center">
            <span> Add Bus </span>
            <Image src={Add} className="w-6 h-6" alt="add" />
          </div>
        </div>
        <div className="flex flex-row items-center sm:text-[15px] font-Gilroy-SemiBold text-[#4D4D4D] text-[12px] justify-between p-3 bg-[#F4F4F4] rounded-lg">
          <span className="font-bold text-[15px] font-Gilroy-Bold">KRD 566 FK</span>
          <div className="flex flex-row items-center">
            <Image src={Groups} className="w-6 h-6" alt="groups" />
            <span>29</span>
          </div>
          {isnotTable && (
            <>
              <span className="">Sprinter</span>
            </>
          )}
          <div className="flex flex-row items-center">
            <Image src={Route} className="w-5 h-5" alt="routepic" />
            <span>Ikorodu</span>
          </div>
          {isnotTable && (
            <>
              <span className="">Red</span>
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
      className={`flex justify-center items-center ${color} ${bgColor}  text-[12px]  py-1 rounded-lg px-3 `}
    >
      {statusName}
    </span>
  );
}
