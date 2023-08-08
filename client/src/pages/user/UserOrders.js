import React, { useState, useEffect } from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "../../components/layout/layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 mt-3 ">
            <h1 className="text-center fw-bold">All Orders</h1>
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
                        <td>{o?.status}</td>
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
    </Layout>
  );
};

export default UserOrders;