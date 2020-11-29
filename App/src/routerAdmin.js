import React from 'react';
import Dashboard from './pages/backEnd/dashboard';
import User from './pages/backEnd/user/user';
import Product from './pages/backEnd/products/categories';
import ProductList from './pages/backEnd/products/products';
import Detailt from './pages/backEnd/products/detailtProduct';
import AddProduct from './pages/backEnd/products/addProduct';
import AddUser from './pages/backEnd/user/create';
import Profile from './pages/backEnd/profile';
import CategoryDetailt from './pages/backEnd/categoryDetailt';



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
    {
        path: '/admin/products/category/:id',
        exact: true,
        main: ({match}) => <CategoryDetailt match={match}/>
    },
];

export default routesAdmin;