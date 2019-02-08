import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import StoreAdmin from './components/StoreAdmin';
import Store from './components/Store';


const Router = () => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route path='/store-admin' component={StoreAdmin}/>
        <Route path='/store/:id' component={Store}/>
    </Switch>
)

export default Router;