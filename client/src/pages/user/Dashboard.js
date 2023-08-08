import React from 'react'
import Layout from '../../components/layout/layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'
const Dashboard = () => {
  const [auth]=useAuth()
  return (
    <Layout title={"User-Dashboard"}>
    <div className="container text-center">
<div className="row">
<div class="col m-3 p-3">
<h1>User Panel</h1>
  <UserMenu/>
</div>
<div className="col m-3 p-3 ">
<h1>User Details</h1>
  <div className="card text-start p-3">
  <h5>User's Name: {auth?.user?.name}</h5>
  <h5>User's Email: {auth?.user?.email}</h5>
  <h5>User's Contact: {auth?.user?.phone}</h5>
  <h5>User's Address: {auth?.user?.address}</h5>


  </div>
</div>

</div>
</div>
</Layout>
  )
}

export default Dashboard