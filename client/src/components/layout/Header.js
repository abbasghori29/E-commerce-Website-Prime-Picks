import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { NavLink, Link } from 'react-router-dom';
import { BiCartAlt } from "react-icons/bi";
import { useAuth } from '../../context/auth';
import { toast, ToastBar } from 'react-hot-toast';

const Header = () => {
const handleLogout =()=>{
  setAuth({
    ...auth,
    user:null,
    token:"",
  })

  localStorage.removeItem("auth");
  toast.success("Logout Succesfully")
}
  const [auth,setAuth]=useAuth()
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar ">
    <Container>
    <BiCartAlt size={54} />

    <Link to="/" className="navbar-brand fs-2"> Prime Picks</Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto fw-bold">
       
              <NavLink exact to="/" className="nav-link" activeClassName="active"> Home</NavLink>
           
              <NavLink to="/category" className="nav-link" activeClassName="active"> Category </NavLink>

           <>{!auth.user ? (<><NavLink to="/register" className="nav-link" activeClassName="active"> Register </NavLink>
            
            <NavLink to="/login" className="nav-link" activeClassName="active"> Login</NavLink></>) : (<>

              <NavDropdown title={auth?.user?.name} id="basic-nav-dropdown" activeClassName="active">
                
{/* down below we are checking if user role is 1 then open admin dashboard else open user dashboard */}
              <NavLink to={`/dashboard/${auth?.user?.role ===1? 'admin':'user'}`} className="nav-link dropdownItem" activeClassName="active"> Dashboard</NavLink>
          
              <NavLink onClick={handleLogout} to="/login" className="nav-link dropdownItem" activeClassName="active"> Logout</NavLink>

            </NavDropdown>
              
            </>) }</>
              
            
              <NavLink to="/cart" className="nav-link" activeClassName="active">   Cart (0)  </NavLink>     
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  );
};

export default Header;
