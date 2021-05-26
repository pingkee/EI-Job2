import {connect} from 'react-redux';
import {addProductToCart, decrementCartQuantity, incrementCartQuantity, removeProductToCart} from "../../actions";

export const addToCart = (product, dispatch) => {
    dispatch(addProductToCart({...product}))
    const oldCart = localStorage.getItem('EICart');
    if (oldCart) {
        let newCart = [];
        let noChangeCart = [];
        const found = JSON.parse(oldCart).cart.find(item => item.id === product.id);
        if (found) {
            JSON.parse(oldCart).cart.map(oldcI => {
                if (product.id === oldcI.id) {
                    let quantityIncrease = {...oldcI, quantity: oldcI.quantity + 1}
                    noChangeCart.push(quantityIncrease);
                } else {
                    noChangeCart.push(oldcI);
                }
            });
            localStorage.setItem('EICart', JSON.stringify({
                cart: [...noChangeCart, ...newCart],
            }));
        } else {
            JSON.parse(oldCart).cart.map(oldCI => {
                noChangeCart.push(oldCI);
            });
            newCart.push({...product, quantity: 1});
            localStorage.setItem('EICart', JSON.stringify({
                cart: [...noChangeCart, ...newCart],
            }));
        }
        localStorage.setItem('EICart', JSON.stringify({
            cart: [...noChangeCart, ...newCart],
        }));
    } else {
        const traslProd = {...product, quantity: 1};
        localStorage.setItem('EICart', JSON.stringify({
            cart: [traslProd]
        }));
    }
};

export const removeCartItem = (id, dispatch) => {
    const oldCart = localStorage.getItem('EICart');
    if (oldCart) {
        dispatch(removeProductToCart(id));
        const cartLength = JSON.parse(oldCart).cart;
        if(cartLength && cartLength.length === 1) {
            localStorage.removeItem('EICart');
        }
    }
};

export const handleQuantityChange = (e, setItemQuantity, id, dispatch) => {
  const value = e.target.value;

    if(value > 0 && value <= 10) {
        setItemQuantity(value);
        dispatch(addProductToCart(id));
    }
};

export const incrementOrDecrement = (e, type, itemQuantity, setItemQuantity) => {
    const value = itemQuantity;

    if(type === 'inc' && value < 10) {
        setItemQuantity(itemQuantity + 1);
        // increase Q
    }


    if(type === 'desc' && value > 1) {
        setItemQuantity(itemQuantity - 1);
        // decrease Q
    }

};
