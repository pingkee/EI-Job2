import React, {useContext, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import ContextProduct from '../../context/ContextProduct';
import ProductDetailComponent from '../../components/ProductDetail/ProductDetail';
import ProductSlider from "../../components/ProductSlider/ProductSlider";

const ProductDetail = (props) => {
    const [data, setData] = useState();
    const { ProductState } = useContext(ContextProduct);
    useEffect(() => {
        if(!ProductState || !ProductState.Products || !ProductState.Products[0]) {
            fetch(`'https://fakestoreapi.com/products/'${props.match.params.id.toString()}`)
                .then(res=>res.json())
                .then(json=> {
                    setData(json);
                });
        } else {
            setData(ProductState.Products.find((item) => (item.id.toString() === props.match.params.id.toString())));
        }
    }, [ProductState, ProductState.Products, props.match.params.id, setData]);

    return (
        <div className="container" style={{padding: '6rem 0'}}>
            <div className="card">
                <div style={{textAlign: 'center'}}>
                    <ClipLoader color={'blue'} loading={!data} size={150} />
                </div>
                { data && (
                    <div className="row">
                        <ProductSlider image={data.image}/>
                        <ProductDetailComponent product={data}/>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state, props) =>  {

    const product = state.shop.products.find(product => product.id === +props.match.params.id);
    return {
        product
    }
};



export default connect(mapStateToProps, null)(ProductDetail);
