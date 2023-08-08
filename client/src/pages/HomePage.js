import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Checkbox, Radio, Carousel } from "antd";
import { Prices } from "../components/PriceFilter";
import { FaSearch } from "react-icons/fa";
import { useCart } from "../context/cartContext";
import img1 from "../../src/s1.jpg"
import img2 from "../../src/s2.jpg"
import img3 from "../../src/s3.jpg"
import img4 from "../../src/s4.jpg"
import img5 from "../../src/s5.png"
import img6 from "../../src/s6.jpg"
import img7 from "../../src/d1.jpg"


import { useAuth } from "../context/auth";


const HomePage = () => {
  // const [auth, setAuth] = useAuth();---- this was used to display login user info in JSON form on homepage
  const navigate = useNavigate()
  const [cart, setCart] = useCart()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [checked, setChecked] = useState([]); //make an empty array because filter can be done by more than one category
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  //get all cat
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
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Handler for search bar
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase())

  );
  return (
    <Layout title={"Prime Picks-Best Offers"}>
      <Carousel autoplay className="Carousel  shadow" >
        <div>
          <img src={img1} className="img-fluid w-100" alt="" />
        </div>

        <div>
          <img src={img3} className="img-fluid w-100" alt="" />
        </div>
        <div>
          <img src={img4} className="img-fluid w-100" alt="" />
        </div>

        <div>
          <img src={img6} className="img-fluid w-100" alt="" />
        </div>
        <div>
          <img src={img2} className="img-fluid w-100" alt="" />
        </div>
      </Carousel>
      <img src={img7} className="img-fluid w-100 " alt="" />

      <div className="homePage container-fluid pt-5">

        <div className="row ">
          <div className="col-md-3">


            <h4 className="text-center">Filter By Category</h4>
            <div className="ms-4 d-flex flex-column flex-wrap">
              {categories.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* price filter */}
            <hr />
            <h4 className="text-center">Filter By Price</h4>
            <div className="ms-4 d-flex flex-column ">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="ms-4 d-flex flex-column mt-4 me-4">
              <button
                className="btn btn-dark"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h1 className="text-center"> All Products</h1>

            <div className="d-flex flex-wrap "></div>
            <div className="search-bar d-flex justify-content-center align-items-center me-3">
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search products..."
                className="mb-5 mt-3 ms-3 form-control rounded-0"
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className=" mt-3 searchIcon" />
            </div>
            <p className="text-center mb-3">
              {filteredProducts.length} products found.
            </p>
            <div className="row container-fluid p-0 m-0 ">
              {filteredProducts.map((p) => (
                <div
                  key={p._id}
                  className="col-lg-4 col-md-6 col-sm-6 mb-3 text-center "
                >

                  <div className="card rounded-5 shadow hover-effect">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top img-fluid rounded-top-5  "
                      alt={p.name}
                      style={{ height: "18rem" }}
                    />

                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 20)}...
                      </p>
                      <p className="card-text fw-bold">Price: {p.price} RS </p>
                      <p className="card-text fw-bold">Quantity Available: {p.quantity}  </p>
                      <div>
                        <button type="button" className="btn btn-warning m-2" onClick={() => navigate(`/product/${p.slug}`)}>
                          More Details
                        </button>
                        <button type="button" className="btn btn-dark" onClick={() => { setCart([...cart, p]); toast.success("Item Added To Cart") }}>
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
            <div className="m-3 p-3 container d-flex justify-content-center align-items-center">
              {products && products.length < total && (
                <button
                  className="btn btn-outline-dark"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Load More."}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* given blow was used to display login user info in JSON form on homepage */}
        {/* <pre>{JSON.stringify(auth,null,4)}</pre> */}
      </div >
    </Layout >
  );
};

export default HomePage;
