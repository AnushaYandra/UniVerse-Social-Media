import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import optGenerator from 'otp-generator';

/** middleware for verify user */
export async function verifyUser(req, res, next){
    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if(!exist) return res.status(404).send({ error : "Can't find User!"});
        
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}



/* POST: http://localhost:8080/api/register */
export async function register(req, res) {
    try {
        const { username, password, profileImg, email, college, gender } = req.body;

        // Check if username already exists
        const existingUsername = await UserModel.findOne({ username });
        if (existingUsername) {
            return res.status(400).send({ error: "Please use a unique username" });
        }

        // Check if email already exists
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).send({ error: "Please use a unique email" });
        }

        // Other validations (e.g., email domain check) can go here
        

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new UserModel({
            username,
            password: hashedPassword,
            profileImg: profileImg || '',
            email,
            gender,
            college
        });

        // Save user to database
        await newUser.save();

        return res.status(201).send({ msg: "User registered successfully" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}



/* POST: http://localhost:8080/api/login  */
export async function login(req, res){
    
    const {username, password} = req.body;
    try{

        UserModel.findOne({username})
        .then(user => {
            bcrypt.compare(password, user.password)
            .then(passwordCheck => {
                if(!passwordCheck) return res.status(400).send({error: "Don't have Password"});

                //Create jwt token
                const token = jwt.sign({
                    userId: user._id,
                    username : user.username
                }, ENV.JWT_SECRET, {expiresIn : "24h"});

                return res.status(200).send({
                    msg: "Login Successful",
                    username: user.username,
                    token
                });

            })
            .catch(error => {
                return res.status(400).send({error: "Password does not match"});
            })
        })
        .catch(error => {
            return res.status(404).send({error: "username not found"});
        })

    }catch (error){
        return res.status(500).send({error});
    }
}



/* GET: http://localhost:8080/api/getUser  */
export async function getUser(req, res) {
    const { username } = req.params;

    try {
        if (!username) {
            return res.status(400).send({ error: "Invalid Username" });
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        // Remove sensitive data (e.g., password) before sending the response
        const { password, ...userData } = user.toJSON();

        return res.status(200).send(userData);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}



/* PUT: http://localhost:8080/api/updateUser  */
export async function updateUser(req, res) {
    try {
        //const id = req.query.id;
        const {userId} = req.user;

        if (!userId) {
            return res.status(400).send({ error: "User ID is required" });
        }

        const body = req.body;

        const updatedUser = await UserModel.updateOne({ _id: userId }, body);

        if (updatedUser.nModified === 0) {
            return res.status(404).send({ error: "User not found or no changes applied" });
        }

        return res.status(200).send({ msg: "User record updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}



/* GET: http://localhost:8080/api/generateOTP  */
export async function generateOTP(req, res){
    req.app.locals.OTP = await optGenerator.generate(6, {lowerCaseAlphabets:false, upperCaseAlphabets:false, specialChars: false});
    res.status(201).send({code: req.app.locals.OTP})
}



/* GET: http://localhost:8080/api/verifyOTP  */
export async function verifyOTP(req, res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successsfully!'})
    }
    return res.status(400).send({ error: "Invalid OTP"});
}



/* GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res){
    if(req.app.locals.resetSession){
        return res.status(201).send({flag: req.app.locals.resetSession});
    }
    return res.status(440).send({error: "Session expired"})
}



/* PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {

    if(!req.app.locals.resetSession) return res.status(404).send({error : "Session expired!"});

    try {
        if (!req.app.locals.resetSession) {
            return res.status(404).send({ error: "Session expired!" });
        }

        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).send({ error: "Username not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.updateOne({ username: user.username }, { password: hashedPassword });

        req.app.locals.resetSession = false; // Reset session
        return res.status(201).send({ msg: "Password reset successfully" });

    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
}