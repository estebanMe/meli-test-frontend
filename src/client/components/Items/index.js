import React from 'react';
import { Switch, Route } from 'react-router-dom';


import { ItemList } from "./List/itemList";
import { ItemDetail } from "./Detail/ItemDetail";

export class Items extends React.Component {
    render() {
        return (
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-md-10'>
                        <Switch>
                            <Route exact path='/items' component={ItemList}/>
                            <Route path='/items/:id' component={ItemDetail}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}