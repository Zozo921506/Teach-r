import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductsDetails from './products';
import NewProduct from './newProduct';

const AppRouter = () => {
    return (
        //Setting the routes
        <Routes>
            <Route path='/' element={<ProductsDetails />}></Route>
            <Route path='/new_product' element={<NewProduct />}></Route>
        </Routes>
    )
}

export default AppRouter;