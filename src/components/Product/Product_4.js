import React, { useReducer } from 'react';
import './Product.css';

const products = [
    {
        emoji: '\uD83E\uDD16',
        name: 'robot',
        price: 500,
    },
    {
        emoji: '\uD83E\uDDBF',
        name: 'mechanical leg',
        price: 3000,
    },
    {
        emoji: '\uD83E\uDDBE',
        name: 'mechanical arm',
        price: 2000,
    },
];

function cartReducer(state, action) {
    switch (action.type) {
        case 'add':
            return [...state, action.product.name];
        case 'remove':
            const update = [...state];
            update.splice(update.indexOf(action.product.name), 1);
            return update;
        default:
            return state;
    }
}

function totalReducer(state, action) {
    if (action.type === 'add') {
        return state + action.product.price;
    }
    return state - action.product.price;
}

export default function Product() {
    const [cart, setCart] = useReducer(cartReducer, []);
    const [total, setTotal] = useReducer(totalReducer, 0);

    function add(product) {
        setCart({ product, type: 'add' });
        setTotal({ product, type: 'add' });
    }

    function remove(product) {
        setCart({ product, type: 'remove' });
        setTotal({ product, type: 'remove' });
    }

    return (
        <div className="wrapper">
            <div>Shopping Cart: {cart.length} total items.</div>
            <div>Total: {total}</div>
            <div>
                {products.map((product) => (
                    <div key={product.name}>
                        <div className="product">
                            <span role="img" aria-label={product.name}>
                                {product.emoji}
                            </span>
                        </div>
                        <button onClick={() => add(product)}>+</button>
                        <button onClick={() => remove(product)}>-</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
