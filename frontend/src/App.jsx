import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
export const serverUrl = 'https://aiexamnotesgenerate-back.onrender.com'
import { useEffect } from 'react'
import getCurrentUser from './services/api'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Note from './pages/Note'
import History from './pages/History'
import Pricing from './pages/pricing'
import NoteDetail from './pages/NoteDetail'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailed from './pages/PaymentFailed'

const App = () => {
  const dispatch=useDispatch()

  useEffect(()=>{
    getCurrentUser(dispatch);
  },[dispatch])

  const {userData}=useSelector((state)=>state.user)

  return (
    <>
      <Routes>
        <Route path='/' element={userData?<Home />:<Navigate to="/auth" replace/>} />
        <Route path='/auth' element={userData ? <Navigate to="/" replace/>:<Auth/>}/>
                <Route path='/history' element={userData?<History/>:<Navigate to="/auth" replace/>} />
              <Route path='/note' element={userData?<Note/>:<Navigate to="/auth" replace/>} />
            <Route path='/pricing' element={userData?<Pricing/>:<Navigate to="/auth" replace/>} />
   <Route path="/note/:id" element={userData?<NoteDetail/>:<Navigate to="/auth" replace/>} />
<Route path='/payment-success' element={<PaymentSuccess />} />
<Route path='/payment-failed' element={<PaymentFailed />} />
      </Routes>
       <Toaster />
    </>
  )
}

export default App
