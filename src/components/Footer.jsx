import React from 'react';


const Footer = ({changeMode, setChangeMode}) => {

  return (
      <footer  className={`text-white  bg-slate-500 body-font relative w-full  z-10 bottom-0`}>
  <div className=" px-3 py-2 mx-auto flex items-center flex-col md:flex-row justify-around md:gap-10 ">

      <span className=" text-md font-bold text-white">&lt;Pass-<span className='text-green-500'>Graber/&gt;</span></span>

    <p className="text-xs text-white-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200  sm:py-2 ">© 2024 Pass-Graber ❤️
      <a href="https://www.facebook.com/nishant.sisodia.16/" className="text-white-600 ml-1" rel="noopener noreferrer" target="_blank">@Nishant Rajput</a>
    </p>

  </div>
</footer>

  )
}

export default Footer
