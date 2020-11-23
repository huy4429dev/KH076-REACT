import React from 'react';
import Home from './pages/frontEnd/home';
import Shop from './pages/frontEnd/shop';
import Product from './pages/frontEnd/product';
// import About from './pages/about';
// import NotFound from './pages/errors/404';
// import Contact from './pages/contact';
// import Shop from './pages/shop';

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
        path: '/product',
        exact: true,
        main: () => <Product />
    },
    // {
    //     path: '/',
    //     exact: true,
    //     main: () => <Home />
    // },
    // {
    //     path: '/home',
    //     exact: true,
    //     main: () => <Home />
    // },
    // {
    //     path: '',
    //     exact: false,
    //     main: () => <NotFound />
    // },

];

export default routes;