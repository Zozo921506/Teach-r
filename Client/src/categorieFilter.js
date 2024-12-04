import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const CategorieFilter = () => {
    //Create a categorie_name
    const { categorie_name } = useParams();

    //Create a loading const
    const [loading, setLoading] = useState(true);
    
    //Create a products const
    const [products, setProducts] = useState([]);

    //Create a categories const
    const [categories, setCategories] = useState([]);

    //Get the products of a categorie and store them in products
    const getProducts = async () => {
        const url = `http://localhost:8000/api/products/${categorie_name}`;
        try
        {
            const response = await fetch(url);
            const data = await response.json();
            if(!data.message)
            {
                setProducts(data);
            }
            
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

    //Create a navigate const to redirect
    const navigate = useNavigate();

    //Get the categories and store them in categories
    const getCategories = async () => {
        const url = "http://localhost:8000/api/categories";
        try
        {
            const response = await fetch(url);
            const data = await response.json();
            if (!data.message)
            {
                setCategories(data);
            }

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

    //Redirect to new_product
    const newProduct = (e) => {
        e.preventDefault();
        navigate('/new_product');
    }

    //Automatically execute functions when the page load
    useEffect(() => {
        getProducts();
        getCategories();
        setLoading(false);
    }, [loading]);

    return (
        <div className="container mx-auto p-6">
            {loading ? (
                <p className='text-center'>Veuillez patienter</p>
            ) : (
                <>
                
                    {/* Navbar */}
                    <nav className="mb-6">
                        <ul className="flex space-x-4">
                            <li><Link to='/' className="text-blue-600 font-bold text-2xl mr-6">Teach<span className='text-orange-500'>'</span>r</Link></li>
                            <li><Link to='/categories' className="text-lg font-semibold text-gray-800 hover:text-blue-500 cursor-pointer">Liste des catégories</Link></li>
                            {categories ? categories.map((categorie) => (
                                <li key={categorie.id} className="text-lg font-semibold text-gray-800 hover:text-blue-500 cursor-pointer">
                                    <Link to={`/categorie/${categorie.name}`}>{categorie.name}</Link>
                                </li>
                            )) : (
                                <></>
                            )}
                        </ul>
                    </nav>
        
                    {/* Set a product table */}
                    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="bg-blue-400 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left">Nom</th>
                                    <th className="px-6 py-3 text-left">Description</th>
                                    <th className="px-6 py-3 text-left">Catégorie</th>
                                    <th className="px-6 py-3 text-left">Prix</th>
                                    <th className="px-6 py-3 text-left">Date de création</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? products.map((product) => (
                                    <tr key={product.id} className="border-b hover:bg-gray-100">
                                        <td className="px-6 py-3">
                                            <input className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" value={product.name} onChange={(e) => inputChange(product.id, "name", e.target.value)}/>
                                        </td>
                                        <td className="px-6 py-3">
                                            <textarea className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" value={product.description} onChange={(e) => inputChange(product.id, "description", e.target.value)}/>
                                        </td>
                                        <td className="px-6 py-3">
                                            <select className="w-full px-2 py-1 border rounded-md text-white bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500" value={product.categorie} onChange={(e) => inputChange(product.id, "categorie", e.target.value)}>
                                                <option value={product.categorie} className='bg-blue-400'>{product.categorie}</option>
                                                {categories.map((categorie) => {
                                                    if (categorie.name !== product.categorie) {
                                                        return <option value={categorie.name} key={categorie.id} className='bg-blue-400'>{categorie.name}</option>;
                                                    }
                                                    return null;
                                                })}
                                            </select>
                                        </td>
                                        <td className="px-6 py-3">
                                            <input className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" value={product.price} onChange={(e) => inputChange(product.id, "price", e.target.value)}/>
                                        </td>
                                        <td className="px-6 py-3">{date(product.created_at.date)}</td>
                                        <td className="px-6 py-3 space-x-2">
                                            <button className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-700 focus:outline-none" onClick={(e) => updateProduct(e, product)}>Mettre à jour</button>
                                            <button className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-700 focus:outline-none" onClick={(e) => deleteProduct(e, product.id)}>X</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td>Vous n'avez pas encore créer de produits avec cette catégorie</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <button className="px-4 py-2 mt-4 bg-blue-400 text-white rounded-md hover:bg-blue-700 focus:outline-none" onClick={(e) => newProduct(e)}>Ajouter</button>
                </>
            )}
        </div>
    )
};

export default CategorieFilter;