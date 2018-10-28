import React from 'react';

import Categories from "../../shared/categories/Categories";
import { FormatNumber } from '../../shared/searchBar/FormatNumber';

import '../index.scss';
import './itemDetail.scss';
const ic_shipping = require('../../../assets/ic_shipping.png');

export class ItemDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            item: {},
            noResults: false
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        fetch('/api/items/' + id)
        .then((results) => {
            return results.json()
        }).then((data) => {
            if (data.status == 404) {
                this.setState({noResults: true});
            } else {
                //console.log(data.item);
                console.log(!!data.item);
                this.setState({
                    item: data.item,
                    categories: data.categories,
                    noResults: false
                });
            }
        });
    }

    render() {
        const {item, categories, noResults} = this.state;
        if (item.id) {
            return (
                <div className="row no-gutters">
                    <Categories className='col-12' categories={categories}/>
                    <div className="col-12 items-container">
                        <div className='row xs-text-center'>
                            <div className='col'>
                                <div className='picture image-container'>
                                    <img className='fluid-image' src={item.picture}/>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='info xs-text-center'>
                                    <div className='condition'>
                                        {item.condition == 'new' ? 'Nuevo' : 'Usado'}
                                        {item.sold_quantity>0 ? ` - ${item.sold_quantity} vendidos` : ''}
                                    </div>
                                    <div className='title'>
                                            {item.title}
                                    </div>
                                    <div className='price'>
                                        <span className='amount'>
                                            $&nbsp;<FormatNumber value={item.price.amount}/>
                                        </span>
                                        {item.price.decimals>0 &&
                                        <span className='decimals'>
                                            &nbsp;{item.price.decimals}
                                        </span>
                                        }
                                        {item.free_shipping &&
                                        <span className='shipping'>
                                            <img src={ic_shipping}/>
                                        </span>
                                        }
                                    </div>
                                    <div className='button-container'>
                                        <button className='primary-button'>
                                            Comprar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {!!item.description && (
                        <div className='row xs-text-center'>
                            <div className='col-xl-9'>
                                <div className='description'>
                                    <div className='title'>Descripción del producto</div>
                                    <div className='content'>{item.description}</div>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            );
        } else if (noResults) {
            return <h3 className='message text-center'>No existe el producto solicitado</h3>
        } else return null;
    }

}