import React, { useState } from "react";
import "./WaitingList.css";
import { Modal } from "../../../components/ModalWrapper";

const WaitlistData = [
  { id: 31, name: 'Joyce Orimolowo', seat: '8C' },
  { id: 32, name: 'Sarah Eze', seat: '2C' },
  { id: 33, name: 'Eremosele Eze', seat: '4C' },
  { id: 34, name: 'Bamidele Lawal', seat: '6C' },
  { id: 35, name: 'Femi Johnson', seat: '4F' },
  { id: 36, name: 'Joy Joseph', seat: '2A' },
  { id: 37, name: 'Faith Adebayo', seat: '2F' },
  { id: 38, name: 'Sandra Eze', seat: '3A' },
  { id: 39, name: 'Kingsley Okonkwo', seat: '3B' },
  { id: 40, name: 'Funke Akindele', seat: '4A' },
  { id: 41, name: 'Bimpe Balogun', seat: '1C' },
  { id: 42, name: 'Harold Danladi', seat: '3C' },
  { id: 43, name: 'Na’ima Aliu', seat: '5C' },
  { id: 44, name: 'Christiana Lawrence', seat: '7C' },
  { id: 45, name: 'Timothy Peters', seat: '2B' },
  { id: 46, name: 'Ade Bolarinwa', seat: '5B' },
  { id: 47, name: 'Dolapo Kazeem', seat: '5A' },
  { id: 48, name: 'Patience Akubueze', seat: '3F' },
  { id: 49, name: 'Toyin Abraham', seat: '4B' },
  { id: 50, name: 'Shalom Sahara', seat: '8B' }
];


export default function WaitingList() {
  const [modal, setModal] = useState(false);
  const [checkedInputs, setCheckedInputs] = useState<boolean[]>(new Array(WaitlistData.length).fill(false));
  const [waitingList, setWaitingList] = useState<Set<string>>(new Set());

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleInputChange = (index: number) => {
    const newCheckedInputs = [...checkedInputs];
    newCheckedInputs[index] = !newCheckedInputs[index];
    setCheckedInputs(newCheckedInputs);
  };

  const isAnyInputChecked = checkedInputs.some(input => input);

  // if (modal) {
  //   document.body.classList.add('active-modal');
  // } else {
  //   document.body.classList.remove('active-modal');
  // }

  return (
    <div id="cpt">
      <button onClick={toggleModal} className="fixed bottom-8 right-8 bg-ecobankLightTeal text-white w-16 h-16 flex justify-center items-center rounded-full cursor-pointer z-50">
        {/* <p className="text-center self-center flex justify-center">
          Waiting List
        </p> */}
        <img src="waitinglist.svg" className="w-7" />
      </button>

      {modal && (
        <Modal bare={true} closeModal={() => { }}>
          <div className="modal w-[100%] h-[100%] flex justify-center items-center top-0 left-0">
            <div onClick={toggleModal} className="overlay w-[100%] h-[100%] top-0 fixed left-0"></div>
            <div className="modal-content slide-in-fwd-center relative overflow-y-auto">
              <div className="w-full items-center flex">
                <div className="testing max-w-[100vh]  mx-auto rounded overflow-hidden items-center">
                  <div className="px-6 py-4 w-auto">
                    <h1 className="font-Gilroy-Medium text-center text-xl">
                      Waitlist
                    </h1>
                    <div className="absolute top-0 right-0 p-1">
                      <button className="self-end" onClick={toggleModal}>
                        <img src="cancel.svg" alt="cancel" />
                      </button>
                    </div>
                  </div>

                  <div className="px-6 py-4 w-[37vh] sm:w-[30vw]">
                    <div className="flex items-center justify-center gap-x-[20%]">
                      <table className="w-full text-left">
                        <thead id='first-thead'>
                          <tr>
                            <th className='font-Gilroy-Bold text-sm'>Name</th>
                            <th className='text-center font-Gilroy-Bold text-sm'>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {WaitlistData.slice(0, 10).map((item, index) => (
                            <tr key={index} className="border-b ">
                              <td className='pt-4 font-Gilroy-Regular text-sm'>{item.name}</td>
                              <td className='text-center pt-4'>
                                <div className="flex justify-center">
                                  <img
                                    src={checkedInputs[index] ? 'checked.svg' : 'unchecked.svg'}

                                    alt={checkedInputs[index] ? 'Checked' : 'Unchecked'}
                                    className="h-5 w-5 cursor-pointer"
                                    onClick={() => handleInputChange(index)}
                                  />
                                </div>

                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex items-center justify-center my-[5%]">
                    {/* heres the button that says done ,i dont really know what request to make with it so onclick is empty */}
                    <button
                      className={`rounded w-full sm:max-w-[328px] py-[1.5vh] text-sm text-white focus:outline-none whitespace-nowrap
                      ${isAnyInputChecked ? 'bg-ecobankLightTeal' : 'bg-gray-400 cursor-not-allowed'}`}
                      disabled={!isAnyInputChecked}
                    >
                      <p className="text-center self-center flex justify-center">
                        Done
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
