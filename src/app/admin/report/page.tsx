import Image from "next/image";
import SlidingBar from "../_components/slidingbar";
import DateSelector from "../_components/dateselector";
import GenericTable from "../_components/generic-table";
import Export from "../../../../public/export.png";
import SmallReport from "../_components/small-report";

type MyData = {
  params: {};
  searchParams: {
    listtype: string;
  };
};
export default function Report(searchParams: MyData) {
  let tableListType = searchParams.searchParams.listtype;

  let Reportdata =
    tableListType === "Activity Log"
      ? [
        {
          name: "Tayo Adewole",
          department: "Marketing",
          email: "tayo@gmail.com",
          user_activity: "Added Bus",
          date: "22-04-2024",
        },
        {
          name: "Tayo Adewole",
          department: "Marketing",
          email: "tayo@gmail.com",
          user_activity: "Added Bus",
          date: "22-04-2024",
        },
      ]
      : [
        {
          date: "22-04-2024",
          name: "Tayo Adewole",
          staffComment:
            "Lorem ipsum dolor sit amet consectetur. Viverra sagittis ...",
          rating: "3",
        },
        {
          date: "22-04-2024",
          name: "Tayo Adewole",
          staffComment:
            "Lorem ipsum dolor sit amet consectetur. Viverra sagittis ...",
          rating: "3",
        },
      ];

  let tableHeaders =
    tableListType === "Activity Log"
      ? [
        "name",
        "department",
        "email Address",
        "user Activity",
        "Activity Date",
      ]
      : ["date", "name", "staff Comment", "Rating"];
  return (
    <div className="flex flex-col h-full font-[500] trans-range:px-6 px-[57px] max-sm:px-4 max-sm:w-full py-[33px] gap-8 max-sm:gap-4">
      <h1 className="text-[32px] max-sm:text-[25px] font-Gilroy-SemiBold text-[#023448]">
        Report
      </h1>
      <div className="flex flex-col">
        <div className="flex flex-row max-sm:flex-col gap-4 w-full items-center max-sm:items-start justify-between">
          <SlidingBar sections={["Activity Log", "Feedback Log"]}>
            <div
              id="largegenerictable"
              className="flex w-[164px] rounded-lg max-sm:hidden hover:scale-105 font-Gilroy-SemiBold duration-300 flex-row py-2 px-[40px] text-white bg-[#005A86] justify-between items-center"
            >
              <span> Export </span>
              <Image src={Export} className="w-6 h-6" alt="export" />
            </div>
          </SlidingBar>
        </div>

        <div className="flex flex-row items-center"></div>
      </div>
      {/* <DateSelector /> */}
      <GenericTable
        data={Reportdata}
        tableHeaders={tableHeaders}
        isAction={tableListType !== "Activity Log"}
      >
        <SmallReport />
      </GenericTable>
    </div>
  );
}
