import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
import NewModal from './NewModal';
import ListComp from './ListComp';


const Manager = ({ changeMode, setChangeMode }) => {

    const eyeIconRef = useRef(null)
    const eyeIconRef2 = useRef(null)
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [allPasswords, setAllPasswords] = useState([])
    const [hiddenIsVisible, setHiddenIsVisible] = useState(true)
    const [hiddenIsVisible2, setHiddenIsVisible2] = useState(true)
    const [warningDelete, setWarningDelete] = useState(false)
    const [passwordToDelete, setPasswordToDelete] = useState(null)
    const [windowWidht, setWindowWidht] = useState(window.innerWidth)
    const [siteUrls, setSiteUrls] = useState([])
    const [columnWidths, setColumnWidths] = useState([150, 150, 150, 100]);



    useEffect(() => {

        let password = localStorage.getItem("passwords")

        if (password) {
            setAllPasswords(JSON.parse(password))

        }



    }, [])

    useEffect(() => {
        const handleResize = () => setWindowWidht(window.innerWidth);

        window.addEventListener('resize', handleResize);
        const allSites = allPasswords.map(item => item.site);
        setSiteUrls(allSites)

        return () => window.removeEventListener('resize', handleResize);


    }, [windowWidht]);



    const changeHiddenEye = () => {

        if (eyeIconRef.current.src.includes("icons/hidden.png")) {
            eyeIconRef.current.src = "icons/eye.png"
            setHiddenIsVisible(false)
        }
        else {
            eyeIconRef.current.src = "icons/hidden.png"
            setHiddenIsVisible(true)
        }
    }
    const changeHiddenEye2 = () => {
        if (eyeIconRef2.current.src.includes("icons/hidden.png")) {
            eyeIconRef2.current.src = "icons/eye.png";
            setHiddenIsVisible2(false);
        } else {
            eyeIconRef2.current.src = "icons/hidden.png";
            setHiddenIsVisible2(true);
        }
    };

    const inputChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.value })


    }

    const savePassword = () => {
        if (form.site.length && form.username.length && form.password.length > 0) {
            setTimeout(() => {
                setAllPasswords([...allPasswords, { ...form, id: uuidv4() }])
                localStorage.setItem("passwords", JSON.stringify([...allPasswords, { ...form, id: uuidv4() }]))
                toast.success('Saved Successfully!')
                setForm({ site: "", username: "", password: "" });
            }, 800);
        }
        else {
            toast.warning("Please Enter Some Details")


        }





    }



    const deletPasswords = (deletPass) => {
        setTimeout(() => {
            setWarningDelete(true);
        }, 500);

        setPasswordToDelete(deletPass);
    }

    const handleDeleteConfirmation = (confirm) => {
        if (confirm) {
            setAllPasswords(allPasswords.filter(item => item.id !== passwordToDelete));
            localStorage.setItem("passwords", JSON.stringify(allPasswords.filter(item => item.id !== passwordToDelete)));
            toast.success("Deleted Successfully!")
        }
        setWarningDelete(false);


    }

    const editPasswords = (editPass) => {
        if (form.site.length > 0 || form.username.length > 0 || form.password.length > 0) {
            toast.warning("Only One Edit at a Time.")
        } else {
            setTimeout(() => {
                setForm(allPasswords.filter(item => item.id === editPass)[0]);
                setAllPasswords(allPasswords.filter(item => item.id !== editPass));
            }, 1000);
        }
    };
    const editPasswords2 = (editPass) => {
        if (form.site.length > 0 || form.username.length > 0 || form.password.length > 0) {
            toast.warning("Only One Edit at a Time.")
        } else {

                setForm(allPasswords.filter(item => item.id === editPass)[0]);
                setAllPasswords(allPasswords.filter(item => item.id !== editPass));

        }
    };

    const copyTextFunc = (text) => {
        navigator.clipboard.writeText(text);
        notify()

    }

    const notify = () => toast.success("Copied to Clipboard!");

    const calculateMinWidths = () => {
        const minWidths = [
            Math.max(...allPasswords.map(item => item.site.length * 8), 100),
            Math.max(...allPasswords.map(item => item.username.length * 8), 100),
            Math.max(...allPasswords.map(item => item.password.length * 8), 100),
            100
        ];
        const maxWidths = [200, 300, 300, 50]; // Define maximum widths for each column
        const finalWidths = minWidths.map((minWidth, index) => Math.min(minWidth, maxWidths[index])); // Ensure widths do not exceed max
        setColumnWidths(finalWidths);
    };
    useEffect(() => {
        calculateMinWidths();
    }, [allPasswords]);

    const handleMouseDown = (e, index) => {
        e.preventDefault();
        const startX = e.clientX;
        const startWidth = columnWidths[index];

        const handleMouseMove = (e) => {
            const newWidth = Math.max(columnWidths[index], startWidth + (e.clientX - startX));
            const maxWidth = 300; // Set the maximum width for the column
            const constrainedWidth = Math.min(newWidth, maxWidth); // Ensure it does not exceed max width
            const newWidths = [...columnWidths];
            newWidths[index] = constrainedWidth; // Update to constrained width
            setColumnWidths(newWidths);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const truncateTextByWidth = (text, maxWidth) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = '16px Arial'; // Use the same font style as your table
        let truncatedText = text;

        // Measure the width of the text
        while (context.measureText(truncatedText + '...').width > maxWidth) {
            truncatedText = truncatedText.slice(0, -1); // Remove one character
        }

        return truncatedText + '...'; // Append ellipsis
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"



            />

            <div className={`${changeMode ? "BackGroundMG" : ""}  h-screen w-full fixed left-0 top-0 `}></div>
            {warningDelete ? <NewModal succes={handleDeleteConfirmation} /> : ""}
            <div className=' mx-auto flex flex-col justify-center items-center p-4 z-10 relative mt-2 '>
                <div className='text-center'>
                    <span className={`ml-3 text-xl mPhone:text-2xl font-bold  ${changeMode ? "text-white" : "text-black"}`}>&lt;Pass-<span className='text-green-500'>Graber/&gt;</span></span>
                    <p className={` ${changeMode ? "text-white" : "text-black"} text-sm mPhone:text-base`}>Your Own Password Manager</p>
                </div>
                <div className='flex w-[85vw] md:w-2/3  m-5  '>
                    <input value={form.site} onChange={inputChange} placeholder='Enter Your Website Name' className='w-full rounded-lg shadow-lg outline-green-500  px-3 py-1 border-b-2 border-green-500' type="text" name="site" id="site" />
                </div>
                <div className='flex w-[85vw] md:w-2/3 gap-5  md:flex-row flex-col'>
                    <input value={form.username} onChange={inputChange} placeholder='Enter Username' className='w-full rounded-lg shadow-lg outline-green-500  px-3 py-1 border-b-2 border-green-500' type="text" name="username" id="username" />
                    <span className='relative'>
                        <input value={form.password} onChange={inputChange} placeholder='Enter Password' className='w-full rounded-lg shadow-lg outline-green-500  pl-3 pr-8 py-1 border-b-2 border-green-500' type={hiddenIsVisible ? 'password' : 'text'} name="password" id="password" />
                        <img ref={eyeIconRef} onClick={changeHiddenEye} src="icons/hidden.png" alt="" width={35} className='absolute cursor-pointer right-0 top-1/2 translate-y-[-50%] px-2' />

                    </span>
                </div>
                <div className='my-5 relative'>

                    <button onClick={savePassword} className='bg-green-300 pr-6 pl-16 py-3 shadow-lg sPhone:mr-12 mPhone:mr-0 items-center flex rounded-full font-semibold relative overflow-hidden'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="click"
                            style={{ width: "300px", height: "35px", position: "absolute", left: "-115px", display: "flex", justifyContent: "flex-start" }}
                        ></lord-icon>
                        Save Password

                    </button>

                </div>
                {windowWidht > 768 ?
                    <div className=' md:w-2/3 '>
                        <h2 className={`font-semibold text-2xl py-4 ${changeMode ? "text-white" : "text-black"}`}>Your Passwords</h2>
                        {allPasswords.length === 0 ? <div className={` ${changeMode ? "text-white" : "text-black"} text-center my-10`}>No Passwords Found</div> :
                            <div className="overflow-y-auto h-[36.1vh] relative scrollbar-thin scrollbar-track-transparent scrollbar-thumb-hidden transition-all ease-out duration-1000 rounded-md ">
                                <table className="table-auto relative shadow-lg z-10 w-full rounded-md text-center overflow-clip" style={{ tableLayout: 'fixed' }}>
                                    <thead className="bg-green-500 text-white shadow-md sticky top-0 z-20">
                                    <tr>
                                            {['Sites', 'Usernames', 'Passwords', 'Actions'].map((header, index) => (
                                                <th key={index} className="p-2 relative " style={{ width: columnWidths[index], minWidth: columnWidths[index], maxWidth: '300px' }}>
                                                    <div className='flex justify-center items-center gap-1'>
                                                    {header}
                                                    {header === 'Passwords' && (
                                                        <img ref={eyeIconRef2} onClick={changeHiddenEye2} src="icons/hidden.png" alt="" width={23} className='cursor-pointer ml-2 ' />
                                                    )}

                                                    </div>

                                                    <div
                                                        className="absolute right-0 top-0 h-full w-1.5  cursor-col-resize border-r-2 border-gray-300"
                                                        onMouseDown={(e) => handleMouseDown(e, index)}
                                                    />
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className={` ${changeMode ? "tableBody" : "bg-gradient-to-r from-green-200 via-gray-100 to-green-300 text-black"} `}>
                                        {allPasswords.map((items, idx) => (
                                            <tr key={idx}>
                                                <td className="px-2 py-1 border-t shadow-md border-green-100" style={{ width: columnWidths[0], minWidth: columnWidths[0], maxWidth: '300px' }}>
                                                    <div className="flex items-center justify-center">
                                                        <div className="flex items-center mr-2">
                                                            <img
                                                                alt=""
                                                                src={`https://${new URL(items.site.includes("://") ? items.site : `https://${items.site}`).hostname}/favicon.ico`}
                                                                className="relative inline-block h-6 w-6 !rounded-full object-cover object-center"
                                                                onError={(e) => {
                                                                    e.target.onerror = null; // Prevents infinite loop
                                                                    e.target.src = 'icons/userr.png' // Replace with your fallback image URL
                                                                }}
                                                            />
                                                            <span className={`ml-2 ${columnWidths[0] <= 200 ? 'truncate' : ''}`} style={{ maxWidth: '250px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                                                {items.site}
                                                            </span>
                                                        </div>
                                                        <span onClick={() => copyTextFunc(items.site)} className='cursor-pointer copyIcon ml-2'>
                                                            <dotlottie-player
                                                                src="https://lottie.host/601abf35-abdf-4718-a91e-ef23375eda23/esRJAM1DRZ.lottie"
                                                                background="transparent"
                                                                style={{ width: "50px", height: "50px" }}
                                                                playMode="bounce"
                                                                direction="1"
                                                                hover></dotlottie-player>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-1 text-center border-t shadow-md border-green-100" style={{ width: columnWidths[1], minWidth: columnWidths[1], maxWidth: '300px' }}>
                                                    <div className="flex items-center justify-center">
                                                        <span className={`overflow-hidden ${columnWidths[1] <= 200 ? 'truncate' : ''}`} style={{ maxWidth: '200px', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                                            {items.username}
                                                        </span>
                                                        <span onClick={() => copyTextFunc(items.username)} className='cursor-pointer copyIcon'>
                                                            <dotlottie-player
                                                                src="https://lottie.host/601abf35-abdf-4718-a91e-ef23375eda23/esRJAM1DRZ.lottie"
                                                                background="transparent"
                                                                style={{ width: "50px", height: "50px" }}
                                                                playMode="bounce"
                                                                direction="1"
                                                                hover></dotlottie-player>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-1 border-t shadow-md border-green-100" style={{ minWidth: columnWidths[2], maxWidth: '300px' }}>
                                                    <div className="flex items-center justify-center">
                                                        <input
                                                            className='bg-transparent border-none outline-none text-center'
                                                            readOnly
                                                            type={hiddenIsVisible2 ? 'password' : 'text'}
                                                            name="pass"
                                                            id="pass"
                                                            value={items.password}
                                                            style={{
                                                                width: `${items.password.length}ch`, // Set width based on character count
                                                                overflow: 'hidden',
                                                                whiteSpace: 'nowrap',
                                                                textOverflow: columnWidths[2] <= 200 ? 'ellipsis' : 'clip'
                                                            }}
                                                        />
                                                        <span onClick={() => copyTextFunc(items.password)} className='cursor-pointer copyIcon flex items-center justify-center' style={{ marginLeft: '0' }}>
                                                            <dotlottie-player
                                                                src="https://lottie.host/601abf35-abdf-4718-a91e-ef23375eda23/esRJAM1DRZ.lottie"
                                                                background="transparent"
                                                                style={{ width: "50px", height: "50px" }}
                                                                playMode="bounce"
                                                                direction="1"
                                                                hover></dotlottie-player>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-1 border-t shadow-md border-green-100" style={{ width: columnWidths[3], minWidth: columnWidths[3], maxWidth: '100px' }}>
                                                    <div className="flex items-center justify-center">
                                                        <span onClick={() => deletPasswords(items.id)} className='cursor-pointer copyIcon p-1'>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                                                trigger="click"
                                                                stroke="bold"
                                                                colors={`${changeMode ? "primary:#22c55e,secondary:#ffffff" : "primary:black,secondary:darkgreen"}`}
                                                                style={{ width: "25px", height: "25px" }}>
                                                            </lord-icon>
                                                        </span>
                                                        <span onClick={() => editPasswords(items.id)} className='cursor-pointer copyIcon p-1'>
                                                            <lord-icon
                                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                                trigger="click"
                                                                stroke="bold"
                                                                state="hover-line"
                                                                colors={`${changeMode ? "primary:#22c55e,secondary:#ffffff" : "primary:black,secondary:darkgreen"}`}
                                                                style={{ width: "25px", height: "25px" }}>
                                                            </lord-icon>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>}


                    </div> : <ListComp changeHiddenEye2={changeHiddenEye2} eyeIconRef2={eyeIconRef2} setHiddenIsVisible2={setHiddenIsVisible2} hiddenIsVisible2={hiddenIsVisible2} allpasswords={allPasswords} changeMode={changeMode} deletPasswords={deletPasswords} toast={toast} editPasswords2={editPasswords2} />}

            </div>



        </>

    )
}

export default Manager
