import React from 'react';
import { useCart } from '../hooks/cartcontext';

export const CartButton = () => {
    const { itemsCount, toggleCart } = useCart();

    return (
        <button 
            className="btn btn-danger position-relative"
            onClick={toggleCart}
        >
            <i className="bi bi-cart3"></i>
            {itemsCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                    {itemsCount}
                </span>
            )}
        </button>
    );
}
