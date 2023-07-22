import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from 'react-helmet';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';



const Layout = ({ children, description, keywords, author, title }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />
      <main style={{ minHeight: '84vh' }}>
      <Toaster />
        {children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: 'PRIME PICKS - Shop Now',
  description: 'MERN Stack Project',
  keywords: 'mern, shop, ecommerce, pick, new, price',
  author: 'PRIME PICKS',
};

export default Layout;
