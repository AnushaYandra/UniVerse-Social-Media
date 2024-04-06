import Sidebar from '@/components/Sidebar'
import Widgets from '@/components/Widgets'
import { useRouter } from 'next/router'
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import toast,{ Toaster } from 'react-hot-toast'
import { useFormik } from "formik";
import convertToBase from '../helper/convert';
import useFetch from '../hooks/fetch.hook.js';
import {useAuthStore} from '../store/store.js';
import {updateUser}  from '../helper/helper.js';

function profile() {

  const router = useRouter();
  const [file, setFile] = useState('');
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch()
  //console.log(apiData)


  const formik = useFormik({
    initialValues : {
        firstName: apiData?.firstName || '',
        lastName: apiData?.lastName || '',
        email: apiData?.email || '',
        address: apiData?.address || '',
        phone: apiData?.phone || '',
    },
    enableReinitialize:true,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
        values = await Object.assign(values, {profileImg :file || apiData?.profileImg ||''})
        let updatePromise = updateUser(values)
            toast.promise(updatePromise, {
                loading: 'Updating...',
                success: <b>Updated Successfully (˶ᵔ ᵕ ᵔ˶) ♡ ♡</b>,
                error: <b>Could not update</b>
        });
        console.log(apiData)
    }
})


///logout
function userLogout(){
    localStorage.removeItem('token');
    router.push('/')
  }

const onUpload = async e => {
    const base64= await convertToBase(e.target.files[0]);
    setFile(base64);
}

  return (

    <div className="mx-auto lg:max-w-6xl max-h-screen overflow-hidden">
      <Toaster />
     <main className="grid grid-cols-9">
       <Sidebar college={apiData?.college} username={apiData?.username} />

        <div className='flex flex-col items-center col-span-7 lg:col-span-5 border-x max-h-screen bg-purple-100'>

         <form onSubmit={formik.handleSubmit} autoComplete="off">
           <div className='flex flex-col items-center'>
   
             <h1 className='mt-5 cursor-pointer text-xl  font-bold text-purple-400'> Profile 𐙚 You can update details 𐙚</h1>
             <h1 className='mb-2 cursor-pointer text-md  font-bold text-purple-400'></h1>
   
             <div className="flex flex-col items-center" >
                 
                 <div className="mb-2 flex flex-col justify-content items-center ">
                    <img src= {file || apiData?.profileImg ||"../images/a.jpg"} className="h-28 mr-2 rounded-full"/>
                    <input onChange={onUpload} type="file" id='profile' name="profileImg"
                    className= "flex-1 mt-2 file:p-2 file:px-4 file:mx-2 file:rounded-full text-white cursor-pointer hover:file:bg-purple-400 file:bg-purple-300 file:border-0 file:text-white"></input>
                 </div>
                 
                 <div >
                     <div className="flex bg-purple-300 items-center p-1 border-2 rounded-lg mb-2">
                         <input {...formik.getFieldProps('firstName')} placeholder="First Name"  required autoComplete="new-email"
                         className="outline-none bg-transparent placeholder-purple-400  text-white w-60"></input>
                         <MdEmail color="white"/>
                     </div>
                 </div>
   
                 <div >
                     <div className="flex  bg-purple-300 items-center p-1 border-2 rounded-lg mb-2">
                         <input {...formik.getFieldProps('lastName')} placeholder="Last Name" required autoComplete="new-password" 
                         className="w-60 outline-none bg-transparent placeholder-purple-400 text-white" ></input>
                         <FaLock color="white"/>
                     </div>
                 </div>
   
                 <div >
                     <div className="flex  bg-purple-300 items-center p-1 border-2 rounded-lg mb-2">
                         <input {...formik.getFieldProps('email')} placeholder="Email" type="email" required 
                         className="w-60 outline-none bg-transparent placeholder-purple-400 text-white"></input>
                         <FaUserAlt color="white"/>
                     </div>
                 </div>
   
                 <div >
                     <div className="flex  bg-purple-300 items-center p-1 border-2 rounded-lg mb-2">
                         <input {...formik.getFieldProps('address')} placeholder="Address" required 
                         className="w-60 outline-none bg-transparent placeholder-purple-400 text-white"></input>
                         <FaUserAlt color="white"/>
                     </div>
                 </div>
   
                 <div >
                     <div className="flex  bg-purple-300 items-center p-1 border-2 rounded-lg mb-2">
                         <input {...formik.getFieldProps('phone')} placeholder="Phone Number" required 
                         className="w-60 outline-none bg-transparent placeholder-purple-400 text-white "></input>
                         <FaPhone color="white"/>
                     </div>
                 </div>
             </div>
   
             <div className="m-1 space-x-3">
                 <button className="bg-purple-300 rounded-lg p-2 text-white hover:bg-purple-400 shadow-lg " type="submit">Update</button> 
             </div>
   
             <div className="flex items-center space-x-2">
               <p className="text-purple-500 text-md">Come back later? </p>
               <button className=" font-semibold text-purple-700 text-nd" onClick={userLogout}> Logout ♡</button>
             </div> 
   
           </div>
   
   
   
           <div className="mt-auto">
               <img className="opacity-50 h-36 object-cover rounded-lg mt-5 mb-5"
               src="../images/—Pngtree—jasmine flower outline abstract line_6685621.png"></img>
           </div>

          </form>
        </div>
        

       
    </main>
  </div>
  

  )
}

export default profile
