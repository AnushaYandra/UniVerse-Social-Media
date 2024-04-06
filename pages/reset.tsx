import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import {useFormik} from 'formik';
import {resetPasswordVerify} from "../helper/validate";
import { resetPassword } from "../helper/helper";
import useFetch from '../hooks/fetch.hook.js';
import {useAuthStore} from '../store/store.js';

const Reset = () => {

    const router = useRouter();
    const { username } = useAuthStore(state => state.auth);
    const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession')

    const formik = useFormik({
        initialValues : {
            password: '',
            confirm_password: ''
        },
        validate: resetPasswordVerify,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {
      
            let resetPromise = resetPassword({ username, password: values.password })

            toast.promise(resetPromise, {
              loading: 'Updating...',
              success: <b>Reset Successfully...!</b>,
              error : <b>Could not Reset!</b>
            });
      
            resetPromise.then(function(){ router.push('/password') })
      
          }
    })

    if(status && status !== 201) return  router.push('/password')

    return (
        <div>
            <Toaster />
            <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("https://images.hdqwalls.com/download/better-without-you-jl-1920x1080.jpg")'} }>
                <form  onSubmit={formik.handleSubmit}>
                    <div className=" h-screen flex flex-col items-center justify-center">
                      <div className="flex flex-col bg-transparent p-8 items-center rounded-lg shadow-2xl">

                        <div className="flex flex-col items-center">
                            <h1 className="font-bold text-white text-3xl">Reset 𐙚</h1>
                            <p className="pb-2 text-white text-lg"> Enter new password</p>
                        </div>

                        <img className="h-36 rounded-lg opacity-75 border-2" src="../images/hi.avif"></img>

                        <div >
                            <div className="mt-4 mb-4">

                                <div >
                                    <div className="flex  bg-purple-300 items-center p-1 border-2 rounded-lg mb-2">
                                        <input  {...formik.getFieldProps('password')} placeholder="Enter Password"  required
                                        className="outline-none bg-transparent placeholder-purple-400 text-white w-full lg:w-48 xl:w-40"
                                        type="password"></input>
                                    </div>
                                    <div className="flex  bg-purple-300 items-center p-1 border-2 rounded-lg mb-2">
                                        <input  {...formik.getFieldProps('confirm_password')} placeholder="Confirm Password"  required
                                        className="outline-none bg-transparent placeholder-purple-400 text-white w-full lg:w-48 xl:w-40"
                                        type="password"></input>
                                    </div>
                                </div>

                            </div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                            <button className="bg-purple-300 rounded-lg p-2 pl-12 pr-12 text-white hover:bg-purple-400 shadow-lg" type="submit">Reset</button> 
                        </div>

                      </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Reset;
