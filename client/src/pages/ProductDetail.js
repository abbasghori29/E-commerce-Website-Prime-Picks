import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FcRightDown2 } from "react-icons/fc";
import { useCart } from "../context/cartContext";
import { toast } from "react-hot-toast";
// import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart()


    //initalp details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);
    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };
    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout title={"Product-Details"}>
            <div className="container mb-5 mt-4">

                <div className="row  product-details shadow pt-1 d-flex justify-content-center ">
                    <div className="col-md-5">
                        <img
                            src={`/api/v1/product/product-photo/${product._id}`}
                            className="img-fluid "
                            alt={product.name}
                            style={{ height: "600px", width: "500px" }}

                        />
                    </div>
                    <div className="col-md-7 product-details-info  pt-5">
                        <h1 className="text-center">Product Details</h1>
                        <hr />
                        <h6 className="fw-bold">Name : {product.name}</h6>
                        <h6 className="fw-bold">Description : {product.description}</h6>
                        <h6 className="fw-bold">
                            Price :
                            {product?.price} PKR
                        </h6>
                        <h6 className="fw-bold">Category : {product?.category?.name}</h6>
                        <button className="btn btn-secondary ms-1" onClick={() => { setCart([...cart, product]); toast.success("Item Added To Cart") }}>ADD TO CART</button>
                    </div>
                </div>
            </div>
            <div className=" container similar-products d-flex justify-content-center align-items-center flex-column">
                <h2 className="display-5 text-center">Similar Products <FcRightDown2 /></h2>
                <div className="row">

                    {relatedProducts.length < 1 && (
                        <p className="text-center">No Similar Products found</p>
                    )}
                    <div className="row container-fluid p-0 m-0 ">
                        {relatedProducts.map((p) => (
                            <div
                                key={p._id}
                                className="col mb-3 text-center "
                            >

                                <div className="card rounded-5 shadow">

                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top img-fluid rounded-top-5  "
                                        alt={p.name}
                                        style={{ height: "14rem", width: "100%" }}
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

                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;