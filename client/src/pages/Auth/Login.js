import {React,useState} from 'react'
import Layout from "./../../components/layout/layout"
// import toast from 'react-hot-toast';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';


const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
  const [auth,setAuth]= useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    //form function
  
    const handleSubmit= async(e)=>{
      e.preventDefault()
      try {
        const res = await  axios.post("api/v1/auth/login",{email,password,});// ye client ki package.json file sy gaya
        if(res && res.data.success){ // ye res.data wo data ha jo humny controller ma pass krwaya ha server ma
          toast.success(res.data.message)
          setAuth({
            ...auth,
            user: res.data.user,
            token : res.data.token,

        })
        localStorage.setItem('auth',JSON.stringify(res.data))// this will store user information on local storage of user so that on refreshing page data dont vansih and ti display it continously we will use useEffect in auth.js
          navigate(location.state||'/') //loaction.state where user was last on the site else it will redirect to homepage
        }
        else{
          toast.error(res.data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }
  return (
      <Layout title={"Login-Prime Picks"}>
    <div className="register ">
    <form onSubmit={handleSubmit} className='p-5 form h-75'>
    <h1 className='text-center mt-5 mb-5 text-decoration-underline'>Login Now!</h1>
  
       <div className="mb-3">
      <input type="email" className="form-control mb-4" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Your E-mail' value={email} onChange={(e)=>setEmail(e.target.value)} required />
    </div>
    <div className="mb-3">
      <input type="password" className="form-control mb-4" id="exampleInputPassword1" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
    </div>
    <div className="button d-flex justify-content-center flex-column">
    <button type="button" className="btn btn-warning w-100 mb-2"  onClick={() => {navigate('/forgot-password');}}>Forgot password</button>
    <button type="submit" className="btn btn-warning w-100">Login</button>
    </div>
  </form>
  
          </div>
          
        
      </Layout>
  )
}

export default Login