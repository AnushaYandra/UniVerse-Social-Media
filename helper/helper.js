import axios from 'axios';
import { jwtDecode } from "jwt-decode";
axios.defaults.baseURL = 'http://localhost:8080'

/* Make API request */

/* To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    console.log(token)
    if(!token) return Promise.reject("Cannot find Token");
    const decode = jwtDecode(token);
    //console.log(decode);
    return decode;
}

/* authenticate function */
export async function authenticate(username){
    try {
        const response = await axios.post('/api/authenticate', { username });
        return response;
    } catch (error) {
        console.error("Error during authentication:", error);
        return { error : "Username doesn't exist...!" };
    }
}



/* get user datails */
export async function getUser({ username }){
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}

/* register user function*/
export async function registerUser(credentials){
    try{
        const {data:{ msg }, status }= await axios.post(`/api/register`, credentials)

        let {username, email} = credentials;
        console.log(username, email)

        /* send email */
        if(status === 200){
            await axios.post('/api/registerMail', {username, userEmail: email, text:msg, subject : "UniVerse Registration"})
        }

        return Promise.resolve(msg)

    }catch(error){
        return Promise.reject({error})
    }
}

/* login function*/
export async function verifyPassword({username, password}){
    try{
        if(username){
            const {data} = await axios.post('/api/login', {username, password})
            return Promise.resolve({data});
        }
    }catch(error){
        return Promise.reject({error: "Password does not match"})
    }
}

/* update user profile function*/
export async function updateUser(response){
    try{
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateUser', response, {headers: {"Authorization" : `Bearer ${token}`}});

        return Promise.resolve({data});

    }catch(error){
        return Promise.reject({error: "Could not update profile"})
    }
}

/* generate OTP*/
export async function generateOTP(username){
    try {
        const {data: {code}, status} = await axios.get('/api/generateOTP', {params: {username}})

        if(status === 201){
           let {data: {email}} = await getUser({username});

           let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
           await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }

        return Promise.resolve(code);

    } catch (error) {
        return Promise.reject({error})
    }
}

/* verify OTP*/
export async function verifyOTP({ username, code }){
    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { username, code }})
       return { data, status }

    } catch (error) {
        return Promise.reject(error);
    }
}

/* reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status})

    } catch (error) {
        return Promise.reject({ error })
    }
}