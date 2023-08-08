import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/layout'
import { Params, useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";

const CategoryProduct = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const navigate = useNavigate()
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");


    const params = useParams()
    //get products by category name
    const getProductsByCat = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (params?.slug) getProductsByCat()
    }, [params?.slug])


    // Handler for search bar
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter products based on search term
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase())

    );
    return (
        <Layout>
            <h1 className='text-center text-wrap mt-5' key={category._id} >Category-{category.name}</h1>
            <h2 className='text-center text-wrap'>{products.length} results found</h2>

            <div className=" container d-flex flex-wrap justify-content-center align-items-center pe-5 ">

                <div className="search-bar container w-75">
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
            </div>
            <div className=' container'>

                <div className="row p-0 m-0 ">
                    {filteredProducts.map((p) => (
                        <div
                            key={p._id}
                            className="col-lg-3 col-md-6 col-sm-6 mb-3 text-center "
                        >
                            <Link
                                to={`/product/${p.slug}`}
                                className="product-link"
                            >
                                <div className="card ">
                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top p-2 img-fluid"
                                        alt={p.name}
                                        style={{ height: "17rem" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">
                                            {p.description.substring(0, 25)}...
                                        </p>
                                        <p className="card-text fw-bold">{p.price} RS </p>
                                        <div>
                                            <button type="button" className="btn btn-warning m-2" onClick={() => navigate(`/product/${p.slug}`)}>
                                                More Details
                                            </button>
                                            <button type="button" className="btn btn-dark">
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>

        </Layout>
    )
}

export default CategoryProduct