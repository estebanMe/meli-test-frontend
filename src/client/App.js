//dependencies
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import queryString from 'query-string';
import './styles/main.scss';


//Components
import { SearchBar } from './components/shared/searchBar/SearchBar';
import { Items } from './components/Items';
import { PageNotFound } from './components/shared/errors/PageNotFound';

export class App extends React.Component {
    constructor(props) {
        super(props);
        const query = queryString.parse(props.location.search);
        this.state = {
            search: query.search || ''
        }
        
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    handleSearchSubmit(search) {
        this.props.history.push({pathname: '/items', search:`search=${search}`});
        this.setState({search: search});
    }

    render() {
        return (
            <div>
                <SearchBar
                    search={this.state.search}
                    onSearchSubmit={this.handleSearchSubmit}/>
                <Switch>
                    <Route exact path='/' render={ null }/>
                    <Route path='/items' component={ Items }/>
                    <Route component={ PageNotFound }/>
                </Switch>
            </div>
        )
    }
}