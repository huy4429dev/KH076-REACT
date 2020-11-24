import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/frontEnd/layouts';
import Admin from './pages/backEnd/layouts';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import configStore from './redux/configStore';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/backEnd/login';

import "./index.scss";

const store = configStore();

ReactDOM.render(
	<React.StrictMode >
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path={
						["/", "/product", "/shop", "/checkout", "/cart", "/login", "/register",
							"/settings/*"]
					} >
						<App />
					</Route>
					<Route exact path={
						["/admin", "/admin/dashboard", "/admin/user", "/admin/user/add",
							"/settings/*", "/admin/products/category",
							"/admin/products/list", "/admin/products/detailt", "/admin/products/add",
							"/admin/profile"
						]
					}
					>
						<Admin />
					</Route>
					<Route exact path={["/admin/login"]} >
						<Login />
					</Route>
				</Switch>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
