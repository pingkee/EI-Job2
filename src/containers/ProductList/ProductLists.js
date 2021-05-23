import React, {useState, useEffect} from 'react';
import Product from "../../components/Product/Product";
import {connect} from 'react-redux';
import {orderByFilter} from "../../pipes/orderByFilter";
import LayoutMode from "../../components/LayoutMode/LayoutMode";

import axios from 'axios';

const ProductLists = (props) => {
    const {
        orderBy,
    } = props;
    const [products, setProducts] = useState();
    const [colValue, setcolValue] = useState('col-lg-4');
    const [gridValue, setgridValue] = useState(3);

useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then(result => setProducts(orderByFilter(result.data, orderBy)));
    
}, [orderBy, setProducts]);

const changeLayout = (n) => {
    setgridValue(n);

    let realGridValue;

    if(n === 4) {
        realGridValue = 3
    } else {
        realGridValue = 4;
    }

    setcolValue(`col-lg-${realGridValue}`);
};
    return (
        <div className="col-lg-9">
            <div className="row mb-3">
                <div className="col-12 d-none d-lg-block d-xl-block">
                    <div className="card ">
                        <div className="card-header d-flex justify-content-end">
                            <span className="mr-3">Change Layout: </span>
                            <LayoutMode len={3} isActive={gridValue === 3} click={changeLayout} />
                            <LayoutMode len={4} isActive={gridValue === 4}  click={changeLayout} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="row">
                    {products && products.map((product => {
                        let classes = `${colValue} col-md-6 mb-4`;
                        return (<div className={classes} key={product.id}>
                            <Product key={product.id} product={product} />
                        </div>)
                    }))}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    const orderBy = state.orderBy;


    return {orderBy: orderBy }
};
export default connect(mapStateToProps, null)(ProductLists);
