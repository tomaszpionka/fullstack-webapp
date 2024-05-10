import React, { useEffect, useState } from "react";
import axios from 'axios';
import Products from "./auth/Products";

const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (err) {
                console.log(err)
            }
        }

        fetchProducts();
    }, [])

    return(
        <div className="home-container">
            <Products></Products>
            <h2>Our Products</h2>
            <div className="product-list">
                {products.map((product, index)=>(
                    <div className="product-item" key={index}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="amount">${product.amount}</p>
                    </div>
                ))}
                
            </div>
        </div>
    )

}
export default Home;