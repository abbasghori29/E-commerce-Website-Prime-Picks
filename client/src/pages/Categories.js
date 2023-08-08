import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/layout'
import axios from 'axios';
import { Link } from 'react-router-dom';
const Categories = () => {
    const [categories, setCategories] = useState([]);

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
    return (
        <Layout title={"All-Categories"}>
            <div className="container">
                <div className="row ">
                    <div className="col-md-6 mt-5" >
                        {categories.map(c => (
                            <Link className='btn btn-outline-dark ' key={c._id} to={`/category/${c.slug}`}>{c.name}</Link>

                        ))}
                    </div>
                </div>

            </div>

        </Layout>
    )
}

export default Categories