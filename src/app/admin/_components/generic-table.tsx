"use client";
import { Table } from "antd";
import TypedInputNumber from "antd/es/input-number";

import useMediaQuery from "@mui/material/useMediaQuery";
import { ReactNode, useEffect, useState } from "react";
import Tags from "./table-tags";
import { capitalizeFirstLetter } from "@/lib/utils/utils";
type Status = "Pending" | "Active" | "Inactive";

export type Data = {
  [key: string]: string;
};

export default function GenericTable({ data, isAction = true, tableHeaders, children, }: {
  data: Data[]; tableHeaders: string[]; isAction?: boolean; children: ReactNode;
}) {

  // Responsiveness
  const isXs = useMediaQuery("(min-width:1100px)", { noSsr: true });
  const [isnotTable, setisnotTable] = useState(false);
  useEffect(
    function () { 
      setisnotTable(isXs);
    },
    [isXs]
  );
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p>No data available</p>;
  }
  const headers = Object.keys(data[0]);
  const lenCol = headers.length;

  return (
    <>
      {children}
      <div id="largegenerictable" className="flex flex-col gap-2 text-[16px] ">
        <table className="w-full  border-separate border-spacing-y-4 ">
          <thead className="">
            <tr id="header" className="text-[#00567B] pb-20">
              <th className="">S/N</th>
              {tableHeaders.map((header) => (
                <th key={header} className="font-Gilroy-SemiBold">
                  {capitalizeFirstLetter(header)}
                </th>
              ))}
              {isAction && <th className="">Action</th>}
            </tr>
          </thead>
          <tbody className="">
            {data.map((item, index) => {
              return (
                <tr
                  id="staff"
                  key={index}
                  className=" text-center tablerow bg-[#F4F4F4] text-[14px] text-[#4D4D4D]"
                >
                  {" "}
                  <td className="rounded-l-lg whitespace-nowrap">{index + 1}</td>
                  {headers.map((header, index) => {
                    return header !== "status" ? (
                      <td
                        key={header}
                        className={`px-6 py-4 ${index + 1 === lenCol && !isAction && "rounded-r-lg"
                          }  border-none whitespace-nowrap font-Gilroy-Regular`}
                      >
                        {item[header]}
                      </td>
                    ) : (
                      <td className=" flex justify-center items-center font-Gilroy-SemiBold whitespace-nowrap ">
                        <Tags statusName={item[header]} />
                      </td>
                    );
                  })}
                  {isAction && (
                    <td className=" rounded-r-lg whitespace-nowrap font-Gilroy-Regular">
                      View
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>{" "}
    </>
  );
}

//   return !isnotTable ? (
//     children
//   ) : (
// <div className="flex flex-col gap-2 text-[16px] ">
//   <table className="w-full  border-separate border-spacing-y-4 ">
//     <thead className="">
//       <tr id="header" className="text-[#00567B] pb-20">
//         <th className="">S/N</th>
//         {headers.map((header) => (
//           <th key={header} className="">
//             {capitalizeFirstLetter(header)}
//           </th>
//         ))}
//         <th className="">Action</th>
//       </tr>
//     </thead>
//     <tbody className="">
//       {data.map((item, index) => (
//         <tr
//           id="staff"
//           key={index}
//           className=" text-center tablerow bg-[#F4F4F4] text-[14px] text-[#4D4D4D]"
//         >
//           {" "}
//           <td className="rounded-l-lg">{index + 1}</td>
//           {headers.map((header) => {
//             return header !== "status" ? (
//               <td key={header} className="px-6 py-4 whitespace-nowrap">
//                 {item[header]}
//               </td>
//             ) : (
//               <td className=" ">
//                 <Tags statusName={item[header]} />
//               </td>
//             );
//           })}
//           <td className="rounded-r-lg ">View</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
//   );
