import React, { useEffect, useState } from 'react';

const ProductsDetails = () => {
    //Create a products const
    const [products, setProducts] = useState([]);

    //Create a categories const
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
    };

    //Create a loading const
    const [loading, setLoading] = useState(true);

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
    };

    //Delete the selected product
    const deleteProduct = async(e, id) => {
        e.preventDefault();

        //Ask if you want do delete it ok for yes and cancel for no
        const answer = window.confirm("Voulez supprimez ce produit?");

        if (answer)
        {
            const url = "http://localhost:8000/api/delete_product";
            try
            {
                const response = await fetch(url, {
                    method: 'DELETE',
                    body: JSON.stringify({ id: id })
                });
    
                if (response.ok)
                {
                    alert("Produit supprimé avec succès");
                    getProducts();
                }
                else
                {
                    console.log("Le produit n'a pas été supprimé");
                }
            }
            catch(e)
            {
                console.error(e);
            }
        }
        else
        {
            console.log("Produit pas supprimé");
        }
    };

    //Get the change of the input of a product
    const inputChange = (id, field, value) => {
        setProducts(
          products.map(((product) => product.id === id ? { ...product, [field]: value } : product))
        )
    };

    //Update the selected product
    const updateProduct = async(e, product) => {
        e.preventDefault();
        const url = "http://localhost:8000/api/update_product";
        try
        {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(product)
            });

            if (response.ok)
            {
                alert("Produit modifié");
                getProducts();
            }
            else
            {
                console.log("Produit pas modifié");
            }
        }
        catch(e)
        {
            console.error(e);
        }
    };

    //Automatically execute functions when the page load
    useEffect(() => {
        getProducts();
        getCategories();
        setLoading(false);
    }, [loading]);

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
                        <th scope='col'>Catégorie</th>
                        <th scope='col'>Prix</th>
                        <th scope='col'>Date de création</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                    return <tr key={product.id}>
                        <td><input value={product.name} onChange={(e) => inputChange(product.id, "name", e.target.value)}/></td>
                        <td><textarea value={product.description} onChange={(e) => inputChange(product.id, "description", e.target.value)}/></td>
                        <td>
                            {/* Getting the existing categories */}
                            <select value={product.categorie} onChange={(e) => inputChange(product.id, "categorie", e.target.value)}>
                                <option value={product.categorie}>{product.categorie}</option>
                                {categories.map((categorie) => {
                                    if (categorie.name !== product.categorie)
                                    {
                                        return <option value={categorie.name} key={categorie.id}>{categorie.name}</option>
                                    }
                                    return <option key=''></option>
                                })}
                            </select>
                        </td>
                        <td><input value={product.price} onChange={(e) => inputChange(product.id, "price", e.target.value)}/></td>
                        <td>{date(product.created_at.date)}</td>
                        <td><button onClick={(e) => updateProduct(e, product)}>Mettre à jour</button></td>
                        <td><button onClick={(e) => deleteProduct(e, product.id)}>X</button></td>
                    </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ProductsDetails;