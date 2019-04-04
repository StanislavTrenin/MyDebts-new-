import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import postReducer from './redux/reducers/postReducer';
import App from './redux/App';

const store = createStore(postReducer);

const routes = (
    <Provider store={store}>
        <App />
    </Provider>
    /*<BrowserRouter>
        <Switch>
            <Route path="/" component={App} />
        </Switch>
    </BrowserRouter>*/
);


ReactDOM.render(routes, document.getElementById('root'));
serviceWorker.unregister();

/*import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
// if you're in create-react-app import the files as:
import store from "./js/store/index";
import App from "./js/components/App";
render(
    <Provider store={store}>
        <App />
    </Provider>,
    // The target element might be either root or app,
    // depending on your development environment
    // document.getElementById("app")
    document.getElementById("root")
);*/