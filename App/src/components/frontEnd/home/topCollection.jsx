import React, { Component } from 'react';
import Slider from 'react-slick';
import ProductItem from './productItems';
import connect from './../../../lib/connect';
import * as actions from './../../../actions/frontEnd/product';

class TopCollection extends Component {

    componentDidMount() {
        const shopId = 1;
        this.props.actions.getTopProducts(shopId);
    }

    render() {
        const items = [];
        const { topProduct } = this.props.productHome;
        var properties;

        return (
            <div>
                {/*Paragraph*/}
                <div className="title1  section-t-space">
                    <h4>Sản phẩm đặc biệt</h4>
                    <h2 className="title-inner1">Top Bộ sưu tập</h2>
                </div>
                {/*Paragraph End*/}
                <section className="section-b-space p-t-0">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <Slider className="product-4 product-m no-arrow">
                                    {topProduct.map((product, index) =>
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


export default connect(TopCollection, state => ({
    productHome: state.productHome
}), actions);