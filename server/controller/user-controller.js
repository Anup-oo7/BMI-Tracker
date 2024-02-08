import User from "../model/user.js";
import bcrypt from 'bcrypt'
import Cookies from "cookies";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import VerificationToken from '../model/token.js';
import Token from '../model/login_token.js'
import { generateOtp, mailTransport, generateEmailTemplate, plainEmailTemplate} from "../utils/mail.js";


dotenv.config()

///////////////////////////////////////// SIGNUP ////////////////////////////

 export const signupUser = async (request, response)=>{
    try{

      const salt = await bcrypt.genSalt(10)
      const securePassword  = await bcrypt.hash(request.body.password, salt)
      const newUser = new User({
                    name: request.body.name,
                    email: request.body.email, 
                    password: securePassword
                  })

           const OTP = generateOtp();
           const verificationToken= new VerificationToken({
            owner: newUser._id,
            token:OTP
           })  
         
      await verificationToken.save()
      await newUser.save()

      mailTransport().sendMail({
         from: "Verification_email1@gmail.com",
         to: newUser.email,
         subject: 'verify your email account',
         html: generateEmailTemplate(OTP)
      })
      
      
       
    

       return response.status(200).json({_id:newUser.id, msg: 'signup successful'})
    } catch(error){
        console.error(error)
        return response.status(500).json({msg: 'Error while signup'})
    }

   

}




/////////////////////////////////// VERIFY E-MAIL THROUGH OTP ////////////////////

export const verifyEmail = async (request, response) => {
   const { userId, otp } = request.body;
 console.log(userId)
 console.log(otp)
   if (!userId || !otp.trim()) {
     return response.status(400).json({ success: false, message: 'Invalid data provided for verification' });
   }
 
   const user = await User.findById(userId);
 
   if (!user) {
    
     return response.status(404).json({ success: false, message: 'Sorry, user not found' });
   }
 
   if (user.verified) {
     return response.status(400).json({ success: false, message: 'Account already verified' });
   }
 
   const token = await VerificationToken.findOne({ owner: user._id });
 
   if (!token) {
     return response.status(404).json({ success: false, message: 'Verification token not found for the user' });
   }
 
   const isMatched = await token.compareToken(otp);
 
   if (!isMatched) {
     return response.status(400).json({ success: false, message: 'Invalid or expired verification token' });
   }
 
   user.verified = true;
   await VerificationToken.findByIdAndDelete(token._id);
   await user.save();
 
   mailTransport().sendMail({
     from: 'emailverification@Email.com',
     to: user.email,
     subject: 'Welcome to BMI Tracker',
     html: plainEmailTemplate('Email verified successfully', 'Thanks for connecting')
   });
 
   response.json({
     success: true,
     message: 'Email address verified',
     user: { name: user.name, email: user.email, id: user._id }
   });
 };




 ////////////////////////////////////////// LOGIN //////////////////////////
export const loginUser = async(request, response)=> {
    let user = await User.findOne({email: request.body.email})
   if (!user){
    
    return response.status(400).json({msg: 'E-mail does not match', user:{name: request.body.name,
      email: request.body.email }})
   }

   try{
         let match = await bcrypt.compare(request.body.password, user.password)
         if(match){
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY,{expiresIn: '15m'} )
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)
           
            const newToken = new Token({token:refreshToken})
            await newToken.save();

           var keys =['Token']
           var cookies = new Cookies(request, response,{keys:keys})
           cookies.set('jwt-token', refreshToken, {
            expires: new Date(Date.now() + 900000),
            httpOnly:false
           })

           /*response.cookie('jwtToken', refreshToken,{
            expires: new Date(Date.now() + 900000),
            httpOnly: false
           })*/
           
            return response.status(200.).json({accessToken:accessToken, refreshToken:refreshToken, name:user.name, email:user.email})

         }else {
            response.status(400).json({msg: 'password does not match'})
         }
   }catch(error){
    return response.status(500).json({msg: 'Error while login'})
   }
}



   
export const useAuthcookies = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    
    console.log('my token '+ token)
    if (!token) {

      req.authenticated = false;
      return res.status(401).send("Unauthorized User");
    }

    const verifyToken = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
    if (!verifyToken) {
      // If token verification fails, send an unauthorized response
      req.authenticated = false;
      return res.status(401).send("Unauthorized User");
    }

    // Find a user in LoggedInUserDetails with the matching JWT token
    const loggedInUser = await Token.findOne({
      
      token: token
      
    });
    console.log(loggedInUser )

    if (!loggedInUser) {
      // If no matching user is found, send an unauthorized response
      req.authenticated = false;
      return res.status(401).send("Unauthorized User");
    }

  
    req.authenticated = true;
    req.rootUser = await User.findOne({ id: User._id});
    console.log(req.rootUser)
    req.userID = req.rootUser._id;
    console.log(req.userID)
    req.token = token;
    console.log(req.token)

    next(); 
  } catch (error) {
   
    req.authenticated = false;
    res.status(401).send("Unauthorized User");
    console.error("Authentication Error:", error);
}
};


   
