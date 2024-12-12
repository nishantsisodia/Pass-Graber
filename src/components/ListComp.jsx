import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";

const ListComp = ({ allpasswords, hiddenIsVisible2, setHiddenIsVisible2, eyeIconRef2, changeHiddenEye2, toast, changeMode, deletPasswords, editPasswords2 }) => {

  const copyTextFunc2 = (text) => {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    toast.success("Copied to Clipboard!")
  };

  return (
    <>
    {allpasswords.length === 0 ? <div className={` ${changeMode ? "text-white" : "text-black "} text-center my-10`}>No Passwords Found</div> :
      <div className={`relative flex w-full sm:w-[85vw] flex-col rounded-lg border-[3px] ${changeMode ? "tableBody border-slate-500" : "bg-gradient-to-r from-green-200 via-gray-100 to-green-300 text-black border-slate-300"}   shadow-xl`}
      >
        <nav className="flex min-w-[240px] flex-col gap-1 p-1.5  overflow-auto max-h-[37vh]  ">
          <span onClick={changeHiddenEye2} className='absolute top-[-4.45rem] right-5 z-20 bg-green-300 shadow-lg rounded-full p-3 '>< img width={25} ref={eyeIconRef2} src="icons/hidden.png" alt="" /></span>
          {allpasswords.map((items, idx) => {

            return (
              <div key={idx}
                role="button"
                className={`text-slate-800  ${changeMode ? "border-slate-800 border" : ""}  shadow-lg flex w-full relative items-center  rounded-md p-3 transition-all`}
              >


                <div className="mr-4 grid place-items-center shadow-lg rounded-full flex-shrink-0  ">
                  <img
                    alt=""
                    src={`https://${new URL(items.site.includes("://") ? items.site : `https://${items.site}`).hostname}/favicon.ico`}
                    className="relative inline-block h-10 w-10 !rounded-full object-cover object-center"
                    onError={(e) => {
                      e.target.onerror = null; // Prevents infinite loop
                      e.target.src = 'icons/userr.png' // Replace with your fallback image URL
                    }}
                  />
                </div>
                <div className='flex justify-between  w-[70vw]'>

                  <div onClick={() => editPasswords2(items.id)} className=''>
                    <h6  className={` ${changeMode ? "text-white" : "text-black"} font-medium  overflow-hidden whitespace-nowrap text-ellipsis sPhone:max-w-[100px] mPhone:max-w-[160px] lPhone:max-w-[180px]   sm:max-w-[200px]`}>
                      {items.site}
                    </h6>
                   <p
  className={`${
    changeMode ? "text-slate-100" : "text-black"
  } text-sm flex gap-2 items-center`}
>
  <span
    className={`relative overflow-hidden  sPhone:max-w-[100px] mPhone:max-w-[160px] lPhone:max-w-[180px] sm:max-w-[200px] ${
      hiddenIsVisible2 ? "" : "whitespace-nowrap text-ellipsis"
    }`}
  >
    <input
      type="text"
      className="bg-transparent outline-none text-start w-full h-full tracking-widest"
      readOnly
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
      value={items.username}
    />
  </span>
  <FaUserCircle style={{display:'flex', flexShrink:'0'}} />
  <span
    className={`relative overflow-hidden sPhone:max-w-[100px] mPhone:max-w-[160px] lPhone:max-w-[180px] sm:max-w-[200px] ${
      hiddenIsVisible2 ? "" : "whitespace-nowrap text-ellipsis"
    }`}
  >
    <input
      type={hiddenIsVisible2 ? "password" : "text"}
      className="bg-transparent  pr-3 outline-none text-start w-full h-full tracking-widest"
      readOnly
      style={{
        overflow: hiddenIsVisible2 ? "hidden" : "visible", // Dynamically handle overflow
        textOverflow: hiddenIsVisible2 ? "unset" : "ellipsis", // Remove ellipsis for password
        whiteSpace: hiddenIsVisible2 ? "normal" : "nowrap", // Manage text wrapping based on type
      }}
      value={items.password}
    />
  </span>
</p>





                  </div>
                  <div className='flex justify-center items-center gap-2 '>


                  <span onClick={() => {
                    copyTextFunc2(`Username : ${items.username}, Password : ${items.password}, Site : ${items.site}, `)
                  }} className={`cursor-pointer copyIcon  ${changeMode ? "border-slate-600 border" : ""}  rounded-full shadow-lg `}>

                    <dotlottie-player
                      src="https://lottie.host/601abf35-abdf-4718-a91e-ef23375eda23/esRJAM1DRZ.lottie"
                      background="transparent"
                      style={{ width: "50px", height: "50px" }}
                      playMode="bounce"
                      speed="2"
                      direction="1"
                      hover></dotlottie-player>
                  </span>
                  <span onClick={() => deletPasswords(items.id)} className={`${changeMode ? "border-slate-600 border" : ""} cursor-pointer copyIcon border rounded-full shadow-lg p-[13px] flex justify-center items-center`}>
                    <lord-icon
                      src="https://cdn.lordicon.com/hwjcdycb.json"
                      trigger="click"
                      stroke="bold"
                      colors={`${changeMode ? "primary:#22c55e,secondary:#ffffff" : "primary:black,secondary:darkgreen"}`}
                      style={{ width: "23px", height: "23px" }}>
                    </lord-icon>
                  </span>
                  </div>
                </div>

              </div>
            )
          })}

        </nav>
      </div>}
    </>
  )
}

export default ListComp
