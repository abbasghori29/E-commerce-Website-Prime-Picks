import {React,useState} from 'react'
import Layout from '../../components/layout/layout'
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate,useLocation } from 'react-router-dom';
const ForgotPassword = () => {
  const [email,setEmail]=useState("")
  const [newPassword,setNewPassword]=useState("")
  const [answer,setAnswer]=useState("")
  const navigate = useNavigate()
  //form function

  const handleSubmit= async(e)=>{
    e.preventDefault()
    try {
      const res = await  axios.post("api/v1/auth/forgot-password",{email,newPassword,answer});// ye client ki package.json file sy gaya
      if(res && res.data.success){ // ye res.data wo data ha jo humny controller ma pass krwaya ha server ma
        toast.success(res.data.message)
        navigate('/login') //loaction.state where user was last on the site else it will redirect to homepage
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout title={"Forgot-Password"}>
         <div className="register ">
    <form onSubmit={handleSubmit} className='p-5 form h-75'>
    <h1 className='text-center mt-5 mb-5 text-decoration-underline'>Reset Password</h1>
  
       <div className="mb-3">
      <input type="email" className="form-control mb-4" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Your E-mail' value={email} onChange={(e)=>setEmail(e.target.value)} required />
    </div>
    <div className="mb-3">
      <input type="password" className="form-control mb-4" id="exampleInputPassword1" placeholder='Enter New Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required/>
    </div>
    <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputAnswer1" aria-describedby="text" placeholder='Fav. Movie Name'value={answer} onChange={(e)=>setAnswer(e.target.value)} required/>
  </div>
    <div className="button d-flex justify-content-center flex-column">
    <button type="submit" className="btn btn-warning w-100">Reset</button>
    </div>
  </form>
  
          </div>
          
        
    </Layout>
  )
}

export default ForgotPassword