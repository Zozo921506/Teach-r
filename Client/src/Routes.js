import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductsDetails from './products';
import NewProduct from './newProduct';
import CategoriesList from './categoriesList';
import NewCategorie from './createCategorie';
import CategorieFilter from './categorieFilter';
import NotFound from './404Page';

const AppRouter = () => {
    return (
        //Setting the routes
        <Routes>
            <Route path='/' element={<ProductsDetails />}></Route>
            <Route path='/new_product' element={<NewProduct />}></Route>
            <Route path='/categories' element={<CategoriesList />}></Route>
            <Route path='/new_categorie' element={<NewCategorie />}></Route>
            <Route path='/categorie/:categorie_name' element={<CategorieFilter />}></Route>
            <Route path='*' element={<NotFound />}></Route>
        </Routes>
    )
}

export default AppRouter;