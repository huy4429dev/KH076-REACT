import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as actions from './../../../actions/frontEnd/product';
import connect from './../../../lib/connect';

// import { getBestSeller, getMensWear, getWomensWear } from '../../../services/index'
// import { addToCart, addToWishlist, addToCompare } from "../../../actions/index";
import ProductItem from './productItems';

class SpecialProducts extends Component {
    componentDidMount() {
        this.props.actions.getNewProducts();
        this.props.actions.getManProducts();
        this.props.actions.getWomenProducts();
    }
    render() {

        const { symbol, addToCart, addToWishlist, addToCompare } = this.props
        const bestSeller = [];
        const mensWear = [];
        const womensWear = [];
        console.log(this.props.productHome, "abc");
        const { newProduct, manProduct, womenProduct } = this.props.productHome;
        return (
            <div>
                <div className="title1 section-t-space">
                    <h4>Sản phẩm độc quyền</h4>
                    <h2 className="title-inner1">Sản phẩm đặc biệt</h2>
                </div>
                <section className="section-b-space p-t-0">
                    <div className="container">
                        <Tabs className="theme-tab">
                            <TabList className="tabs tab-title">
                                <Tab>Sản phẩm mới</Tab>
                                <Tab>Thời trang nam</Tab>
                                <Tab>Thời trang nữ</Tab>
                            </TabList>

                            <TabPanel>
                                <div className="no-slider row">
                                    {newProduct.map((product, index) =>
                                        <ProductItem product={product}
                                            symbol={symbol}
                                            onAddToCompareClicked={() => addToCompare(product)}
                                            onAddToWishlistClicked={() => addToWishlist(product)}
                                            onAddToCartClicked={() => addToCart(product, 1)}
                                            key={index} />)
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="no-slider row">
                                    {manProduct.map((product, index) =>
                                        <ProductItem product={product}
                                            symbol={symbol}
                                            onAddToCompareClicked={() => addToCompare(product)}
                                            onAddToWishlistClicked={() => addToWishlist(product)}
                                            onAddToCartClicked={() => addToCart(product, 1)}
                                            key={index} />)
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className=" no-slider row">
                                    {womenProduct.map((product, index) =>
                                        <ProductItem product={product}
                                            symbol={symbol}
                                            onAddToCompareClicked={() => addToCompare(product)}
                                            onAddToWishlistClicked={() => addToWishlist(product)}
                                            onAddToCartClicked={() => addToCart(product, 1)}
                                            key={index}
                                        />)
                                    }
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </section>
            </div>
        )
    }
}


export default connect(SpecialProducts, state => ({
    productHome: state.productHome
}), actions);