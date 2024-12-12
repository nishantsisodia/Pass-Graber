import React from 'react'

const ChangeModeBtn = ({changeMode, setChangeMode, changeModeFunc}) => {




  return (

    <>


<label  className="inline-flex items-center relative mx-2 shadow-lg rounded-full cursor-pointer "
>
  <input onClick={changeModeFunc} className="peer hidden" id="toggle" type="checkbox" />
  <div
    className="relative w-[60px] h-[30px] bg-white peer-checked:bg-zinc-500 rounded-full
    after:absolute after:content-[''] after:w-[21px] after:h-[21px]
    after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-100 peer-checked:after:to-zinc-100
    after:rounded-full after:top-[5px] after:left-[5px] active:after:w-[25px]
    peer-checked:after:left-[55px] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md"
  ></div>
  <svg
    height="0"
    width="100"
    viewBox="0 0 24 24"
    data-name="Layer 1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    className="fill-white peer-checked:opacity-60 absolute w-4 h-4 top-2 left-[7px]"
  >
    <path
      d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z"
    ></path>
  </svg>
  <svg
    height="512"
    width="512"
    viewBox="0 0 24 24"
    data-name="Layer 1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    className={`fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-black absolute w-4 h-4 top-2 right-[7px]`}
  >
   <path d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
</label>



    </>


  )
}

export default ChangeModeBtn
