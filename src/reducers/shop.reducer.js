import {
    ADD_PRODUCT_TO_CART,
    DECREMENT_CART_ITEM_QUANTITY,
    INCREMENT_CART_ITEM_QUANTITY,
    REMOVE_PRODUCT_FROM_CART,
    INIT_PRODUCT,
} from '../actions';

const initialState = {
    products: [],
    cart: [],
}
const shopReducer = (state = initialState, action ) => {
    let updatedCart;
    let updatedItemIndex;
    let updatedProduct;

    switch (action.type) {
        case INCREMENT_CART_ITEM_QUANTITY:
            updatedCart = [...state.cart];
            updatedItemIndex = updatedCart.findIndex(
                item => item.id === action.payload
            );

            const incrementedItem = {
                ...updatedCart[updatedItemIndex]
            };

            incrementedItem.quantity++;

            updatedCart[updatedItemIndex] = incrementedItem;


            return {...state, cart: updatedCart};

        case DECREMENT_CART_ITEM_QUANTITY:
            updatedCart = [...state.cart];
            updatedItemIndex = updatedCart.findIndex(
                item => item.id === action.payload
            );

            const decrementedItem = {
                ...updatedCart[updatedItemIndex]
            };

            decrementedItem.quantity--;

            updatedCart[updatedItemIndex] = decrementedItem;

            return {...state, cart: updatedCart};

        case ADD_PRODUCT_TO_CART:
            updatedCart = [...state.cart];
            updatedItemIndex = updatedCart.findIndex(item => item.id === action.payload.id);
            if (updatedItemIndex < 0) {
                updatedCart.push({...action.payload, quantity: 1});
            } else {
                console.log('updatingCart: ', updatedCart);
                console.log('payload: ', action.payload);
                const items = updatedCart.concat();
                items[updatedItemIndex] = {
                    ...action.payload,
                }

                updatedCart = items;
            }

            return {...state, cart: updatedCart};
        case REMOVE_PRODUCT_FROM_CART:
            updatedCart = [...state.cart];
            updatedItemIndex = updatedCart.findIndex(
                item => item.id === action.payload
            );

            updatedCart.splice(updatedItemIndex, 1);

            return {...state, cart: updatedCart};
        case INIT_PRODUCT:
            updatedProduct = [...state.products];
            if (action.payload.length() > 0) {
                updatedProduct.push(action.payload);
            }

            return {...state, products: updatedProduct};
        default:
            return state;

    }
};

export default shopReducer;
