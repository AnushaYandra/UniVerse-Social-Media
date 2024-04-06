import { useRouter } from "next/router";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import "react-phone-input-2/lib/style.css"
import { useFormik } from "formik";
import { useState } from "react";
import convertToBase from '../helper/convert';
import { registerUser } from '../helper/helper.js';
import {registerValidation} from '../helper/validate.js';
import {useAuthStore} from '../store/store.js';

const Register = () => {

    const router = useRouter();
    const [file, setFile] = useState('');
    const [email, setEmail] = useState('');

    const setUsername = useAuthStore(state => state.setUsername);
    const username = useAuthStore(state=> state.auth.username)

    const formik = useFormik({
        initialValues : {
            username: '',
            email: '',
            password: '',
            college: 'NIT Allahabad',
            gender: '',
        },
        validate: registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {
            values = await Object.assign(values, {profileImg :file || ''})
            setUsername(values.username)
            //console.log(values)
            let registerPromise = registerUser(values)
            toast.promise(registerPromise, {
                loading: 'Creating...',
                success: <b>Registered Successfully (˶ᵔ ᵕ ᵔ˶) ♡ ♡</b>,
                error: <b>Could not register</b>
            });
           registerPromise.then(function(){ router.push('/home')})
        }
    })

    
    const onUpload = async e => {
        const base64= await convertToBase(e.target.files[0]);
        setFile(base64);
    }
      
    const handleButtonClick = () => {
        router.push('/');
      };

    const handleAccountClick = () => {
        router.push('/username');
    };
    


    return (
        <div>
            <Toaster />
            <div className="bg-cover bg-center h-screen items-center flex flex-col" style={{ backgroundImage: 'url("https://images.hdqwalls.com/download/better-without-you-jl-1920x1080.jpg")' }}>
               
               
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className=" h-screen flex flex-col items-center justify-center">
                      <div className="flex flex-col bg-transparent p-8 items-center rounded-lg shadow-xl">
                        <div className="font-bold pb-1 text-white text-2xl flex flex-col items-center">
                            <h1>UniVerse Registration 𐙚</h1>
                        </div>

                        <div >
                            <div className="flex flex-col items-center" >
                                
                                <div className="mb-2 flex flex-col justify-content items-center ">
                                   <img src= {file ||"../images/a.jpg"} className="h-28 mr-2 rounded-full"/>
                                   <input onChange={onUpload} type="file" id='profile' name="profileImg"
                                   className= "flex-1 mt-2 file:p-2 file:px-4 file:mx-2 file:rounded-full text-white cursor-pointer hover:file:bg-purple-400 file:bg-purple-300 file:border-0 file:text-white"></input>
                                </div>
                                
                                <div >
                                    <div className="flex bg-purple-300 items-center p-1 border-2 rounded-lg mb-2">
                                        <input {...formik.getFieldProps('email')} placeholder="Enter Email" type="email" required autoComplete="new-email"
                                        className="outline-none bg-transparent placeholder-purple-400  text-white w-60"></input>
                                        <MdEmail color="white"/>
                                    </div>
                                </div>

                                <div >
                                    <div className="flex  bg-purple-300 items-center p-1 border-2 rounded-lg mb-2">
                                        <input {...formik.getFieldProps('password')} placeholder="Enter Password" required autoComplete="new-password" 
                                        className="w-60 outline-none bg-transparent placeholder-purple-400 text-white" type="password"></input>
                                        <FaLock color="white"/>
                                    </div>
                                </div>

                                <div >
                                    <div className="flex  bg-purple-300 items-center p-1 border-2 rounded-lg mb-2">
                                        <input {...formik.getFieldProps('username')} placeholder="Pick a Username" required 
                                        className="w-60 outline-none bg-transparent placeholder-purple-400 text-white"></input>
                                        <FaUserAlt color="white"/>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex space-x-1 bg-purple-300 items-center p-1 border-2 rounded-lg mb-2 text-white">
                                        <input {...formik.getFieldProps('gender')} type="radio" name="gender" value="male" className=""></input>
                                        <label  className="pr-3 bg">Male</label>
                                        <input {...formik.getFieldProps('gender')} type="radio" name="gender" value="female"></input>
                                        <label>Female</label>
                                    </div>
                                </div>

                                <div className="">
                                    <div >
                                        <select {...formik.getFieldProps('college')} required 
                                        className="bg-purple-300 rounded-lg text-white p-1 border-2 outline-none"
                                        onChange={(e) => {
                                            formik.setFieldValue('college', e.target.value); // Update Formik state with selected value
                                        }} >

                                            <option value="NIT Allahabad">NIT Allahabad</option>
                                            <option value="NIT Hamirpur">NIT Hamirpur</option>
                                            <option value="NIT Delhi">NIT Delhi</option>
                                            <option value="NIT Trichy">NIT Trichy</option>
                                            <option value="NIT Rourkela">NIT Rourkela</option>
                                            <option value="NIT Surathkal">NIT Surathkal</option>
                                            <option value="NIT Kurukshetra">NIT Kurukshetra</option>
                                            <option value="NIT Durgapur">NIT Durgapur</option>
                                            
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>
                        </div>
                        
                        <div className="m-3 mt-7 space-x-3">
                            <button className="bg-purple-300 rounded-lg p-2 text-white hover:bg-purple-400 shadow-lg " type="submit">Register</button> 
                            <button className="bg-purple-300 rounded-lg p-2 text-white hover:bg-purple-400 shadow-lg" onClick={handleButtonClick}>Close</button>
                        </div>

                        <div className="flex items-center space-x-2">
                          <p className="text-white text-lg">Have an account already? </p>
                          <button className=" font-semibold text-purple-700 text-lg"
                          onClick={handleAccountClick}> Login ♡</button>
                        </div>

                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default Register;
