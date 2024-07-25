"use client";
import { Bus, NAVIGATION, Session } from "@/lib/definitions";
import { prepareBusStopData } from "@/lib/utils/utils";
import { Select } from "antd";
import { CSSProperties, useState } from "react";
import classNames from "classnames";
import { bookBus } from "@/lib/user/action";
import { useRouter } from "next/navigation";
import { FetchError } from "@/lib/FetchError";
import { encryptData } from "@/lib/utils/cyptoUtils";
import BeatLoader from "react-spinners/BeatLoader";

type BookSeatProp = {
  bus: Bus;
  session: Session;
};

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const BookSeat: React.FC<BookSeatProp> = ({ bus, session }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedDropOffPoint, setSelectedDropOffPoint] = useState<
    string | undefined
  >(undefined);

  const router = useRouter();

  function handleBook() {
    setIsLoading(true);

    (async function () {
      try {
        if (!selectedDropOffPoint) {
          return;
        }

        const result = await bookBus(session.token, {
          userId: 1,
          busId: bus.busId,
          route: bus.routeName,
          drop_off_point: selectedDropOffPoint,
        });

        const encryptedBusDetails = encryptData(result);

        router.push(`${NAVIGATION.USER_CHECKOUT}?bk=${encryptedBusDetails}`);
      } catch (error) {
        if (error instanceof FetchError) {
          setErrorMessage(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }

  return (
    <div className="max-w-[340px]">
      <form action={handleBook}>
        <div className="flex flex-col gap-y-3">
          <label htmlFor="bus_stop">Drop-off Point</label>
          <div>
            <Select
              placeholder="Select your bus stop"
              onChange={(e) => setSelectedDropOffPoint(e)}
              style={{ width: "100%", height: 45, border: "1px" }}
              options={prepareBusStopData(bus.busStops)}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="text-center mt-5">
            <BeatLoader
              color={"#0282ad"}
              loading={true}
              cssOverride={override}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <button
            type="submit"
            disabled={!selectedDropOffPoint}
            className={classNames({
              " text-white bg-ecobankBlue": selectedDropOffPoint,
              " text-white bg-gray-400": !selectedDropOffPoint,
              "w-full font-bold text-white mt-7 rounded font-Inter-Bold py-3":
                true,
            })}
          >
            Book Now
          </button>
        )}
      </form>
    </div>
  );
};

export default BookSeat;
function setErrorMessage(message: string) {
  throw new Error("Function not implemented.");
}
