import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from './../../../routerAdmin';
import Header from './header';
import Footer from './footer';
import Sidebar from './siderBar';
import routesAdmin from './../../../routerAdmin';
// import Footer from './footer';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ltr: true,
            divName: 'RTL',
        }
    }
    ChangeRtl(divName) {
        if (divName === 'RTL') {
            document.body.classList.add('rtl');
            this.setState({ divName: 'LTR' });
        } else {
            document.body.classList.remove('rtl');
            this.setState({ divName: 'RTL' });
        }
    }
    render() {
        return (
            <Router>
                <div>
                    <div className="page-wrapper" >
                        <Header />
                        <div className="page-body-wrapper">
                            <Sidebar />
                            {/* <Right_sidebar /> */}
                            <div className="page-body">
                                {this.showRouter(routesAdmin)}
                            </div>
                            <Footer />
                        </div>
                    </div>
                    <div className="btn-light custom-theme" onClick={() => this.ChangeRtl(this.state.divName)}>{this.state.divName}</div>
                </div>
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