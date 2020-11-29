import React from 'react';
import Home from './pages/frontEnd/home';
import Shop from './pages/frontEnd/shop';
import Product from './pages/frontEnd/product';
import Checkout from './pages/frontEnd/checkout';
import Cart from './pages/frontEnd/cart';
import Login from './pages/frontEnd/login';
import Register from './pages/frontEnd/register';


const routes = [

    {
        path: '/',
        exact: true,
        main: () => <Home />
    },
    {
        path: '/shop',
        exact: true,
        main: () => <Shop />
    },
    {
        path: '/product/:id',
        exact: true,
        main: ({ match }) => <Product match={match} />
    },
    {
        path: '/checkout',
        exact: true,
        main: () => <Checkout />
    },
    {
        path: '/cart',
        exact: true,
        main: () => <Cart />
    },
    {
        path: '/login',
        exact: true,
        main: ({ history }) => <Login history={history} />
    },
    {
        path: '/register',
        exact: true,
        main: ({ history }) => <Register history={history} />
    },
];

export default routes;