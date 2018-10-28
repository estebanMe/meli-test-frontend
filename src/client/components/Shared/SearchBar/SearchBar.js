import React from 'react';
import { Link } from 'react-router-dom';
import './searchBar.scss';

//icons
import ic_search from  '../../../assets/ic_search.png';
import logo_ml from '../../../assets/logo_ml.png';


export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    handleSearchSubmit(e) {
        e.preventDefault();
        this.props.onSearchSubmit(this.query.value);
    }

    render() {
        return (
            <div className='container-fluid search-container'>
                <div className='row justify-content-center'>
                    <div className='col-md-10'>
                        <div className='row'>
                            <div className='col-sm-auto align-self-center text-center'>
                                <Link to='/'>
                                    <img className='logo' alt="MercadoLibre" src={logo_ml}/>
                                </Link>
                            </div>
                            <div className='col'>
                                <form className='input-group d-flex' onSubmit={this.handleSearchSubmit}>
                                    <input
                                        ref={(node)=>this.query=node}
                                        defaultValue={this.props.search}
                                        placeholder="Nunca dejes de buscar"
                                        type="text"/>
                                    <button className='search-button' type="submit" alt="Buscar">
                                        <img src={ic_search}/>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}