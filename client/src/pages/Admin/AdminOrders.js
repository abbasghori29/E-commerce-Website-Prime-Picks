import React, { useState, useEffect } from 'react'
import Layout from "../../components/layout/layout"
import AdminMenu from "../../components/layout/AdminMenu"
import axios from 'axios'
import { useAuth } from "../../context/auth";
import moment from 'moment';
import { Select } from "antd";
const AdminOrders = () => {
    const { Option } = Select;
    const [orders, setOrders] = useState([])
    const [Status, setStatus] = useState(["Not Process", "Processing", "Shipped", "deliverd", "cancel",])
    const [changeStatus, setCHangeStatus] = useState("");
    const [auth, setAuth] = useAuth();

    const getAllOrders = async () => {
        const { data } = await axios.get("/api/v1/product/all-orders")
        if (data) {
            setOrders(data)
        }
    }
    useEffect(() => {
        if (auth?.token) getAllOrders()
    }, [])

    const handleChange = async (orderId, value) => {
        try {
            const response = await axios.put(`/api/v1/product/order-status/${orderId}`, {
                status: value,
            });

            // Check the response for debugging purposes
            console.log(response.data);

            getAllOrders();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout title={"All Orders Data"}>
            <div className="container text-center">
                <div className="row">
                    <div class="col m-3 p-3">
                        <h1>Admin Panel</h1>
                        <AdminMenu />
                    </div>
                    <div className="col m-3 p-3 ">
                        <h1>Orders List</h1>
                        <div className="card text-start p-3">
                            {orders?.map((o, i) => (
                                <div className="border shadow">
                                    <div className="table-responsive">

                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Buyer</th>
                                                    <th scope="col"> date</th>
                                                    <th scope="col">Payment</th>
                                                    <th scope="col">Payment Type</th>
                                                    <th scope="col">No. Of Products</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td><Select
                                                        bordered={false}
                                                        onChange={(value) => handleChange(o._id, value)}
                                                        defaultValue={o?.status}
                                                    >
                                                        {Status.map((s, i) => (
                                                            <Option key={i} value={s}>
                                                                {s}
                                                            </Option>
                                                        ))}
                                                    </Select></td>
                                                    <td>{o?.buyer?.name}</td>
                                                    <td>{o?.createAt ? moment(o?.createAt).fromNow() : "Invalid Date"}</td>
                                                    <td>{o?.payment.toLocaleString("en-US", { style: "currency", currency: "PKR" })}</td>
                                                    <td>{o?.paymentType}</td>
                                                    <td>{o?.products?.length}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="container-fluid">
                                        {o?.products?.map((p, i) => (
                                            <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                                <div className="col-md-2 d-flex ">
                                                    <img
                                                        src={`/api/v1/product/product-photo/${p._id}`}
                                                        className="card-img-top img-fluid"
                                                        alt={p.name}

                                                    />
                                                </div>
                                                <div className="col-md-10">
                                                    <p className="fw-bold">{p.name}</p>
                                                    <p className="fw-bold">{p.description.substring(0, 30)}</p>
                                                    <p className="fw-bold">Price: {p.price.toLocaleString("en-US", { style: "currency", currency: "PKR" })}</p>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default AdminOrders