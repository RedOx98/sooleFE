"use client";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function SlidingBar({
  sections,
  children,
}: {
  sections: [string, string] | [string];
  children: ReactNode;
}) {
  const [animClass, setanimClass] = useState("move-left");
  const [list, setlist] = useState(sections[0]);
  const router = useRouter();
  const searchparams = useSearchParams();
  const pathname = usePathname();
  useEffect(
    function () {
      const params = new URLSearchParams(searchparams);
      // params.set("listtype", list);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [list, pathname, router, searchparams]
  );
  return (
    <div className="flex flex-row max-sm:flex-col gap-4 w-full items-center max-sm:items-start justify-between">
      <div className="flex flex-col max-sm:mt-2 gap-2">
        <div className="flex flex-row max-sm:text-[14px] max-sm:gap-8 gap-6 font-Gilroy-SemiBold ">
          {sections.length === 2 ? (
            <>
              <span
                className=""
                onClick={() => {
                  setanimClass("move-left");
                  setlist(sections[0]);
                }}
              >
                {sections[0]}
              </span>
              <span
                className=""
                onClick={() => {
                  setanimClass("move-right");
                  setlist(sections[1]);
                }}
              >
                {sections[1]}
              </span>
            </>
          ) : sections.length === 1 ? (
            <span className="">{sections[0]}</span>
          ) : (
            <div></div>
          )}
        </div>
        <div className={`w-[250px] items-center  bg-[#C3C2C2] flex h-[1px]`}>
          {sections.length === 2 && (
            <div
              id="coolnav"
              className={`w-[100px] ${animClass} h-[3px] bg-[#BED600]`}
            ></div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
