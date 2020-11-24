import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from './../../../routes';
import Header from './header';
import Footer from './footer';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    render() {
        return (
            <Router>
                {/* <ToastContainer /> */}
                <Header />
                <Switch >
                    {this.showRouter(routes)}
                </Switch>
                <Footer />
            </Router>
        )
    }

    showRouter = (routes) => {
        var result = null;
        if (routes.length > 0) {
            result = routes.map((value, index) => {
                return (
                    <Route
                        key={index}
                        path={value.path}
                        exact={value.exact}
                        component={value.main}
                    />
                )
            })
        }
        return result;
    }
}
export default App