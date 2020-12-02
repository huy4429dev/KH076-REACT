import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import configStore from './redux/configStore';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/backEnd/login';
import App from './pages/frontEnd/layouts';
import Admin from './pages/backEnd/layouts';
import "./index.scss";
import "./lib/extensions";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'


const store = configStore();
let persistor = persistStore(store);

ReactDOM.render(
	<React.StrictMode >
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Router>
					<Switch>
						<Route exact path={
							["/", "/product", "/shop", "/checkout", "/cart", "/login", "/register", "/settings/*"]
						}>
							<App />
						</Route>
						<Route exact path={
							["/admin", "/admin/dashboard", "/admin/user", "/admin/user/add", "/admin/products/category",
								"/admin/products/list", "/admin/products/detailt", "/admin/products/add",
								"/admin/profile"
							]
						} component={({ history }) => <Admin history={history} />} />

						<Route exact path={["/admin/login"]} component={({ history }) => <Login history={history} />} />
					</Switch>
				</Router>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
