import React, { Component } from 'react';
import Slider from 'react-slick';

// import custom Components
// import Service from "./common/service";
// import BrandBlock from "./common/brand-block";
import NewProduct from "./../../components/frontEnd/shop/newProduct";
import Breadcrumb from "./../../components/frontEnd/home/breadcrumb";
// import DetailsTopTabs from "./common/details-top-tabs";
import ImageZoom from './../../components/frontEnd/product/imageZoom';
import SmallImages from './../../components/frontEnd/product/smallImage'
import DetailsWithPrice from './../../components/frontEnd/product/detailtPrice'
import DetailsTopTabs from './../../components/frontEnd/product/detailtTopTabs';
import Service from './../../components/frontEnd/product/service';


class Product extends Component {

    constructor() {
        super();
        this.state = {
            nav1: null,
            nav2: null
        };
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });

    }

    render() {
        const { symbol, addToCart, addToCartUnsafe, addToWishlist } = this.props;
        const item = [];
        var products = {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            fade: true
        };
        var productsnav = {
            slidesToShow: 3,
            swipeToSlide: true,
            arrows: false,
            dots: false,
            focusOnSelect: true
        };

        return (
            <div>

                <Breadcrumb title={' Product / ' + item.name} />

                {/*Section Start*/}
                {(item) ?
                    <section className="section-b-space">
                        <div className="collection-wrapper">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-9 col-sm-12 col-xs-12">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-xl-12">
                                                    <div className="filter-main-btn mb-2">
                                                        <span className="filter-btn">
                                                            <i className="fa fa-filter" aria-hidden="true"></i> filter</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6 product-thumbnail">
                                                    <Slider asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)} className="product-slick">
                                                        {item.map((vari, index) =>
                                                            <div key={index}>
                                                                <ImageZoom image={vari.images} className="img-fluid image_zoom_cls-0" />
                                                            </div>
                                                        )}
                                                    </Slider>
                                                    <SmallImages item={item} settings={productsnav} navOne={this.state.nav1} />
                                                </div>
                                                <DetailsWithPrice symbol={symbol} item={item} navOne={this.state.nav1} addToCartClicked={addToCart} BuynowClicked={addToCartUnsafe} addToWishlistClicked={addToWishlist} />
                                            </div>
                                        </div>
                                        <DetailsTopTabs item={item} />
                                    </div>
                                    <div className="col-sm-3 collection-filter">

                                        <Service />
                                        {/*side-bar single product slider start*/}
                                        <NewProduct />
                                        {/*side-bar single product slider end*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> : ''}
                {/*Section End*/}

            </div>
        )
    }
}



export default Product;