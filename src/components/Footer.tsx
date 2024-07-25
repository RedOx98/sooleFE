import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-ecobankBlue text-white w-full bottom-0">
      {/* Top Strip */}
     

      <div className="max-w-screen-2xl mx-auto  grid place-items-center px-4 sm:px-6 lg:px-8">

        <div className="text-center m-2 flex flex-row">
        <p className='text-xl pb-0 text-gray-300 font-bold font-Gilroy-Regular pr-2 self-center'>©</p>
          <p className='text-sm pb-0 font-Gilroy-Regular self-center'> 2024 Powered by innovation team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
