import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import {useFormik} from 'formik';
import {usernameValidate} from "../helper/validate"
import {useAuthStore} from '../store/store.js';

const Username = () => {

    const setUsername = useAuthStore(state => state.setUsername);
    const username = useAuthStore(state=> state.auth.username)

    useEffect(() => {
        //console.log(username)
    })

    const formik = useFormik({
        initialValues : {
            username: ''
        },
        validate : usernameValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {
            setUsername(values.username)
            router.push('/password');
        }
    })

   const router = useRouter();
   const handleRegister  =() => {
    router.push('/register');
   }


    return (
        <div>
            <Toaster />
            <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("https://images.hdqwalls.com/download/better-without-you-jl-1920x1080.jpg")'} }>
                <form  onSubmit={formik.handleSubmit}>
                    <div className=" h-screen flex flex-col items-center justify-center">
                      <div className="flex flex-col bg-transparent p-8 items-center rounded-lg shadow-2xl">

                        <div className="flex flex-col items-center">
                            <h1 className="font-bold text-white text-3xl">Hello Again 𐙚</h1>
                            <p className="pb-2 text-white text-lg"> Good to see you</p>
                        </div>

                        <img className="h-36 rounded-lg opacity-75 border-2" src="../images/hi.avif"></img>

                        <div >
                            <div className="mt-4 mb-4">

                                <div >
                                    <div className="flex bg-purple-300 items-center p-1 border-2 rounded-lg">
                                        <input {...formik.getFieldProps('username')} placeholder="Enter Username" required
                                        className="outline-none bg-transparent placeholder-purple-400 text-white w-full lg:w-48 xl:w-40"></input>
                                    </div>
                                </div>

                            </div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                            <button className="bg-purple-300 rounded-lg p-2 pl-11 pr-11 text-white hover:bg-purple-400 shadow-lg" type="submit">Let's go</button> 
                        
                            <div className="flex p-2 font-semibold items-center text-white">
                              <p className="pr-2 text-purple-400" >New here?</p>
                              <button className=" text-purple-600" onClick={handleRegister}>Sign Up</button>
                            </div>

                        </div>

                      </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Username;
