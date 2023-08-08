import React from 'react'
import Layout from "../../components/layout/layout"
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/auth'
const AdminDashboard = () => {
  const [auth]= useAuth()
  return (
    <Layout title={"Admin-Dashboard"}>
        <div className="container text-center">
  <div className="row">
    <div class="col m-3 p-3">
    <h1>Admin Panel</h1>
      <AdminMenu/>
    </div>
    <div className="col m-3 p-3 ">
    <h1>Admin Details</h1>
      <div className="card text-start p-3">
      <h5>Admin Name: {auth?.user?.name}</h5>
      <h5>Admin Email: {auth?.user?.email}</h5>
      <h5>Admin Contact: {auth?.user?.phone}</h5>

      </div>
    </div>
    
  </div>
</div>
    </Layout>
  )
}

export default AdminDashboard