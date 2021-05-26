import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {formatMoney} from "../../pipes/priceFormatter";

import './Product.scss';
import { addToCart } from '../CartItem/cartFunc';


const Product = (props) => {

    const {
        title,
        price,
        image,
        description,
        id,
    } = props.product;

    const imageRef = React.createRef();

    return (
        <div className="card h-100 product">
            <Link to={`/products/${id}`} className="product__link"><img
                className="card-img-top product__img" src={image} alt={title} ref={imageRef}/>
                {/* <SlideDots len={image.length} activeItem={aItem} changeItem={changeImage}/> */}
            </Link>
            <div className="card-body product__text">
                <h4 className="card-title product__title">
                    <Link to={`/products/${id}`}>{title}</Link>
                </h4>
                <h5 className="product__price">${formatMoney(price)}</h5>
                <p className="card-text product__description">{description}</p>
                <button
                    onClick={() => {addToCart(props.product, props.dispatch)}}
                    className="btn btn-info product__add-to-cart">Add to cart
                </button>
            </div>
        </div>
    );
};

export default connect()(Product);
