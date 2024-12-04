import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const CategoriesList = () => {
    //Create a categories const
    const [categories, setCategories] = useState([]);

    //Create a loading const
    const [loading, setLoading] = useState(true);

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

    //Get the change of the input of a categorie
    const inputChange = (id, field, value) => {
        setCategories(
          categories.map(((categorie) => categorie.id === id ? { ...categorie, [field]: value } : categorie))
        )
    };

    //Update the selected categorie
    const updateCategorie = async(e, categorie) => {
        e.preventDefault();
        const url = "http://localhost:8000/api/update_categorie";
        try
        {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(categorie)
            });

            if (response.ok)
            {
                alert("Catégorie modifiée");
                getCategories();
            }
            else
            {
                console.log("Catégorie pas modifiée");
            }
        }
        catch(e)
        {
            console.error(e);
        }
    };

    //Delete the selected product
    const deleteCategorie = async(e, id) => {
        e.preventDefault();

        //Ask if you want do delete it ok for yes and cancel for no
        const answer = window.confirm("Voulez supprimez cette catégorie?");

        if (answer)
        {
            const url = "http://localhost:8000/api/delete_categorie";
            try
            {
                const response = await fetch(url, {
                    method: 'DELETE',
                    body: JSON.stringify({ id: id })
                });
    
                if (response.ok)
                {
                    alert("Catégorie supprimée avec succès");
                    getCategories();
                }
                else
                {
                    console.log("La catégorie n'a pas été supprimé");
                }
            }
            catch(e)
            {
                console.error(e);
            }
        }
        else
        {
            console.log("Catégorie pas supprimée");
        }
    };

    const newProduct = (e) => {
        e.preventDefault();
        navigate('/new_categorie');
    };

    useEffect(() => {
        getCategories();
        setLoading(false);
    }, [loading]);

    return (
        <div>
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
                    {/* Table of categories */}
                    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="bg-blue-400 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left">Nom de la catégorie</th>
                                    <th className="px-6 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!categories ? (
                                    <p>Vous n'avez pas de categories</p>
                                ) : (
                                    categories.map((categorie) => (
                                        <tr key={categorie.id} className="border-b hover:bg-gray-100">
                                            <td className="px-6 py-3">
                                                <input
                                                    className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" value={categorie.name} onChange={(e) => inputChange(categorie.id, "name", e.target.value)}/>
                                            </td>
                                            <td className="px-6 py-3 space-x-2">
                                                <button className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-700 focus:outline-none" onClick={(e) => updateCategorie(e, categorie)}>Mettre à jour</button>
                                                <button className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-700 focus:outline-none" onClick={(e) => deleteCategorie(e, categorie.id)}>X</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <button className="px-4 py-2 mt-4 bg-blue-400 text-white rounded-md hover:bg-blue-700 focus:outline-none" onClick={(e) => newProduct(e)}>Ajouter</button>
                </>
            )}
            {/* Navbar */}
        </div>
    )
}

export default CategoriesList;