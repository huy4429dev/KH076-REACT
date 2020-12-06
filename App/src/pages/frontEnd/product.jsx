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
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/product';
import Loading from './../../components/loadding2';

class Product extends Component {

    constructor() {
        super();
        this.state = {
            nav1: null,
            nav2: null,
            loading: false
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const { id } = this.props.match.params;
        this.setState({ loading: true })
        this.props.actions.getDetailtProduct(id)
            .then(() => this.setState({ loading: false }))
            .catch(() => this.setState({ loading: false }))
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });

    }

    render() {
        const { symbol, addToCart, addToCartUnsafe, addToWishlist } = this.props;

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
        const { detailt } = this.props.productHome;
        return (
            <div>
                <Loading show={this.state.loading} type="full" />
                {
                    detailt && (
                        <React.Fragment>
                            <Breadcrumb title={' Sản phẩm / ' + detailt.name} />
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
                                                                {detailt.images.map((vari, index) =>
                                                                    <div key={index}>
                                                                        <ImageZoom image={vari.url} className="img-fluid image_zoom_cls-0" />
                                                                    </div>
                                                                )}
                                                            </Slider>
                                                            <SmallImages item={detailt.images} settings={productsnav} navOne={this.state.nav1} />
                                                        </div>
                                                        <DetailsWithPrice symbol={symbol} item={detailt} navOne={this.state.nav1} addToCartClicked={addToCart} BuynowClicked={addToCartUnsafe} addToWishlistClicked={addToWishlist} />
                                                    </div>
                                                </div>
                                                <DetailsTopTabs item={detailt} />
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
                            </section>
                        </React.Fragment>
                    )
                }
            </div>
        )
    }
}



export default connect(Product, state => ({
    productHome: state.productHome
}), actions);