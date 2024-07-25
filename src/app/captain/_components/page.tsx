/* eslint-disable @next/next/no-img-element */
'use client'
import { useState, useEffect } from "react";
import SeatChart from "./SeatChart";
import WaitingList from "./WaitingList";

export default function CaptainHome() {
  const [allChecked, setAllChecked] = useState(false);
  const [tripStarted, setTripStarted] = useState(false);
  const [buttonText, setButtonText] = useState('Begin Trip');
  const [displayText, setDisplayText] = useState("All staff members have boarded the bus you may begin the trip.");
  const [showBeginTrip, setShowBeginTrip] = useState(false);
  const [batchItems, setBatchItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Enable / diable button based on selection
    if (batchItems.size < 1) {
      setAllChecked(false);
      return
    }
    setAllChecked(true);
  }, [batchItems])

  // Add or remove items marked for deletion

  function toggleBatchItem(id: number) {
    if (batchItems.has(id)) {
      setBatchItems((prev) => {
        prev.delete(id);
        return new Set(prev);
      });
      return
    }
    setBatchItems((prev) => new Set(prev).add(id))
  }



  const handleAllChecked = (isChecked: boolean) => {
    setAllChecked(isChecked);
  };

  const handleDoneClick = () => {
    // Handle "Done" button click
    setShowBeginTrip(true);
  };

  const handleBeginTripClick = () => {
    setTripStarted(true);
    setButtonText('End Trip');
    setDisplayText('Let us know when you have reached your final destination.');
  };

  const handleEndTripClick = () => {
    setTripStarted(false);
    setButtonText('Begin Trip');
    setDisplayText('All staff members have boarded the bus you may begin the trip.');
  };

  //   const handleDoneClick = () => {
  //     // Handle "Done" button click functionality
  //     alert('Done button clicked!');
  //   };
  return (
    <div className="flex flex-col max-w-[100vh] w-[90%] mx-auto overflow-scroll mb-[10vh]">
      <div className="mt-[3vh]">
        <h1 className="text-lg text-gray-600 font-Gilroy-Bold text-center mb-[5%]">
          Hello, Funmi DAWSON {/* add the the name call here  */}
        </h1>
        <div className="flex flex-col  sm:flex-row items-center sm:justify-center sm:justify-between whitespace-nowrap ">
          <div className="flex sm:self-end ">
            <div className="px-6 py-4 space-y-3 self-end">
              <div className="flex flex-row space-x-9 justify-between">
                <h3 className="text-sm text-gray-500 font-Gilroy-UltraLight">Route:</h3>
                <p className="text-gray-600 text-sm font-Gilroy-SemiBold">Ajah</p>
              </div>
              <div className="flex flex-row space-x-9 justify-between">
                <h3 className="text-sm  text-gray-500 font-Gilroy-UltraLight">Bus Driver:</h3>
                <p className="text-gray-600 text-sm font-Gilroy-SemiBold">Tayo Adewale</p>
              </div>
              <div className="flex flex-row space-x-9 justify-between">
                <h3 className="text-sm text-gray-500 font-Gilroy-UltraLight">Phone Number:</h3>
                <p className="text-gray-600 text-sm font-Gilroy-SemiBold">0803&nbsp;327&nbsp;7625</p>
              </div>

            </div>
          </div>
          <div>
            <img src="/busBlue.svg" />
          </div>
        </div>
      </div>
      <div className="mt-[6vh] relative">
        <input type="text" className="p-2 border-[1.4px] rounded w-full max-w-screen text-sm focus:outline-none font-Gilroy-Regular border-ecobankBlue text-gray-500 pr-[4vh]" placeholder="Search by Name"
          style={{ fontSize: '16px' }}
        />
        <img src="searchicon.svg" className="absolute right-2 top-1/2 transform -translate-y-1/2" alt="searchicon" />
      </div>
      <span className="mt-2">
        <p className="text-xs sm:text-sm text-gray-500 font-Gilroy-Regular">
          *Tap the status button when a staff member boards the bus
        </p>
      </span>

      {!showBeginTrip && (
        <SeatChart batchItems={batchItems} toggleBatchItem={toggleBatchItem} />
      )}

      <div className="justify-center flex w-full">
        <WaitingList />
        {/* Render text and button after "Done" button click */}
        {/* Render text and button after "Done" button click */}
        {showBeginTrip && (
          <div className="flex flex-col justify-center items-center my-[20%] sm:max-w-[328px]">
            <div className="text-gray-500 mb-[8vh] font-Gilroy-Medium">
              <p className="text-center ">{displayText}</p>
              {/* {!tripStarted && (
              <p className="text-center self-center">You may begin the trip.</p>
            )} */}
            </div>

            <button
              onClick={tripStarted ? handleEndTripClick : handleBeginTripClick}
              className={`rounded w-full sm:max-w-[328px] py-[1.5vh] text-sm text-white font-Gilroy-Regular focus:outline-none whitespace-nowrap ${tripStarted ? 'bg-endRed' : 'bg-ecobankLightTeal'}`}
            >
              {buttonText}
            </button>
          </div>
        )}
        {!showBeginTrip && (
          <button
            onClick={handleDoneClick}
            className={`bg-ecobankLightTeal rounded w-full sm:max-w-[328px] py-[1.5vh] text-sm text-white focus:outline-none whitespace-nowrap ${allChecked ? '' : 'bg-gray-300 cursor-not-allowed'}`}
            disabled={!allChecked}
          >
            Done
          </button>
        )}

      </div>
    </div>
  );
}