import React, {useState, useEffect, useContext} from 'react';
import Product from "../../components/Product/Product";
import ClipLoader from "react-spinners/ClipLoader";
import LayoutMode from "../../components/LayoutMode/LayoutMode";
import ContextProduct from '../../context/ContextProduct';
import { ProductStateAction } from '../../reducers/reducerProduct';

const ProductLists = (props) => {
    const {
        orderBy,
    } = props;
    const [products, setProducts] = useState();
    const [colValue, setcolValue] = useState('col-lg-4');
    const [gridValue, setgridValue] = useState(3);
    const { ProductState, ProductDispatch } = useContext(ContextProduct);

useEffect(() => {
    if(!ProductState || !ProductState.Products || !ProductState.Products[0]) {
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> {
                ProductDispatch({
                    type: ProductStateAction.INIT_PRODUCT,
                    payload: {
                        Products: json,
                    }
                });
                setProducts(json);
            });
    } else {
        setProducts(ProductState.Products);
    }
}, [ProductDispatch, ProductState, orderBy, setProducts]);


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
        <div className="col-lg-12">
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
                <div style={{textAlign: 'center'}}>
                    <ClipLoader color={'blue'} loading={!products} size={150} />
                </div>
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

export default ProductLists;
