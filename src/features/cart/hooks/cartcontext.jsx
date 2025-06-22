import React, { createContext, useContext, useReducer, useRef, useEffect } from 'react';
import { useNotification } from './useNotification';

const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  TOGGLE_CART: 'TOGGLE_CART'
};

const initialState = {
  items: [],
  isOpen: false,
  total: 0,
   itemsCount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, action.payload];
      }
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemsCount: updatedItems.reduce((count, item) => count + item.quantity, 0),
      };
    }
    case CART_ACTIONS.REMOVE_ITEM: {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemsCount: updatedItems.reduce((count, item) => count + item.quantity, 0),
      };
    }
    case CART_ACTIONS.UPDATE_ITEM: {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemsCount: updatedItems.reduce((count, item) => count + item.quantity, 0),
      };
    }
    case CART_ACTIONS.CLEAR_CART:
      return initialState;

    case CART_ACTIONS.TOGGLE_CART:
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
    
  }
};

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const cartRef = useRef(null);
    const timeoutRef = useRef(null);
    const { showNotification } = useNotification();

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (cartRef.current && !cartRef.current.contains(event.target)) {
          dispatch({ type: CART_ACTIONS.TOGGLE_CART });
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    useEffect(() =>
        {
          if (state.isOpen) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              dispatch({ type: CART_ACTIONS.TOGGLE_CART });
            }, 5000);
          } else {
            clearTimeout(timeoutRef.current);
          }
        }
        , [state.isOpen]);

    const addItem = (item) => {
      dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });
      showNotification('Producto agregado al carrito', 'success');
    }

    const removeItem = (id) => {
      dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id } });
      showNotification('Producto eliminado del carrito', 'info');
    }

    const clearCart = () =>
    {
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
      showNotification('Carrito vaciado', 'warning');
    }

    const toggleCart = () => {
      dispatch({ type: CART_ACTIONS.TOGGLE_CART });
    }

    return (
      <CartContext.Provider value={{
        ...state,
        addItem,
        removeItem,
        clearCart,
        toggleCart,
        cartRef,
        dispatch
      }}>
        {children}
      </CartContext.Provider>
    );
}
export default CartContext;