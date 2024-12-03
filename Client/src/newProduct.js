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
            setCategories(data);
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
        <div>
            <div>
                <h1>Nouveau produit</h1>
                <form onSubmit={submited}>
                    <div className="form-detail">
                        <label>Nom: </label>
                        <input id="name" placeholder="Nom" name="name" value={formData.name} onChange={change} pattern="^[A-zÀ-ú0-9\s+]*$" required></input>
                    </div>
                    <div className="form-detail">
                        <label>Description: </label>
                        <textarea id="description" placeholder="Description" name="description" value={formData.description} onChange={change} pattern="^[A-zÀ-ú0-9\s+]*$"></textarea>
                    </div>
                    <div className="form-detail">
                        <label>Prix: </label>
                        <input id="price" placeholder="Prix" name="price" value={formData.price} onChange={change} required></input>
                    </div>
                    <div className="form-detail">
                        <label>Categorie: </label>
                        <select id="categorie" placeholder="Categorie" name="categorie" value={formData.categorie} onChange={change} required>
                            <option value=''>Veuillez choisir une catégorie</option>
                            {categories.map((categorie) => {
                                return <option value={categorie.name} key={categorie.id}>{categorie.name}</option>
                            })}
                        </select>
                    </div>
                    <button type='submit'>Créer</button>
                </form>
            </div>
        </div>
    )
}

export default NewProduct;