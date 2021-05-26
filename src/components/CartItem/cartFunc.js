import {addProductToCart, removeProductToCart} from "../../actions";

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
