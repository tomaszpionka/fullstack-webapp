import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        amount:''
    })

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]: value,
        }))
    }


    const handleSubmit = async(e) =>{
        e.preventDefault();
        const header = {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }};
        try {
            const response = await axios.post('/api/products', formData, header);
            console.log("Product added")
            navigate('/products');
            window.location.reload();
        } catch (error) {
            console.log("Product adding failed: " + error)
        }
    }

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

    return (
        <div className="product-container">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name"
                    value={formData.name} onChange={handleChange}
                    required placeholder="Enter product name" /> <br />

                <input type="text" name="description"
                    value={formData.description} onChange={handleChange}
                    required placeholder="Enter product description" /> <br />

                <input type="text" name="amount"
                    value={formData.amount} onChange={handleChange}
                    required placeholder="Enter product price" /> <br />
                <button type="submit">Add</button>
            </form>
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
export default Products;