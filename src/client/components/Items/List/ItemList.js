import React from 'react';

import Categories from "../../shared/categories/Categories";
import { Item } from "./Item";
import queryString from "query-string";

import '../index.scss';

export class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            items: [],
            noResults: false
        };
    }

    render() {
        const {items, categories, noResults} = this.state;
        if (items.length) {
            let list = items.map((item) => {
                return (<Item
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            price={item.price.amount}
                            decimals={item.price.decimals}
                            picture={item.picture}
                            condition={item.condition}
                            free_shipping={item.free_shipping}
                            address={item.address}
                        />);
            });
            return (<div className="row no-gutters">
                        <Categories categories={categories}/>
                        <div className='col-12 items-container'>
                            {list}
                        </div>
                    </div>);
        } else if (noResults) {
            return <span>No hay publicaciones que coincidan con tu búsqueda.</span>
        } else return null;
    }

    componentDidMount() {
        if (this.getQuery()) {
            this.getItems();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.search != this.props.location.search) {
            this.setState({
                items: [],
                categories: [],
                noResults: false
            });
            this.getItems();
        }
    }

    getItems() {
        const query = this.getQuery();
        fetch('/api/items?q=' + query)
        .then((results) => {
            return results.json()
        }).then((data) => {
            this.setState({
                items: data.items,
                categories: data.categories,
                noResults: !!data.items
                
            });
        });
    }

    getQuery() {
        const search = queryString.parse(location.search);
        return search.search;
    }
}