import React from 'react';
import { useCart } from '../hooks/cartcontext';
import '../../../shared/styles/style.css';

export const Cart = () => {
    const { 
        items, 
        isOpen, 
        total, 
        itemsCount,
        removeItem, 
        addItem,
        clearCart, 
        toggleCart,
        cartRef,
        dispatch
    } = useCart();

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) {
            removeItem(id);
        } else {
            dispatch({ type: 'UPDATE_ITEM', payload: { id, quantity } });
        }
    };

    // Si el carrito está cerrado, no renderizar nada
    if (!isOpen) return null;

    return (
        <div className="cart-overlay">
            <div className="cart-sidebar p-3" ref={cartRef}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="d-flex align-items-center gap-2 fs-4 text-danger">
                        <i className="bi bi-cart3 fs-3"></i>
                        Carrito ({itemsCount})
                    </h3>
                    <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={toggleCart}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                {/* 📦 Contenido del carrito */}
                <div className="cart-content">
                    {items.length === 0 ? (
                        // Estado vacío
                        <div className="empty-cart text-center text-muted">
                            <i className="bi bi-cart-x display-4"></i>
                            <p className="mt-3">Tu carrito está vacío</p>
                        </div>
                    ) : (
                        <>
                            {/* Lista de productos */}
                            <div className="cart-items">
                                {items.map(item => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onUpdateQuantity={updateQuantity}
                                        onRemove={removeItem}
                                    />
                                ))}
                            </div>

                            {/* Footer con total y acciones */}
                            <div className="cart-footer mt-3">
                                <div className="cart-total mb-3">
                                    <h4>Total: ${total}</h4>
                                </div>
                                
                                <div className="cart-actions d-flex">
                                    <button 
                                        className="btn btn-outline-danger btn-sm me-2"
                                        onClick={clearCart}
                                    >
                                        <i className="bi bi-trash"></i>
                                        Vaciar
                                    </button>
                                    <button className="btn btn-primary">
                                        <i className="bi bi-credit-card"></i>
                                        Comprar
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <div className="cart-item d-flex align-items-center mb-3">
            <img 
                src={item.image} 
                alt={item.title}
                className="cart-item-image me-3"
            />
            
            <div className="cart-item-details flex-grow-1">
                <h6 className="cart-item-title">{item.title}</h6>
                <p className="cart-item-price">${item.price}</p>
                
                <div className="quantity-controls d-flex align-items-center mb-2">
                    <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                        <i className="bi bi-dash"></i>
                    </button>
                    <span className="quantity mx-2">{item.quantity}</span>
                    <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                        <i className="bi bi-plus"></i>
                    </button>
                </div>
                
                <div className="item-total">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
            
            <button 
                className="btn btn-outline-danger btn-sm remove-btn"
                onClick={() => onRemove(item.id)}
            >
                <i className="bi bi-x"></i>
            </button>
        </div>
    );
};
