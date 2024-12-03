import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const NewCategorie = () => {
    //Create a navigate const to redirect
    const navigate = useNavigate();

    //Create a categories const
    const [categories, setCategories] = useState([]);

    //Create a loading const
    const [loading, setLoading] = useState(true);

    //Create a formData const to stock the data
    const [formData, setFormData] = useState(
        {
            name: '',
        }
    );

    //Stocking the input data to formData
    const change = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    };

    //When the form is complete
    const submited = async (e) => {
        e.preventDefault();
        const url = "http://localhost:8000/api/create_categorie"
        try
        {
          const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(formData)
          })
    
          if (response.ok)
          {
            alert("Catégorie crée avec succès");
            navigate('/');
          }
          else
          {
            console.log("La catégorie n'a pas été crée");
          }
        }
        catch(e)
        {
          console.error('Error: ', e);
        }
      };

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

    useEffect(() => {
        getCategories();
        setLoading(false);
    }, [loading]);

    return (
        <div>
            {/* Navbar */}
            <nav className="mb-6">
                <ul className="flex space-x-4">
                    <li><Link to='/' className="text-blue-600 font-bold text-2xl">Teach<span className='text-orange-500'>'</span>r</Link></li>
                    <li><Link to='/categories' className="text-lg font-semibold text-gray-800 hover:text-blue-500 cursor-pointer">Liste des catégories</Link></li>
                    {categories.map((categorie) => (
                        <li key={categorie.id} className="text-lg font-semibold text-gray-800 hover:text-blue-500 cursor-pointer">
                            <Link to={`/categorie/${categorie.name}`}>{categorie.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div>
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Nouvelle catégorie</h1>
                <form onSubmit={submited} className="bg-white p-6 shadow-lg rounded-lg space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-lg text-gray-700 font-semibold">Nom de la catégorie</label>
                        <input id="name" name="name" placeholder="Nom" value={formData.name} onChange={change} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required/>
                    </div>
                    <button type="submit" className="w-full py-3 bg-orange-400 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500">Créer la catégorie</button>
                </form>
            </div>
        </div>
    )
}

export default NewCategorie;