import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import useFetch from '../hooks/fetch.hook.js';
import {useAuthStore} from '../store/store.js';
import {generateOTP, verifyOTP} from '../helper/helper.js';

const Recover = () => {

   const router = useRouter();
   const { username } = useAuthStore(state => state.auth)
   const [OTP, setOTP] = useState<string>();
   const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

   useEffect(()=> {
    generateOTP(username).then((OTP) => {
        console.log(OTP)
        if(OTP) return toast.success('OTP has been sent yo your email!');
        return toast.error('Problem while generating OTP!');
    })
   }, [username]);

   //HANDLE SUBMIT OTP
   async function onSubmit(e){
    e.preventDefault();

    try {
        let { status } = await verifyOTP({ username, code : OTP })
        if(status === 201){
          toast.success('Verify Successfully!')
          return router.push('/reset')
        }  
      } catch (error) {
        return toast.error('Wront OTP! Check email again!')
      }
   }

   //HANDLE RESEND- ETHEREAL EMAIL
   function resendOTP(){
    let sentPromise = generateOTP(username);

    toast.promise(sentPromise ,
      {
        loading: 'Sending...',
        success: <b>OTP has been send to your email!</b>,
        error: <b>Could not Send it!</b>,
      }
    );

    sentPromise.then((OTP) => {
     // console.log(OTP)
    });
    
  }

    return (
        <div>
            <Toaster />
            <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("https://images.hdqwalls.com/download/better-without-you-jl-1920x1080.jpg")'} }>
                <form onSubmit={onSubmit}>
                    <div className=" h-screen flex flex-col items-center justify-center">
                      <div className="flex flex-col bg-transparent p-8 items-center rounded-lg shadow-2xl">

                        <div className="flex flex-col items-center">
                            <h1 className="font-bold text-white text-3xl">Recover 𐙚</h1>
                            <p className="pb-2 text-white text-lg"> Enter OTP to recover Password.</p>
                        </div>

                        <img className="h-36 rounded-lg opacity-75 border-2" src={apiData?.profileImg || "../images/hi.avif"}></img>

                        <div >
                            <div className="mt-4 mb-4">

                                <div >
                                    <div className="flex  bg-purple-300 items-center p-1 border-2 rounded-lg mb-2">
                                        <input onChange={(e) => setOTP(e.target.value) } placeholder="Enter OTP"  required
                                        className="outline-none bg-transparent placeholder-purple-400 text-white w-full lg:w-48 xl:w-40"
                                        type="password"></input>
                                    </div>
                                </div>

                            </div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                            <button className="bg-purple-300 rounded-lg p-2 pl-12 pr-12 text-white hover:bg-purple-400 shadow-lg" type="submit">Submit</button> 
                        </div>

                        <div className="flex p-2 font-semibold items-center text-white">
                          <p className="pr-2 text-purple-400" >Can't get OTP?</p>
                          <button className=" text-purple-600" onClick={resendOTP}>Resend</button>
                        </div>

                      </div>
                    </div>
                </form>

                
            </div>

        </div>
    );
}

export default Recover;
