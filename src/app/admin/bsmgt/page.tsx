import { Bus, Session } from "@/lib/definitions";
import { getSession } from "@/lib/session";
import DateSelector from "../_components/dateselector";
import AddBusModal from "./_component/AddBusModal";
import BusTable from "./_component/BusTable";
import BusTableMV from "./_component/BusTableMV";
import { fetchBus, FetchBusParams } from "@/lib/user/action";
import { redirect } from "next/navigation";

export default async function BusManagement({ searchParams }: { searchParams: FetchBusParams }) {
  const session: Session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const busResponse = await fetchBus(session.token, {
    page: searchParams.page || 1,
    size: 10,
    operationalStatus: searchParams.operationalStatus,
    query: searchParams.query
  });

  const buses: Bus[] = busResponse.content;

  return (
    <div className="px-4 lg:px-inlinePage">
      <h1 className="text-[32px] max-sm:text-[25px] font-Gilroy-SemiBold text-[#023448] mt-2">
        Bus Management
      </h1>

      <div className="flex flex-col gap-y-3 my-3 items-end">
        <AddBusModal session={session} />
        <DateSelector placeholder="Search Bus..." />
      </div>

      <div className="hidden lg:block">
        <BusTable buses={buses} session={session} />
      </div>

      <div className="lg:hidden">
        <BusTableMV buses={buses} session={session} />
      </div>
    </div>
  );
}
