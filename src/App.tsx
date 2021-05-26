import React, { useEffect, useReducer } from 'react';
import {Provider} from 'react-redux';
import {createStore, compose } from 'redux';
import rootReducer from './reducers';

import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';

import './App.scss';
import ProductPage from './pages/ProductPage/ProductPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ShoppingCart from './pages/ShopingCart/ShoppingCart';
import Home from './pages/Home/Home';
import reducerProduct, { iniProductState, ProductStateAction } from './reducers/reducerProduct';
import ContextProduct from './context/ContextProduct';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers2 = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

export const  store = createStore(rootReducer, composeEnhancers && composeEnhancers2());

const App = () => {
  const [ProductState, ProductDispatch] = useReducer(reducerProduct, iniProductState);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res=>res.json())
      .then(json=> {
          ProductDispatch({
              type: ProductStateAction.INIT_PRODUCT,
              payload: {
                  Products: json,
              }
          });
    });
  }, []);

  return (
    <Provider store={store}>
      <ContextProduct.Provider value={{ ProductState, ProductDispatch }}>
        <HashRouter basename='/'>
          <React.Fragment>
              <Header cartLength={0}/>
              <Switch>
                  <Route exact path={'/'} render={() => {
                      return <Redirect to={'/home'}/>
                  }}/>
                  <Route exact path={'/home'} component={Home}/>
                    <Route exact path={'/products'} component={ProductPage}/>
                    <Route exact path={'/products/:id'} component={ProductDetail}/>
                  <Route exact patr={'/cart'} component={ShoppingCart}/>
              </Switch>
              <Footer/>
          </React.Fragment>
          </HashRouter>
      </ContextProduct.Provider>
    </Provider>
  );
}

export default App;
