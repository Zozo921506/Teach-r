import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const NewProduct = () => {
    //Create a navigate const to redirect
    const navigate = useNavigate();

    //Create a categories const
    const [categories, setCategories] = useState([]);

    //Create a formData const to stock the data
    const [formData, setFormData] = useState(
        {
            name: '',
            description: '',
            price: '',
            categorie: ''
        }
    );

     //Create a loading const
     const [loading, setLoading] = useState(true);

    //Stocking the input data to formData
    const change = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    };

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

    //When the form is complete
    const submited = async (e) => {
        e.preventDefault();
        const url = "http://localhost:8000/api/create_product"
        try
        {
          const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData)
          })
    
          if (response.ok)
          {
            alert("Produit crée avec succès");
            navigate('/');
          }
          else
          {
            console.log("Le produit n'a pas été crée");
          }
        }
        catch(e)
        {
          console.error('Error: ', e);
        }
      }

    useEffect(() => {
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
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Nouveau produit</h1>
                        <form onSubmit={submited} className="bg-white p-6 shadow-lg rounded-lg space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-lg text-gray-700 font-semibold">Nom du produit</label>
                                <input id="name" name="name" placeholder="Nom" value={formData.name} onChange={change} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="description" className="text-lg text-gray-700 font-semibold">Description du produit</label>
                                <textarea id="description" name="description" placeholder="Description" value={formData.description} onChange={change} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="price" className="text-lg text-gray-700 font-semibold">Prix</label>
                                <input id="price" name="price" placeholder="1.00" value={formData.price} onChange={change} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="categorie" className="text-lg text-gray-700 font-semibold">Catégorie</label>
                                <select id="categorie" name="categorie" value={formData.categorie} onChange={change} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-400 text-white" required>
                                    <option value="">Veuillez choisir une catégorie</option>
                                    {categories.map((categorie) => (
                                        <option value={categorie.name} key={categorie.id}>
                                            {categorie.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="w-full py-3 bg-orange-400 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500">Créer le produit</button>
                        </form>
                    </div>
                </>
            )}
            {/* Navbar */}
        </div>
    )
}

export default NewProduct;