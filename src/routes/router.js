import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Documents from '../pages/Documents';


export default function Routes() {

    return (
        <BrowserRouter>
            <Route path="/" exact component={Login}/>
            <Route path="/documents" component={Documents}/>
        </BrowserRouter>
    );
}