import React from 'react';
import ProductLists from "../../containers/ProductList/ProductLists";

const ProductPage = () => {
    return (
        <React.Fragment>
            <div className="container" style={{paddingTop: '6rem'}} >
                <div className="row">
                    <ProductLists/>
                </div>
            </div>
        </React.Fragment>
    );
};


export default ProductPage;
