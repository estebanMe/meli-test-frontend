import request from 'request'; //make http calls

export default function (req, res) {
    //// Mock Query
    const query = { q: 'auto' }
    const queryString = query.q || '';
    request('https://api.mercadolibre.com/sites/MLA/search?q=' + queryString, function (error, response, body) {

        if (!error) {
            const data = JSON.parse(body);
            if (data.results) {
                //set categories
                var categories = [];
                if (data.filters[0] && data.filters[0].values[0]) {
                    categories = data.filters[0].values[0].path_from_root.map((category) => { return category.name });
                }

                var items = data.results.slice(0, 4);
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
        }
    });
}