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
import Order from './pages/backEnd/order/order';
import Revenue from './pages/backEnd/report/reportRevenue';
import ReportCustomer from './pages/backEnd/report/reportCustomer';



const routesAdmin = [
    {
        path: '/admin/dashboard',
        exact: true,
        main: () => <Dashboard />
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
        path: '/admin/products/detail/:id',
        exact: true,
        main: ({match}) => <Detailt match={match} />  
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
        path: '/admin/customers',
        exact: true,
        main: () => <Customer />
    },
    {
        path: '/admin/orders',
        exact: true,
        main: () => <Order />
    },
    {
        path: '/admin/report/revenue',
        exact: true,
        main: () => <Revenue />
    },
    {
        path: '/admin/report/customer',
        exact: true,
        main: () => <ReportCustomer />
    },
];

export default routesAdmin;