import React from 'react';
import {Switch, Route} from 'react-router-dom';


const Router = () => (
    <Switch>
        <Route path='/' component={Home} />
    </Switch>
)

export default Router;