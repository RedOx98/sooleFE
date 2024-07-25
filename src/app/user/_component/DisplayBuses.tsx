"use client";
import Image from "next/image";
import { Modal as ModalWrapper } from "@/components/ModalWrapper";
import { useState } from "react";
import BusDetails from "./Bus-Details";
import { Bus, BUS_OPERATIONAL_STATUS } from "@/lib/definitions";
import { Modal } from "antd";

type DisplayBusesProp = {
  buses: Bus[];
};

const DisplayBuses: React.FC<DisplayBusesProp> = ({ buses }) => {
  const [showBus, setShowBus] = useState<Bus | undefined>(undefined);

  const error = () => {
    Modal.error({
      title: 'Ummm 🙁',
      content: 'This bus is not operational',
      okText: "Ok",
      maskClosable: true,  // Allow the modal to be dismissed by clicking outside
    });
  };

  return (
    <>
      <div className=" mt-8 grid grid-flow-row grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
        {buses.map((bus: Bus) => {
          return (
            <div key={bus.busId} onClick={() => {
              if (bus.operationalStatus == BUS_OPERATIONAL_STATUS.INACTIVE) {
                error()
                return;
              }
              setShowBus(bus);
            }}>
              <BusCard
                key={bus.busId}
                route={bus.routeName}
                numberPlate={bus.busNumber}
                status={bus.operationalStatus}
              />
            </div>
          );
        })}
      </div>

      {/* SHow bus modal */}

      {showBus && (
        <ModalWrapper bare={true} closeModal={() => setShowBus(undefined)}>
          <BusDetails bus={showBus} setShowBus={setShowBus} />
        </ModalWrapper>
      )}
    </>
  );
};

function BusCard({ route, numberPlate, status }: any) {

  const busActive = status == BUS_OPERATIONAL_STATUS.ACTIVE;

  return (
    <div className={`border-[1px] rounded-[4px] ${busActive ? "border-ecobankBlue" : "border-error"} border-ecobankBlue flex flex-col justify-center items-center p-3 hover:cursor-pointer `}>
      <Image src="/bus.svg" width={116.4} height={63} alt="Bus image" />

      <h3 className="mt-4 font-Gilroy-Medium">{route}</h3>
      <h4 className="mt-1 font-Gilroy-Medium">{numberPlate}</h4>
    </div>
  );
}

export default DisplayBuses;
