import React, { useState } from "react";
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
        try {
            const response = await axios.post('/products', formData );
            console.log("Product added")
            navigate('/home');
            window.location.reload();
        } catch (error) {
            console.log("Product adding failed: " + error)
        }
    }


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
        </div>
    )
}
export default Products;