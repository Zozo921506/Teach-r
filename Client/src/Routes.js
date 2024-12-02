import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductsDetails from './products';

const AppRouter = () => {
    return (
        //Setting the routes
        <Routes>
            <Route path='/' element={<ProductsDetails />}></Route>
        </Routes>
    )
}

export default AppRouter;