import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from "redux";
import articlesReducer from "./store/reducers/articlesReducer";
import usersReducers from "./store/reducers/usersReducers";

const rootReducer = combineReducers({
    articles: articlesReducer,
    users: usersReducers
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
)
ReactDOM.render(
  app,
  document.getElementById('root')
);


