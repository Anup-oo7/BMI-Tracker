import { TextField, styled, Typography} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useState, useContext} from 'react'
import { API } from '../../service/api';
import { DataContext } from '../context/DataProvider';
import { useNavigate } from 'react-router-dom';
import './verification.css'
//import Cookies from 'js-cookie'
import bmilogin from '../images/bmilogin.jpg'




const Image = styled('img')({
    width: 260,
    display: 'flex',
    margin: 'auto'
})

const InputField = styled(TextField)`
width:20em;
margin-bottom: 15px;`

// const LoginButton =styled(Button)`
// text-transform: none;
// background: #FB641B;
// color: #fff;
// width:20em;
// height: 48px;
// border-radius: 2px;
// `


// const SignupButton = styled(Button)`
//     text-transform: none;
//     background: #FB641B;
//     color: #fff;
//     height: 48px;
//     border-radius: 2px;
//     box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
//     width:20em;
//     margin:20px;
// `;
const Error = styled(Typography)`
font-size: 15px;
color: #ff6161;
line-height: 0;
margin-top: 10px;
margin-bottom: 10px;
margin-left: -30px;
font-weight: 600;
width: 20em`


const Text = styled(Typography)`
    color:#7a7296 ;
    font-size: 20px;
   
`;
const signupInitialValues = {
    name: '',
    email: '',
    password: ''
};
const loginInitialvalues={
  email: '',
  password: ''
}


