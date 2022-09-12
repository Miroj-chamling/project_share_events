import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; //provider is allows us to keep track of the global store and takes store as an attribute and we can access the state from anywhere in the app.
import { createStore, applyMiddleware, compose } from "redux";

//create store simply sets up a global store where we can store all of our states of the app. there should only be one store in the app.
import thunk from "redux-thunk";

import reducers from "./reducers";

import App from "./App";

const store = createStore(reducers, compose(applyMiddleware(thunk))); //creating the global store and saving it to the variable store.

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
