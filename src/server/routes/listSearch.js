import request from 'request'; //make http calls
import errorAccessAPI from '../errors/errorSearch';


export default function(req, res) {
    //// Mock Query
    const queryString = req.query.q || '';
    request(`https://api.mercadolibre.com/sites/MLA/search?q=${queryString}`, function(error, response, body) {

        if (!error) {
            const data = JSON.parse(body);
            if (data.results) {
                //set categories
                let categories = [];
                if (data.filters[0] && data.filters[0].values[0]) {
                    categories = data.filters[0].values[0].path_from_root.map((category) => { return category.name });
                }

                let items = data.results.slice(0, 4);
             
                items = items.map((item) => {
                    const amount = Math.floor(item.price);
                    const decimals = +(item.price % 1).toFixed(2).substring(2);
                    return {
                        id: item.id,
                        title: item.title,
                        price: {
                            currency: item.currency_id,
                            amount: amount,
                            decimals: decimals
                        },
                        picture: item.thumbnail,
                        condition: item.condition,
                        free_shipping: item.shipping ? item.shipping.free_shipping : false,
                        address: item.address ? item.address.state_name : ''
                    }
                });

                //Prepare object return
                const resultSearch = {
                    author: {
                        name: 'Esteban',
                        lastname: 'Mercado'
                    },
                    categories: categories,
                    items: items
                }
                res.send(resultSearch);
            }
        } else {
            res.send(errorAccessAPI);
        }
    });
}