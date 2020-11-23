import React, { Component } from 'react';
import Slider from 'react-slick';
import ProductItem from './productItems';

class TopCollection extends Component {

    render() {

        // const { items, symbol, addToCart, addToWishlist, addToCompare, type } = this.props;
        const items = []
        var properties;
        // if (type === 'kids') {
        //     properties = Product5
        // } else {
        //     properties = Product4
        // }

        return (
            <div>
                {/*Paragraph*/}
                <div className="title1  section-t-space">
                    <h4>special offer</h4>
                    <h2 className="title-inner1">top collection</h2>
                </div>
                {/*Paragraph End*/}
                <section className="section-b-space p-t-0">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <Slider className="product-4 product-m no-arrow">
                                    {items.map((product, index) =>
                                        <div key={index}>
                                            <ProductItem product={product}
                                            // onAddToCompareClicked={() => addToCompare(product)}
                                            // onAddToWishlistClicked={() => addToWishlist(product)}
                                            // onAddToCartClicked={() => addToCart(product, 1)} key={index} 
                                            />
                                        </div>)
                                    }
                                </Slider>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}


export default TopCollection;