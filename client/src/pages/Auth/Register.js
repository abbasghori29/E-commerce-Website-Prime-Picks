import { React, useState } from 'react'
import Layout from "./../../components/layout/layout"
// import toast from 'react-hot-toast';
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import img1 from "../../../src/cart.jpg"
const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [answer, setAnswer] = useState("")


  const navigate = useNavigate()
  //form function

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("api/v1/auth/register", { name, email, password, phone, address, answer });// ye client ki package.json file sy gaya
      if (res && res.data.success) { // ye res.data wo data ha jo humny controller ma pass krwaya ha server ma
        toast.success(res.data.message)
        navigate('/login')
      }
      else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout title={"Register-Prime Picks"}>

      <div className="register ">

        <form onSubmit={handleSubmit} className='form p-5 ' >
          <h1 className='text-center mb-4 text-decoration-underline'>Register User</h1>

          <div className="mb-3">

            <input type="text" className="form-control" id="exampleInputName1" aria-describedby="text" placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Your E-mail' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="tel" className="form-control" id="exampleInputNumber1" aria-describedby="number" placeholder='Enter Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" id="exampleInputAddress1" aria-describedby="text" placeholder='Enter Address' value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" id="exampleInputAnswer1" aria-describedby="text" placeholder='Fav. Movie Name' value={answer} onChange={(e) => setAnswer(e.target.value)} required />
          </div>
          <div className='col d-flex justify-content-center'>
            <button type="submit" className="btn btn-warning w-100">Submit</button>
          </div>
        </form>

      </div>


    </Layout>
  )

}

export default Register