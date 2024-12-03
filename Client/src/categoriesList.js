import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

const CategoriesList = () => {
    //Create a categories const
    const [categories, setCategories] = useState([]);

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

    useEffect(() => {
        getCategories();
        setLoading(false);
    }, [loading]);

    return (
        <div>
            <table>
                <thead>
                        <tr>
                            <th scope='col'>Name</th>
                        </tr>
                    </thead>
                <tbody>
                    {categories.map((categorie) => {
                        return <tr key={categorie.id}>
                            <td><input value={categorie.name} onChange={(e) => inputChange(categorie.id, "name", e.target.value)}/></td>
                            <td><button onClick={(e) => updateCategorie(e, categorie)}>Mettre à jour</button></td>
                            <td><button onClick={(e) => deleteCategorie(e, categorie.id)}>X</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CategoriesList;