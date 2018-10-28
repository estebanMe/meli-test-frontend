import React from 'react';
import { Link } from 'react-router-dom';

import { FormatNumber } from '../../shared/searchBar/FormatNumber';

import './item.scss';
const ic_shipping = require('../../../assets/ic_shipping.png');

 export const Item = ({id, picture, price, decimals, free_shipping, title, address}) => {
    return (
        <div className='item'>
            <div className='row no-gutters xs-text-center'>
                <div className='col-sm-auto'>
                    <Link to={`/items/${id}`}>
                        <div className='thumbnail image-container'>
                            <img className='fluid-image' src={picture}/>
                        </div>
                    </Link>
                </div>
                <div className='col-sm'>
                    <div className='price'>
                        <span className='amount'>
                            $&nbsp;<FormatNumber value={price}/>
                        </span>
                        {decimals>0 &&
                        <span className='decimals'>
                            &nbsp;{decimals}
                        </span>
                        }
                        {free_shipping &&
                        <span className='shipping'>
                            <img src={ic_shipping}/>
                        </span>
                        }
                    </div>
                    <Link to={`/items/${id}`}>
                        <div className='title'>{title}</div>
                    </Link>
                </div>
                <div className='col-sm-2'>
                    <div className='address'>{address}</div>
                </div>
            </div>
        </div>
    );
}