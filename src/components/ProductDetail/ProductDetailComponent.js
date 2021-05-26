import React from 'react';
import { connect } from 'react-redux';
import {formatMoney} from "../../pipes/priceFormatter";
import { addToCart } from '../CartItem/cartFunc';

const ProductDetailComponent = (props) => {

    const {
        title,
        price,
        description,
    } = props.product;

    return (
        <aside className="col-sm-7">
            <article className="card-body p-5">
                <h3 className="title mb-3">{title}</h3>

                <p className="price-detail-wrap">
                <span className="price h3 text-warning">
                    <span className="currency">$</span><span className="num">{formatMoney(price)}</span>
                </span>
                </p>
                <dl className="item-property">
                    <dt>Description</dt>
                    <dd><p className="text-capitalize">{description}</p></dd>
                </dl>
                <hr/>
                <hr/>
                <button
                    onClick={() => addToCart(props.product, props.dispatch)}
                    className="btn btn-lg btn-outline-primary text-uppercase"><i
                    className="fa fa-shopping-cart"/> Add to cart
                </button>
            </article>
        </aside>
    );
};

export default connect()(ProductDetailComponent);
