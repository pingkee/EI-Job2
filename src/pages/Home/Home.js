import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {addProductToCart} from "../../actions";

const Home = (props) => {
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('EICart'));
            if (cart) {
                cart.cart.map(element => {
                    props.dispatch(addProductToCart(element));
                })
            }
    }, [props]);
    return (
            <div className="container" style={{paddingTop: '6rem'}} >
                <div className="row">
                    <div>
                        Front page for EI
                    </div>
                </div>
            </div>
    );
};


export default connect()(Home);
