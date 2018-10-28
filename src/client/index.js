import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';

import { App } from './App';

const appComponent = (
    <BrowserRouter>
        <Route component={ App }/>
    </BrowserRouter>
);

ReactDOM.render(
    appComponent,
    document.getElementById('app')
); 