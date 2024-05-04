import React, { useState } from 'react'
import { logo } from '../assets'
import UserAuthinput from '../components/UserAuthinput'
import { FaEnvelope, FaGithub } from 'react-icons/fa';
import { MdPassword } from 'react-icons/md';
import {AnimatePresence, motion} from 'framer-motion'
import {FcGoogle} from 'react-icons/fc'
import {signINWithGithub, signINWithGoogle } from '../utils/helpers';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase.config';

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [password , setPassword] = useState("second");
  const [alert , setAlert] = useState(false);
  const [alertMsg , setAlertMsg] = useState("")

const[getEmailValidationStatus,setGetEmailValidationStatus] = useState(false);
 const[isLogin , setIsLogin] = useState(false);

 const createNewUser = async () => {
  if(getEmailValidationStatus){
    await createUserWithEmailAndPassword(auth,email,password).then(userCred =>{
      if(userCred){
        console.log(userCred);
      }
    })
    .catch((err) => console.log(err))
  }
 };

 const loginWithEmailPassword = async() =>{
  if(getEmailValidationStatus){
    await signInWithEmailAndPassword(auth , email,password).then((userCred) =>{
      if(userCred){
        console.log(userCred)
      }
    })
    .catch((err) =>{
      console.log(err.message);
      if(err.message.includes("User-not-found")){
        setAlert(true);
        setAlertMsg("Invalid Id : User not found")
      }
     else if(err.message.includes("wrong-password")){
        setAlert(true);
        setAlertMsg("Password MisMatch")
      } 
      else{
        setAlert(true);
        setAlertMsg("Something Wrong Try Again😊")
      } 
      
      setInterval(() =>setAlert(false),4000);
    });
  }
 }


  return (
    <div className=' w-full py-6'>
      <img src={logo} className=' object-contain w-32 opacity-50 h-auto'/>

      <div className=' w-full flex flex-col items-center justify-center py-8'>
        <p className=' py-12 text-2xl text-white '>SignUp With 🖥️ </p>
      </div>

      <div className=' px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8'>


        <UserAuthinput
                label = "Email"
                placeHolder ="Email"
                isPass={false}
                key="Email"
                setStateFunction={setEmail}
                Icon={FaEnvelope}
                setGetEmailValidationStatus = {setGetEmailValidationStatus}
                />
                        <UserAuthinput  
        label = "password"
        placeHolder ="password"
        isPass={true}
        key="Password"
        setStateFunction={setPassword}
        Icon={MdPassword}
      
        />

<AnimatePresence>
  {alert && (   
    <motion.p 
    key = {"AlertMessage"}
    initial = {{opacity :0}}
    animate = {{opacity: 1}}
    exit = {{opacity:0}}
    className =" text-red-600"> {alertMsg}</motion.p>
  )
   }
</AnimatePresence>

 {!isLogin ? <motion.div 
 onClick={createNewUser}
 whileTap={{scale:0.9}} className=' bg-emerald-300  flex items-center justify-center w-96 md:w-96 px-4 py-1 rounded-xl  cursor-pointer hover:bg-emerald-700  '>
              <p className=' text-white text-xl'>SignUp</p>
            </motion.div> : 
      <motion.div
      onClick={loginWithEmailPassword}
      whileTap={{scale:0.9}} className=' bg-emerald-300  flex items-center justify-center w-96 md:w-96 px-4 py-1 rounded-xl  cursor-pointer hover:bg-emerald-700  '>
                <p className=' text-white text-xl'>Login</p>
       </motion.div>
              }

{!isLogin ?
        <p className=' text-sm text-primaryText flex items-center justify-center gap-3'> Already Have an Account !<span className=' text-emerald-500 cursor-pointer'  onClick={() => setIsLogin(!isLogin)}>Login Here</span></p>

:
<p className=' text-sm text-primaryText flex items-center justify-center gap-3'> Doesn't Have an Account !<span className=' text-emerald-500 cursor-pointer' onClick={() => setIsLogin(!isLogin)}>Create Account</span></p>

}

<div className=' flex items-center justify-center gap-12'>
  <div  className=' h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24' ></div>
    <p className=' text-sm text-[rgba(200,200,200,0.2)] ' >OR
    </p>
    <div className=' h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
  
</div>

<motion.div onClick={signINWithGoogle} whileTap={{scale:0.9}} className=' flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-96 py-3 rounded-xl hover:bg-[256,256,256,0.4] cursor-pointer '>
  <FcGoogle className =' text-3xl'/>
  <p  className=' text-white text-xl'> Sign in with google</p>
</motion.div>


<div className=' flex items-center justify-center gap-12'>
  <div  className=' h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24' ></div>
    <p className=' text-sm text-[rgba(200,200,200,0.2)] ' >OR
    </p>
    <div className=' h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
  
</div>
<motion.div onClick={signINWithGithub} whileTap={{scale:0.9}} className=' flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-96 py-3 rounded-xl hover:bg-[256,256,256,0.4] cursor-pointer '>
  <FaGithub className =' text-3xl'/>
  <p className=' text-white text-xl'> Sign in with github</p>
</motion.div>

      </div>
      SignUp
    </div>
  )
}

export default SignUp
