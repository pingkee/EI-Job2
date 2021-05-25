import { createContext, Dispatch } from 'react';
import { iniProductState, ProductState, ProductStateAction } from '../reducers/reducerProduct';


export interface ContextProductType {
    ProductState: ProductState;
    ProductDispatch: Dispatch<ProductStateAction>;
}

export default createContext<ContextProductType>({
    ProductState: iniProductState,
    ProductDispatch: () => { },
})