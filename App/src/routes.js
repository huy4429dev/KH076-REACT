import React from 'react';
import Home from './pages/home';
import About from './pages/about';
import NotFound from './pages/errors/404';
import Contact from './pages/contact';
import Shop from './pages/shop';

const routes = [

    {
        path: '/about',
        exact: true,
        main: () => <About />
    },
    {
        path: '/contact',
        exact: true,
        main: () => <Contact />
    },
    {
        path: '/shop',
        exact: true,
        main: () => <Shop />
    },
    {
        path: '/',
        exact: true,
        main: () => <Home />
    },
    {
        path: '/home',
        exact: true,
        main: () => <Home />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFound />
    },

];

export default routes;