import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'


function App() {
  const [changeMode, setChangeMode] = useState(true)

  const changeModeFunc = () => {
    setChangeMode((prev) => !prev);

  }

  return (

    <>
  <div className='w-full h-screen transition-all fixed duration-1000 '>
    <Navbar changeMode={changeMode} setChangeMode={setChangeMode}  changeModeFunc={changeModeFunc}/>
    <Manager changeMode={changeMode} setChangeMode={setChangeMode} toast={toast} ToastContainer={ToastContainer}/>


    <div className='fixed w-full z-40 left-0 bottom-0 '>
    <Footer changeMode={changeMode} setChangeMode={setChangeMode} />
    </div>
  </div>
    </>
  )
}

export default App
