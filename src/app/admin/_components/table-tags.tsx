type Status = string

export default function Tags({ statusName }: { statusName: Status }) {
    let color = statusName === "Active" ? "text-[#3C8930]" : "text-[#B3261E]";
    let bgColor = statusName === "Active" ? "bg-[#3C893066]" : "bg-[#B3261E4D]";
  
    return (
      <span
        className={`flex justify-center items-center ${color} ${bgColor} max-w-[130px]  py-1 rounded-lg  w-full`}
      >
        {statusName}
      </span>
    );
  }