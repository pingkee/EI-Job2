import { Reducer } from "react";

export interface ProductState {
    Products: any;
    Cart: any;
}

export const iniProductState: ProductState = {
    Products: {},
    Cart: {},
}


export const ProductStateAction = {
    INIT_PRODUCT: 'INIT_PRODUCT' as const,
    ADD_PRODUCT_TO_CART: 'ADD_PRODUCT_TO_CART' as const,
    REMOVE_PRODUCT_FROM_CART: 'REMOVE_PRODUCT_FROM_CART' as const,
    INCREMENT_CART_ITEM_QUANTITY: 'INCREMENT_CART_ITEM_QUANTITY' as const,
    DECREMENT_CART_ITEM_QUANTITY: 'DECREMENT_CART_ITEM_QUANTITY' as const,
};

interface InitStateAction {
    type: typeof ProductStateAction.INIT_PRODUCT;
    payload: {
        Products: any[];
    };
}
interface AddProductToCart {
    type: typeof ProductStateAction.ADD_PRODUCT_TO_CART
    payload: {
        Cart: any[];
    };
}
interface RemoveProductFromCart {
    type: typeof ProductStateAction.REMOVE_PRODUCT_FROM_CART
    payload: {
        Cart: any[];
    };
}
interface IncreaseCartCount {
    type: typeof ProductStateAction.INCREMENT_CART_ITEM_QUANTITY
    payload: {
        Cart: any[];
    };
}
interface DecreaseCartCount {
    type: typeof ProductStateAction.DECREMENT_CART_ITEM_QUANTITY
    payload: {
        Cart: any[];
    };
}
export type ProductStateAction =
    | InitStateAction
    | AddProductToCart
    | RemoveProductFromCart
    | IncreaseCartCount
    | DecreaseCartCount

const reducerProduct: Reducer<ProductState, ProductStateAction> = (state, action) => {

    switch (action.type) {
        case ProductStateAction.INIT_PRODUCT:
            return {
                ...state,
                Products: action.payload.Products,
            }
        case ProductStateAction.ADD_PRODUCT_TO_CART:
            return {
                ...state,
                Cart: action.payload.Cart,
            }
        case ProductStateAction.REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                Cart: action.payload.Cart,
            }
        case ProductStateAction.INCREMENT_CART_ITEM_QUANTITY:
            return {
                ...state,
                Cart: action.payload.Cart,
            }
        case ProductStateAction.DECREMENT_CART_ITEM_QUANTITY:
            return {
                ...state,
                Cart: action.payload.Cart,
            }
        default:
            throw Error('something went wrong!')
    }

};

export default reducerProduct;