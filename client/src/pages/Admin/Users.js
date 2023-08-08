import React from 'react'
import Layout from '../../components/layout/layout'
import AdminMenu from '../../components/layout/AdminMenu'
const Users = () => {
  return (
    <Layout title={"All-Users"}>
        <div className="container text-center">
  <div className="row">
    <div class="col m-3 p-3">
      <AdminMenu/>
    </div>
    <div className="col m-3 p-3 ">
      <div className="card text-start p-3">
      <h1>All Users</h1>
      </div>
    </div>
    
  </div>
</div>
    </Layout>
  )
}

export default Users