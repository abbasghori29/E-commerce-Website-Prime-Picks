import React from 'react'
import Layout from '../components/layout/layout'
import { NavLink, Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Layout title={"Go Back-Page Not Found!"}>
      <div className="container errorPage d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle flex-column">
        <h1 className='display-1 fw-bold'>404</h1>
        <p className='fs-1 text-center'>Oops ! Page Not Found</p>
      <Link to="/" className='p-3'>Go Back</Link>

      </div>
    </Layout>
  )
}

export default PageNotFound