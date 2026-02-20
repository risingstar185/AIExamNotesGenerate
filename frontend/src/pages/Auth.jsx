import React from 'react'
import {motion } from 'framer-motion'
import {FcGoogle} from 'react-icons/fc'
import {auth,provider} from '../utils/Firebase.jsx'
import { signInWithPopup } from "firebase/auth";
import axios from 'axios'
import {serverUrl} from '../App.jsx'
import { useDispatch } from 'react-redux';
import { setUserData } from "../redux/userSlice";
import toast from "react-hot-toast";


const Auth = () => {
  const dispatch=useDispatch();
const HandleGoogleAuth = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
    const User = response.user;
    const name=User.displayName;
    const email=User.email;
    

    const result=await axios.post(serverUrl +"/api/auth/google",{name,email},{withCredentials:true});
   dispatch(setUserData(result.data));
   console.log(result.data);
   toast.success("Login successful!");

  } catch (error) {
    console.log(error); // IMPORTANT
       toast.error("Login Unsuccessful!");
  }
};

  return (
    <div className='min-h-screen overflow-hidden bg-white text-black px-8'>
<motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="max-w-7xl mx-auto mt-8 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-8 py-6" >
 <h1 className='text-2xl font-bold bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent'>
  ExamNotes AI
 </h1>
 <p className='text-sm text-gray-300 mt-1'>AI Powered exam-oriented notes & Revision </p>
      </motion.div>
    <main className='max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
{/*left side */}
<motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
       ><h1 className='text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-br from-black/60 to-black/90
       bg-clip-text text-transparent'>
        Unlock Smart <br /> AI Notes
       </h1>
       <motion.button onClick={HandleGoogleAuth} className='mt-10 px-10 py-3 rounded-xl flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-colors duration-300 cursor-pointer'>
<FcGoogle size={25} /> Continue With Google
       </motion.button>
       <p className='mt-6 max-w-xl text-lg bg-gradient-to-br from-gray-700 via gray-500/80 to-gray-700 bg-clip-text text-transparent'>
        You get <span className='font-semibold'>50 Free credits</span> to create exam notes,charts ,graph, and download  clean PDFs- instantly using AI.
       </p>
       <p className='mt-4 text-sm text-gray-500'>Start with 50 FREE credits ,Upgrades anytime for more credits ,Instant access</p>
      </motion.div>

      {/*right side */}
       
       <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
         <Feature icon="🎁" title="Free Credits" desc="Get 50 free credits to create AI-powered exam notes and resources."/>
         <Feature icon="⚡" title="Instant Generation" desc="Create notes, charts, and PDFs instantly with AI assistance."/>
         <Feature icon="📈" title="Upgrade Anytime" desc="Easily upgrade for more credits and enhanced features whenever you need."/>
         <Feature icon="🔒" title="Secure Access" desc="Enjoy secure and instant access to your AI-generated notes and resources."/>
        <Feature icon="⬇️"  title="Free download" desc=" Download clean ,printable PDFs instantly"/>

       </div>
    </main>
    </div>
  )
}
function Feature({icon,title,desc}){
  return(
    <motion.div whileHover={{y:12,rotateX:0,rotateY:-8,scale1:1.05}}
    transition={{type:"spring",stiffness:200,damping:18}}
    className='relative rounded-2xl p-6 bg-gradient-to-br from-black/90 via-balck/80 to-black/90 border border-white/10 text-white' style={{transformStyle:'preserve-3d'}}>
      <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none'/>
<div className='relative z-10 ' style={{transform:"translateZ(30px)"}}>
  <div className='text-4xl mb-3'>{icon}</div>
  <h3 className='text-lg font-semibold mb-2'>{title}</h3>
  <p className='text-gray-300 text-sm leading-relaxed'>{desc}</p>

</div>
     
    </motion.div>

  )
}
export default Auth
