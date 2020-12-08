import React from 'react';
import Home from './pages/frontEnd/home';
import Shop from './pages/frontEnd/shop';
import Product from './pages/frontEnd/product';
import Checkout from './pages/frontEnd/checkout';
import Cart from './pages/frontEnd/cart';
import Login from './pages/frontEnd/login';
import Register from './pages/frontEnd/register';
import Blog from './pages/frontEnd/blog';
import Contact from './pages/frontEnd/contact';
import About from './pages/frontEnd/about';
import DetailBlog from './pages/frontEnd/detailBlog';



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
    {
        path: '/blog',
        exact: true,
        main: ({ history }) => <Blog history={history} />
    },
    {
        path: '/contact',
        exact: true,
        main: ({ history }) => <Contact history={history} />
    },
    {
        path: '/about',
        exact: true,
        main: ({ history }) => <About history={history} />
    },
    {
        path: '/blog/:id',
        exact: true,
        main: ({ history, match }) => <DetailBlog history={history} match={match} />
    },
];

export default routes;