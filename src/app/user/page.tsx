import { BUS_OPERATIONAL_STATUS, Session } from "@/lib/definitions";
import Image from "next/image";
import { SelectBus } from "./_component";

import { getSession } from "@/lib/session";
import { fetchBus } from "@/lib/user/action";
import { redirect } from "next/navigation";
import DisplayBuses from "./_component/DisplayBuses";

const UserSelectionPage = async () => {
  const session: Session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const busPage = await fetchBus(session.token, {});

  const buses = busPage.content;

  return (
    <>
      <div className="w-[95vw] mx-auto max-w-[928px]">
        <SelectBus buses={buses} />

        <DisplayBuses buses={buses} />
      </div>
    </>
  );
};

export default UserSelectionPage;
