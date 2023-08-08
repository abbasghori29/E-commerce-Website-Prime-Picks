import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Lifecycle method to call products data
  useEffect(() => {
    getAllProducts();
  }, []);

  // Handler for search bar
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="adminProductPage">

        <div className="row container p-3 pe-0 ">
          <div className="col-lg-4 col-md-3 ">
            <AdminMenu />
          </div>
          <div className="col-lg-8 col-md-8">
            <div className="text-center mt-4">
              <h1>All Products List</h1>
              <div className="search-bar">
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
              <div className="row container-fluid p-0 m-0 ">
                {filteredProducts.map((p) => (
                  <div
                    key={p._id}
                    className="col-lg-4 col-md-6 col-sm-6 mb-3 text-center "
                  >
                    <Link
                      to={`/dashboard/admin/product/${p.slug}`}
                      className="product-link"
                    >
                      <div className="card rounded-5 ">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top img-fluid rounded-top-5  "
                          alt={p.name}
                          style={{ height: "18rem" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">{p.description.substring(0, 20)}...</p>
                          <p className="card-text">{p.price} RS </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
