import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import {useFormik} from 'formik';
import {passwordValidate} from "../helper/validate";
import useFetch from '../hooks/fetch.hook.js';
import {useAuthStore} from '../store/store.js';
import {verifyPassword} from '../helper/helper.js';

const Password = () => {

  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)
  //console.log(apiData)


  useEffect(() => {
    //console.log(apiData)
  })

    const formik = useFormik({
        initialValues : {
            password: ''
        },
        validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {
            let loginPromise = verifyPassword({ username, password:values.password })
            toast.promise(loginPromise, {
                loading: 'Checking...',
                success: <b>Logged In Successfully (˶ᵔ ᵕ ᵔ˶) ♡ ♡</b>,
                error: <b>Could not login</b>
            });
            loginPromise.then( res => {
                let {token} = res.data;
                localStorage.setItem('token', token)
                router.push('/home');
            }
        )}
    })

   const router = useRouter();
   const handleRecover  =() => {
    router.push('/recover');
   }

   //if(isLoading) return <h1 className="text-xl font-bold text-purple-600">is Loading</h1>
   if(serverError) return <h1  className="text-xl font-bold text-purple-600">{serverError?.message}</h1>

    return (
        <div>
            <Toaster />
            <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("https://images.hdqwalls.com/download/better-without-you-jl-1920x1080.jpg")'} }>
                <form  onSubmit={formik.handleSubmit}>
                    <div className=" h-screen flex flex-col items-center justify-center">
                      <div className="flex flex-col bg-transparent p-8 items-center rounded-lg shadow-2xl">

                        <div className="flex flex-col items-center">
                            <h1 className="font-bold text-white text-3xl">Hello {apiData?.firstName || apiData?.username} 𐙚</h1>
                            <p className="pb-2 text-white text-lg">Enter Password</p>
                        </div>

                        <img className="h-36 rounded-lg opacity-75 border-2" src={apiData?.profileImg || "../images/hi.avif"}></img>

                        <div >
                            <div className="mt-4 mb-4">

                                <div >
                                    <div className="flex  bg-purple-300 items-center p-1 border-2 rounded-lg mb-2">
                                        <input  {...formik.getFieldProps('password')} placeholder="Enter Password"  required
                                        className="outline-none bg-transparent placeholder-purple-400 text-white w-full lg:w-48 xl:w-40"
                                        type="password"></input>
                                    </div>
                                </div>

                            </div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                            <button className="bg-purple-300 rounded-lg p-2 pl-12 pr-12 text-white hover:bg-purple-400 shadow-lg" type="submit">Log In</button> 
                        
                            <div className="flex p-2 font-semibold items-center text-white">
                              <p className="pr-2 text-purple-400" >Forgot Password?</p>
                              <button className=" text-purple-600" onClick={handleRecover}>Recover</button>
                            </div>

                        </div>

                      </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Password;