const Login=()=>{
    
 

    const imageUrl = 'https://www.dharmishi.com/img/vectors/health-and-fitness.png'

    const [account, toggleAcount] =useState('login')
    const [signup, setSignup] = useState(signupInitialValues);
    const [showOTPverification, setShowOTPverification] = useState(false)
    const [otp, setOtp] = useState('')
    const [error, setError]= useState('')
    const [login, setLogin] = useState(loginInitialvalues)
    const [userId, setUserId] = useState('')
  

    const {setAccount} = useContext(DataContext)
    const navigate = useNavigate()

    ////////////////////////////////// TOGGLE BETWEEN LOGIN/SIGNUP//////////////
    
    const toggleSignup =()=>{
        account === 'signup'? toggleAcount('login'):toggleAcount('signup')
        setError('')
    }

    ///////////////////////////// E-MAIL FORMAT VALIDATION ////////////////////
    
    function isValidEmail(email){
      const emailPattern= /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      
      const gmailPattern =/@gmail\.com$/i;
      
      return emailPattern.test(email) && gmailPattern.test(email);
    }


    ///////////////////////////////////        SIGNUP           ///////////////////
    const onInputChange=(e)=>{

        setSignup({ ...signup, [e.target.name]: e.target.value });
    }
    
    

    const signupUser = async()=>{
      try{

      if(!signup.name||!signup.email||!signup.password){
        toast.error('Please fill details to proceed', {theme:'colored'})
        return
      } else if((signup.name.length<4) === true){
        toast.error('name too short', {theme:'colored'})
        return
      }else if(!isValidEmail(signup.email)){
        toast.error('Please provide valid email', {theme:'colored'})
        return
      }
      else if((signup.password.length<4) === true){
        toast.error('password too short',  {theme:'colored'})
        return
      }
     
        
      let response = await API.userSignup(signup);
      if(response.isSuccess){
          setError('')
          console.log(response)
        setUserId(response.data._id)
        
         setShowOTPverification(true)

        
      }else{
        setError('something went wrong! please try again')
      }
    }catch(error){
      setError(` signup unsuccessfull. Please try again.`)
    }
    }
///////////////////////////////////        OTP VERIFICATION           ///////////////////

    
    const verificationEmail = async () => {
      try {
        let response = await API.verifyEmail({userId,otp});
        console.log(response)
       
        if (response.isSuccess) {
          setShowOTPverification(false);
          setError('Signup successful')
          toggleAcount('login')
         
        } else {
          alert("something went wrong! please try again", );
        }
      } catch (error) {
        toast.error(`Please enter valid otp`,{theme:"colored"}, error);
      }
    };

    ///////////////////////////////////     LOGIN        ///////////////////

    const onValueChange=(e)=>{
      setLogin({...login, [e.target.name]:e.target.value})
      
    }

    const loginUser= async()=>{
      try{
        if(!login.email||!login.password){
          toast.error('Please fill details to login', {theme:'colored'})
          setError('')
        }
     let response = await API.userLogin(login)
     if(response.isSuccess){
      setError('')
      setLogin(loginInitialvalues)

      localStorage.setItem('accessToken', `${response.data.accessToken}`,)
      localStorage.setItem('refreshToken', `${response.data.refreshToken}`,)

      // Cookies.set('accessToken', `${response.data.accessToken}`,{expires:7});
      // Cookies.set('refreshToken', `${response.data.refreshToken}`,{expires:15});

      
      setAccount({email:response.data.email, name:response.data.name})
      navigate('/home')

     }else{
      
      setError('something went wrong! please try again')
     }
    }catch(error){
      setError(`Login unsuccessfull. Please try again..`)
    }
    }

   
   

    return(
      <>
     
      <div className="container">

      <div className='row'>
      <div className='col-md-12 col-sm-12 col-lg-7' >
        <img src={bmilogin} alt="" width={'100%'} height={'auto'} />
      </div>


      <div className='col-md-12 col-sm-12 col-lg-5 loginTemp' >
     
          {/****************************** * OTP VERIFICATION*************/}
          {showOTPverification ? (
            <div className="otp-overlay">
             
              <div className="otp-popup">
                <input
                
                value={otp}
                type="text"
                onChange={(e) => setOtp(e.target.value)}
                />
                <p>Please enter OTP sent on Email</p>
                
                <button  onClick={() => verificationEmail()}>
                  Verify
                </button>
                <button className="cancel" onClick={() =>navigate('/login')}>
                  cancel
                </button>
              
              </div>
            </div>
            
            )
          
            /****************************** * LOGIN INPUTS  *************/
            : account === 'login' ? ( 
              <div className='login'>
                 <Image src={imageUrl} alt="login"  />
              <h4 style={{ color: '#1976d2' }}>WELCOME BACK</h4>
              <InputField
                variant="standard"
                value={login.email}
                onChange={(e) => onValueChange(e)}
                name="email"
                label="Please Enter Your e-mail"
              />
              <InputField
                variant="standard"
                value={login.password}
                onChange={(e) => onValueChange(e)}
                name="password"
                type="password"
                label="Please Enter Password"
              />
              {error && <Error>{error}</Error>}
              <button className='loginBtn' variant="contained" onClick={(e) => loginUser()}>
                Login
              </button>
              <Text style={{ textAlign: 'center' }}>OR</Text>
              <button className='signupBtn' variant="contained" onClick={() => toggleSignup()}>
                Create Account
              </button>
              </div>
          ) :
           /****************************** * SIGNUP INPUTS  *************/
           (
           <div className='signup'>
              <Image src={imageUrl} alt="login"  />
              <h4 style={{ color: '#1976d2' }}>Hello! Welcome to BMI Tracker</h4>
              <InputField
                variant="standard"
                value={signup.name}
                onChange={(e) => onInputChange(e)}
                type="text"
                name="name"
                label="Please Enter Your name"
              />
              <InputField
                variant="standard"
                value={signup.email}
                onChange={(e) => onInputChange(e)}
                type="email"
                name="email"
                label="Please Enter Your e-mail"
              />
              <InputField
                variant="standard"
                value={signup.password}
                onChange={(e) => onInputChange(e)}
                type="password"
                name="password"
                label="Create a Password"
              />
              {error && <Error>{error}</Error>}
              <button className='signupBtn' variant="contained" onClick={() => signupUser()}>
                Sign up
              </button>
              <Text style={{ textAlign: 'center' }}>OR</Text>
              <button className='signupBtn' variant="contained" onClick={() => toggleSignup()}>
                Already have an account
              </button>
           
          </div>
          )}
      
      </div>
    </div>
      <ToastContainer/>
      

     

     <div>
      
      </div>
      </div>
      </>
    )
}
export default Login;