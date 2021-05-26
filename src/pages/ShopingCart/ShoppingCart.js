import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import {formatMoney} from "../../pipes/priceFormatter";
import CartItem from "../../components/CartItem/CartItem";
import {addProductToCart} from "../../actions";

const ShoppingCart = (props) => {
    const [cartItems, setCartItem] = useState();
    const [totalPriceCount, setTotalPriceCount] = useState(0);
    const [cartItemCount, setTCartItemCount] = useState(0);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('EICart'));
        if (props.cartItemCount > 0) {
            setCartItem(props.cartItems);
            setTCartItemCount(props.cartItemCount);
            setTotalPriceCount(props.totalPrice);
            localStorage.setItem('EICart', JSON.stringify({
                cart: props.cartItems,
            }));
        } else {
            if (cart) {
                setCartItem(cart.cart);
                setTCartItemCount(cart.cart.reduce((count, curItem) => {
                    return count + curItem.quantity;
                }, 0));
                setTotalPriceCount(cart.cart.map(tp => tp.price).reduce((a, b) => a + b, 0))
                cart.cart.map(element => {
                    props.dispatch(addProductToCart({...element}));
                })
            } else {
                setCartItem(props.cartItems);
                setTCartItemCount(props.cartItemCount);
                setTotalPriceCount(props.totalPrice);
            }
        };
    }, [props, props.cartItemCount, props.cartItems, props.totalPrice, setCartItem]);
    
    return (
        <>
                <div className="container" style={{paddingTop: '6rem'}}>
                    <div className="card shopping-cart">
                        <div className="card-header bg-dark text-light">
                            <i className="fa fa-shopping-cart pr-2" aria-hidden="true"></i>
                            Shipping cart
                            <div className="clearfix"></div>
                        </div>
                        <div className="card-body">
                            {cartItemCount ? cartItems.map(cart => (
                                <CartItem {...cart} img={cart.image} />
                            )) : <h1 className="display-4 mt-5 text-center">There is no product in your cart</h1> }
                        </div>
                        <div className="card-footer">
                            <div className="pull-right" style={{margin: '10px'}}>
                                <div className="pull-right" style={{margin: '5px'}}>
                                    Total price: <b>${formatMoney(totalPriceCount)}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    );
};

const mapStateToProps = state => {
    return {
        cartItems: state.shop.cart,
        cartItemCount: state.shop.cart.reduce((count, curItem) => {
            return count + curItem.quantity;
        }, 0),
        totalPrice: state.shop.cart.reduce((count, curItem) => {
            return count + (curItem.price * curItem.quantity);
        }, 0)
    }
}

export default connect(mapStateToProps, null)(ShoppingCart);
