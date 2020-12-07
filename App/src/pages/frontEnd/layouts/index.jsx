import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from './../../../routes';
import Header from './header';
import Footer from './footer';
import connect from '../../../lib/connect';
import * as actions from './../../../actions/frontEnd/login';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("access_token") ? localStorage.getItem("access_token") : null
        }
    }
    componentDidMount() {
        const { login, user, token } = this.props.account;
        if (login && user && token && this.state.token) {
            this.props.actions.account(user.id);
        }

    }
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
export default connect(App, state => ({
    account: state.login
}), actions);