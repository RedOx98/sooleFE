/* eslint-disable @next/next/no-img-element */
import "./page.css";
import React, { useState, useEffect } from "react";

const ExportData = [
  { id: 1, name: 'Joyce Orimolowo', seat: '8C' },
  { id: 2, name: 'Sarah Eze', seat: '2C' },
  { id: 3, name: 'Eremosele Eze', seat: '4C' },
  { id: 4, name: 'Bamidele Lawal', seat: '6C' },
  { id: 5, name: 'Femi Johnson', seat: '4F' },
  { id: 6, name: 'Joy Joseph', seat: '2A' },
  { id: 7, name: 'Faith Adebayo', seat: '2F' },
  { id: 8, name: 'Sandra Eze', seat: '3A' },
  { id: 9, name: 'Kingsley Okonkwo', seat: '3B' },
  { id: 10, name: 'Funke Akindele', seat: '4A' },
  { id: 11, name: 'Bimpe Balogun', seat: '1C' },
  { id: 12, name: 'Harold Danladi', seat: '3C' },
  { id: 13, name: 'Na’ima Aliu', seat: '5C' },
  { id: 14, name: 'Christiana Lawrence', seat: '7C' },
  { id: 15, name: 'Timothy Peters', seat: '2B' },
  { id: 16, name: 'Ade Bolarinwa', seat: '5B' },
  { id: 17, name: 'Dolapo Kazeem', seat: '5A' },
  { id: 18, name: 'Patience Akubueze', seat: '3F' },
  { id: 19, name: 'Toyin Abraham', seat: '4B' },
  { id: 20, name: 'Shalom Sahara', seat: '8B' }
];

type SeaChartType = {
  batchItems: Set<number>,
  toggleBatchItem(id: number): void
}

const SeatChart: React.FC<SeaChartType> = ({ batchItems, toggleBatchItem }) => {

  return (
    <div className="flex flex-col justify-center sm:flex-row sm:justify-between mb-[10%] mt-[8vh]" >
      <div className="w-full sm:w-1/2">
        <table className="sm:w-[80%] w-[100%] text-left">
          <thead id='first-thead'>
            <tr>
              <th className='font-Gilroy-Bold text-sm'>Name</th>
              <th className='text-center font-Gilroy-Bold text-sm'>Seat</th>
              <th className='text-center font-Gilroy-Bold text-sm'>Status</th>
            </tr>
          </thead>
          <tbody>
            {ExportData.slice(0, 10).map((item, index) => (
              <tr key={index} className="border-b cursor-pointer" onClick={() => toggleBatchItem(item.id)}>
                <td className='pt-4 font-Gilroy-Regular text-sm'>{item.name}</td>
                <td className="font-Gilroy-SemiBold text-center pt-4 text-sm">{item.seat}</td>
                <td className='text-center pt-4'>
                  <div className="flex justify-center">
                    <img
                      src={batchItems.has(item.id) ? '/checked.svg' : '/unchecked.svg'}

                      alt={batchItems.has(item.id) ? 'Checked' : 'Unchecked'}
                      className="h-5 w-5"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full sm:w-1/2 flex justify-normal sm:justify-end">
        <table className="sm:w-[80%] w-[100%] text-left justify-end">
          <thead id="second-thead">
            <tr>
              <th className='font-Gilroy-Bold text-sm'>Name</th>
              <th className='text-center font-Gilroy-Bold text-sm'>Seat</th>
              <th className='text-center font-Gilroy-Bold text-sm'>Status</th>
            </tr>
          </thead>
          <tbody>
            {ExportData.slice(10).map((item, index) => (
              <tr key={index + 10} className="border-b cursor-pointer" onClick={() => toggleBatchItem(item.id)}>
                <td className='pt-4 font-Gilroy-Regular text-sm' id="tablename">{item.name}</td>
                <td className="font-Gilroy-SemiBold text-center pt-4 text-sm" id="tableseat">{item.seat}</td>
                <td className='text-center pt-4  ' id="tablestatus">
                  <div className="flex justify-center">
                    <img
                      src={batchItems.has(item.id) ? '/checked.svg' : '/unchecked.svg'}

                      alt={batchItems.has(item.id) ? 'Checked' : 'Unchecked'}
                      className="h-5 w-5"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeatChart;
