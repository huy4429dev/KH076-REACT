import React from 'react';
import Dashboard from './pages/backEnd/dashboard';
import User from './pages/backEnd/user';
import Category from './pages/backEnd/products/categories';
import ProductList from './pages/backEnd/products/product';
import Detailt from './pages/backEnd/products/detailtProduct';
import AddProduct from './pages/backEnd/products/addProduct';
import AddUser from './pages/backEnd/user/create';
import Profile from './pages/backEnd/profile';
import CategoryDetailt from './pages/backEnd/products/categoryDetailt';
import Blog from './pages/backEnd/blog';
import Contact from './pages/backEnd/contact';
import Customer from './pages/backEnd/customer';
import ColorProduct from './pages/backEnd/products/colorProduct';
import SizeProduct from './pages/backEnd/products/sizeProduct';



const routesAdmin = [
    {
        path: '/admin',
        exact: true,
        main: () => <Dashboard />
    },
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
        main: () => <Category />
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
        path: '/admin/products/color',
        exact: true,
        main: () => <ColorProduct />
    },
    {
        path: '/admin/products/size',
        exact: true,
        main: () => <SizeProduct />
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
        main: ({ match }) => <CategoryDetailt match={match} />
    },
    {
        path: '/admin/blog',
        exact: true,
        main: () => <Blog />
    },
    {
        path: '/admin/contact',
        exact: true,
        main: () => <Contact />
    },
    {
        path: '/admin/customer',
        exact: true,
        main: () => <Customer />
    },
];

export default routesAdmin;