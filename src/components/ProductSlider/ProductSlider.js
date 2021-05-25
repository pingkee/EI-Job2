import React from 'react';
import './ProductSlider.scss';

const ProductSlider = (
    {
        image
    }
) => {
    const imageRef = React.createRef();

    return (
        <aside className="col-sm-5 border-right">
            <article className="gallery-wrap">
                <div className="img-big-wrap">
                    <div style={{padding: '2rem'}}><img
                        ref={imageRef}
                        src={image}
                        alt={image}
                        style={{width: '100%',
                                height: '100%'}}
                    /></div>
                </div>
                <div className="img-small-wrap">
                    {/* <img src={img} alt='img' /> */}
                    {/* {image.map((img , i ) => (
                        <div className="item-gallery" onClick={() => {changeImage(i)}}><img src={img}/></div>
                    ))} */}
                </div>
            </article>
        </aside>
    );
};

export default ProductSlider;