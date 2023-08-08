import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Radio } from 'antd';
import axios from "axios";
import toast from "react-hot-toast";
import back from "../../src/c1.jpg"

const Cart = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [checked, setChecked] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Modal Config

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [secModalOpen, setSecModalOpen] = useState(false);
    const showSecModal = () => {
        setSecModalOpen(true);
    };
    const handleSecOk = async () => {
        try {
            const { data } = await axios.post("/api/v1/product/payment", { cart })
            if (data.success) {
                localStorage.removeItem("cart");
                setCart([]);
                navigate("/dashboard/user/orders");
                toast.success("Ordered Place Successfully")
                setSecModalOpen(false);
            }

        } catch (error) {
            console.log(error)
        }
    };
    const handleSecCancel = () => {
        setSecModalOpen(false);
    };
    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "PKR",
            });
        } catch (error) {
            console.log(error);
        }
    };
    //detele item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };


    let i = 1;

    return (
        <Layout>
            <div className=" cart-page overflow-x-hidden">
                <img src={back} alt="" className="background-image" />
                <div className="overlay shadow cartDetails container w-75 d-flex justify-content-center align-item-center flex-column  mt-5 mb-4 pb-5 pt-3">

                    <div className="row ">
                        <div className="col-md-12">
                            <div className="col-md-12">
                                <h1 className='text-center pt-3'>
                                    {`Hello ${auth?.token && auth?.user?.name} !`}
                                </h1>
                                <h3 className='text-center'>
                                    {cart?.length > 0 ? `You Have ${cart.length} items in Your cart  ${auth?.token ? "" : "Please Login To Checkout"}` : "Your Cart Is Empty"}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="container d-flex justify-content-center align-items-center flex-column">
                        <button className="btn btn-outline-warning" onClick={showModal}>
                            See Your Cart Products
                        </button>
                        <Modal title="Cart Products" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >


                            <div className="container ">

                                <div className="col-md-7 p-0 m-0 w-100 ">
                                    {cart?.map((p) => (
                                        <div className="row card flex-row mb-2 " key={p._id}>
                                            <div className="col-md-5">
                                                <img
                                                    src={`/api/v1/product/product-photo/${p._id}`}
                                                    className="card-img-top mt-3"
                                                    alt={p.name}

                                                />
                                            </div>
                                            <div className="col-md-5 card-body">
                                                <p>{p.name}</p>
                                                <p>Price : {p.price} PKR</p>
                                                <div className="col-md-2 cart-remove-btn">
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => removeCartItem(p._id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>


                        </Modal>
                        <div className="col-md-5 cart-summary mt-3 ">
                            <h2>Cart Summary</h2>
                            <p>Total | Checkout | Payment</p>
                            <hr />
                            <h4>Total : {totalPrice()} </h4>
                            {auth?.user?.address ? (
                                <>
                                    <div className="mb-2">
                                        <h4>Current Address</h4>
                                        <h5>{auth?.user?.address}</h5>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => navigate("/dashboard/user/profile")}
                                        >
                                            Update Address
                                        </button>
                                    </div>
                                    <div className="">
                                        <button className="btn btn-outline-warning" onClick={showSecModal}>
                                            Checkout
                                        </button>
                                    </div>
                                    <Modal title="Checkout" open={secModalOpen} onOk={handleSecOk} onCancel={handleSecCancel}>
                                        <h2>All Products</h2>
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Products</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Currency</th>

                                                </tr>
                                            </thead>
                                            {cart.map((p) => (
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">{i++}</th>
                                                        <td>{p.name}</td>
                                                        <td>{p.price} </td>
                                                        <td><span className="fw-bold">PKR</span></td>
                                                    </tr>

                                                </tbody>


                                            ))}
                                        </table>
                                        <h5>Total Price: <span className="fw-bold">{totalPrice()}</span></h5>
                                        <Radio.Group onChange={(e) => setChecked(e.target.value)} className="d-flex flex-column">
                                            <Radio value={"Cash On Delivery"} >Cash On Delivery</Radio>
                                            <Radio value={"Card Payment"}>Card</Radio>
                                        </Radio.Group>
                                        <h6>Payment Method:<span className="fw-bold"> "{checked}"</span></h6>
                                        <h5>Click <b>OK</b> To Confirm Your Order</h5>
                                    </Modal>
                                </>
                            ) : (
                                <div className="mb-3">
                                    {auth?.token ? (
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => navigate("/dashboard/user/profile")}
                                        >
                                            Update Address
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() =>
                                                navigate("/login", {
                                                    state: "/cart",
                                                })
                                            }
                                        >
                                            Plase Login to checkout
                                        </button>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    );
};

export default Cart;