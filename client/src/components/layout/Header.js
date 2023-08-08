import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { NavLink, Link } from "react-router-dom";
import { BiCartAlt } from "react-icons/bi";
import { PiShoppingCart } from "react-icons/pi"
import { useAuth } from "../../context/auth";
import { toast, ToastBar } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
import { useCart } from "../../context/cartContext";
const Header = () => {
  const [categories, setCategories] = useState([]);
  const [cart] = useCart()
  // geting category to show in category drop down
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  const navigate = useNavigate()
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    toast.success("Logout Succesfully");
  };
  const [auth, setAuth] = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar ">
      <Container>
        <BiCartAlt size={54} />

        <Link to="/" className="navbar-brand fs-2" onClick={() => navigate("/")}>
          {" "}
          Prime Picks
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto fw-bold">
            <NavLink exact to="/" className="nav-link" activeClassName="active">
              {" "}
              Home
            </NavLink>


            <>
              <NavDropdown
                title={"Category"}
                id="basic-nav-dropdown"
                activeClassName="active"
              >

                {categories.map(c => (
                  <NavLink to={`/category/${c.slug}`} className="nav-link dropdownItem ps-3" activeClassName="active" > {c.name} </NavLink>

                ))}

              </NavDropdown>
            </>


            <>
              {!auth.user ? (
                <>
                  <NavLink
                    to="/register"
                    className="nav-link"
                    activeClassName="active"
                  >
                    {" "}
                    Register{" "}
                  </NavLink>

                  <NavLink
                    to="/login"
                    className="nav-link"
                    activeClassName="active"
                  >
                    {" "}
                    Login
                  </NavLink>
                </>
              ) : (
                <>
                  <NavDropdown
                    title={auth?.user?.name}
                    id="basic-nav-dropdown"
                    activeClassName="active"
                  >
                    {/* down below we are checking if user role is 1 then open admin dashboard else open user dashboard */}
                    <NavLink
                      to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                      className="nav-link dropdownItem ps-3"
                      activeClassName="active"
                    >
                      {" "}
                      Dashboard
                    </NavLink>

                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="nav-link dropdownItem ps-3"
                      activeClassName="active"
                    >
                      {" "}
                      Logout
                    </NavLink>
                  </NavDropdown>
                </>
              )}
            </>
            <Space size="small"  >
              <Badge count={cart?.length} showZero >
                <NavLink to="/cart" className="nav-link" activeClassName="active">
                  <PiShoppingCart className="fw-bold fs-2 " />
                </NavLink>
              </Badge>
            </Space>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
