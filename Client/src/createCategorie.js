import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const NewCategorie = () => {
    //Create a navigate const to redirect
    const navigate = useNavigate();

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

    return (
        <div>
            <div>
                <h1>Nouvelle catégorie</h1>
                <form onSubmit={submited}>
                    <div className="form-detail">
                        <label>Nom: </label>
                        <input id="name" placeholder="Nom" name="name" value={formData.name} onChange={change} pattern="^[A-zÀ-ú0-9\s+]*$" required></input>
                    </div>
                    <button type='submit'>Créer</button>
                </form>
            </div>
        </div>
    )
}

export default NewCategorie;