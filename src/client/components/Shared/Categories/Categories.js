import React from 'react';


import './categories.scss';

const categories = (props) => {
  const length = props.categories.length;
  
    var list = [];
    if (length > 0) {
        list = props.categories.map((category) => {
        return <li className='breadcrumb-item' key={category}>{category}</li>;
      });
    }
    return (
      <div className="col-12 categories-container"><ul className='breadcrumb'>{list}</ul></div>
    );
  };
  
  export default categories;