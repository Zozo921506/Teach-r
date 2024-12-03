import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductsDetails from './products';
import NewProduct from './newProduct';
import CategoriesList from './categoriesList';
import NewCategorie from './createCategorie';

const AppRouter = () => {
    return (
        //Setting the routes
        <Routes>
            <Route path='/' element={<ProductsDetails />}></Route>
            <Route path='/new_product' element={<NewProduct />}></Route>
            <Route path='/categories' element={<CategoriesList />}></Route>
            <Route path='/new_categorie' element={<NewCategorie />}></Route>
        </Routes>
    )
}

export default AppRouter;