import React, { useEffect, useState } from 'react';

const ProductsDetails = () => {
    //Create a products variable
    const [products, setProducts] = useState([]);

    //Create a categegories variable
    const [categories, setCategories] = useState([]);

    //Get the products and store them in products
    const getProducts = async () => {
        const url = 'http://localhost:8000/api/products';
        try
        {
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data);
            console.log(data);
        }
        catch(e)
        {
            console.error(e);
        }
    }

    //Function to make the time object more simple to read
    const date = (string) => {
        if (string !== null)
        {
            var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            return new Date(string).toLocaleDateString([],options);
        }
        else
        {
            const update = "Not updated yet";
            return update;
        }
    }

    //Get the categories and store them in categories
    const getCategories = async () => {
        const url = "http://localhost:8000/api/categories";
        try
        {
            const response = await fetch(url);
            const data = await response.json();
            setCategories(data);
            console.log(data);
        }
        catch(e)
        {
            console.error(e)
        } 
    }

    //Automatically execute functions when the page load
    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    return (
        <div>
            <nav>
                {categories.map((categorie) => {
                    return <p key={categorie.id}>{categorie.name}</p>
                })}
            </nav>
            {/* Create a table */}
            <table>
                <thead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Categorie</th>
                        <th scope='col'>Prix</th>
                        <th scope='col'>Date de création</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                    return <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.categorie}</td>
                        <td>{(product.price).toFixed(2)}</td>
                        <td>{date(product.created_at.date)}</td>
                    </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ProductsDetails;