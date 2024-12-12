import React from 'react'
import { FaGithub } from "react-icons/fa";
import ChangeModeBtn from './ChangeModeBtn';
import { useState } from 'react';

const Navbar = ({changeMode, setChangeMode, changeModeFunc}) => {


  return (
    <nav >
<header className={`relative shadow-md z-10 ${changeMode ? "bg-gradient-to-r from-green-200 via-gray-100 to-green-300 text-gray-700" : "bg-gradient-to-r from-green-200 via-gray-200 to-green-300 text-gray-700"}`}>

  <div className="  flex  p-3  md:p-4 justify-between items-center ">
    <a className="flex title-font font-medium items-center text-gray-900  ">
      <span className=" text-xl mPhone:text-2xl font-bold">&lt;Pass-<span className='text-green-700'>Graber/&gt;</span></span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
  <a target='_blank' href="https://github.com/nishantsisodia">
  <button className="inline-flex shadow-lg items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded  text-sm mPhone:text-base"> Github
    <FaGithub className='ml-2 text-xl'/>
    </button>
  </a>
    <ChangeModeBtn changeMode={changeMode} setChangeMode={setChangeMode} changeModeFunc={changeModeFunc}/>
    </nav>

  </div>
</header>
    </nav>
  )
}

export default Navbar
