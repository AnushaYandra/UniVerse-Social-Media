import toast, { Toaster } from 'react-hot-toast';
import {authenticate} from './helper'


/* Validate login page password */
export async function passwordValidate(values){
    const errors= passwordVerify({}, values)

    return errors;
}

/* Validate login page username */
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    if(values.username){
        // check user exist or not
        const { status } = await authenticate(values.username);
        //console.log(status)
        
        if(status !== 200){
            errors.exist = toast.error('User does not exist...!')
        }
    }
    return errors;
}

/* Validate Password */
function passwordVerify(error= {}, values){
    if(!values.password){
        error.password= toast('password required', {
            icon: '(ᴗ_ ᴗ。)',
          });
    }else if(values.password.includes("v")){
        error.password= toast('Wrong password', {
            icon: '(ᴗ_ ᴗ。)',
          });
    }else if(values.password.length<4){
        error.password= toast('Password must be more than 4 characters long', {
            icon: '(ᴗ_ ᴗ。)',
          });
    }

    return error;
}


/* Validate Username */
function usernameVerify(error= {}, values){
    if(!values.username){
        error.username= toast('Username required', {
            icon: '(ᴗ_ ᴗ。)',
          });
    }else if(values.username.includes("v")){
        error.username= toast('Invalid username', {
            icon: '(ᴗ_ ᴗ。)',
          });
    }

    return error;
}


/* Validate Reset Password */
export async function resetPasswordVerify(values){
    const errors= passwordVerify({}, values)

    if(values.password!==values.confirm_password){
        errors.exist= toast('password not match', {
            icon: '(ᴗ_ ᴗ。)',
          });
    }

    return errors;
}

/* Validate Register form */
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}


/* Validate Email */
function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Wrong Email...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}