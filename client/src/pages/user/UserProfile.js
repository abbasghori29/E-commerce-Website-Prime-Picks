import React from 'react'
import Layout from '../../components/layout/layout'
import { useAuth } from '../../context/auth'
import UserMenu from '../../components/layout/UserMenu'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
const UserProfile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data to set fields on form
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", { name, email, password, phone, address, });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });

        // saving data in browser local storage
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"User-Profile"}>
      <div className="container text-center">
        <div className="row">
          <div class="col m-3 p-3">
            <h1>User Panel</h1>
            <UserMenu />
          </div>
          <div className="col m-3 p-3 ">
            <div className="card text-start p-3">
              <div className="register ">

                <form onSubmit={handleSubmit} className='form p-5 ' >
                  <h1 className='text-center mb-4 text-decoration-underline'>User Profile</h1>

                  <div className="mb-3">

                    <input type="text" className="form-control" id="exampleInputName1" aria-describedby="text" placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="mb-3 " >
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Your E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="tel" className="form-control" id="exampleInputNumber1" aria-describedby="number" placeholder='Enter Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" id="exampleInputAddress1" aria-describedby="text" placeholder='Enter Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>

                  <div className='col d-flex justify-content-center'>
                    <button type="submit" className="btn btn-warning w-100">Upadte</button>
                  </div>
                </form>

              </div>


            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default UserProfile