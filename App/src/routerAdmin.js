import React from 'react';
import Dashboard from './pages/backEnd/dashboard';
import User from './pages/backEnd/user/user';
import Product from './pages/backEnd/products/categorys';
import ProductList from './pages/backEnd/products/products';
import Detailt from './pages/backEnd/products/detailt';
import AddProduct from './pages/backEnd/products/add';
import AddUser from './pages/backEnd/user/create';
import Profile from './pages/backEnd/profile';



const routesAdmin = [

    {
        path: '/admin/dashboard',
        exact: true,
        main: () => <Dashboard />
    },
    {
        path: '/admin/user',
        exact: true,
        main: () => <User />
    },
    {
        path: '/admin/products/category',
        exact: true,
        main: () => <Product />
    },
    {
        path: '/admin/products/list',
        exact: true,
        main: () => <ProductList />
    },
    {
        path: '/admin/products/detailt',
        exact: true,
        main: () => <Detailt />
    },
    {
        path: '/admin/products/add',
        exact: true,
        main: () => <AddProduct />
    },
    {
        path: '/admin/user/add',
        exact: true,
        main: () => <AddUser />
    },
    {
        path: '/admin/profile',
        exact: true,
        main: () => <Profile />
    },
];

export default routesAdmin;