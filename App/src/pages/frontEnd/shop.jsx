import React, { Component } from 'react';
import Breadcrumb from "./../../components/frontEnd/home/breadcrumb";
import Filter from "./../../components/frontEnd/shop/filter";
import FilterBar from "./../../components/frontEnd/shop/filterBar";
import ProductListing from "./../../components/frontEnd/shop/productListing";
import NewProduct from "./../../components/frontEnd/shop/newProduct";
import StickyBox from "react-sticky-box";
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/product';
// import Loadding from './../../components/loading';
import Loadding from './../../components/loadding2';

class Shop extends Component {
    state = {
        layoutColumns: 3,
        loading: false
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.setState({ loading: true });
        this.props.actions.getListProducts()
            .then(() => this.setState({ loading: false }))
            .catch(() => this.setState({ loading: false }));
    }
    LayoutViewClicked(colums) {
        this.setState({
            layoutColumns: colums
        })
    }

    openFilter = () => {
        document.querySelector(".collection-filter").style = "left: -15px";
    }

    render() {
        const { listProduct } = this.props.productHome;
        return (
            <div>
                <Loadding show={this.state.loading} type="full" />
                <Breadcrumb title={'Sản phẩm'} />
                <section className="section-b-space">
                    <div className="collection-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="collection-content col">
                                    <div className="page-main-content">
                                        <div className="">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="top-banner-wrapper">
                                                        <a href="#"><img src={`https://media.slidesgo.com/storage/222093/conversions/0-beauty-salon-business-plan-thumb.jpg`} className="img-fluid" alt="" /></a>
                                                        <div className="top-banner-content small-section">
                                                            <h4>Thời trang</h4>
                                                            <h5>Cam kết với sản phẩm</h5>
                                                            <p>Là thương hiệu uy tín</p>
                                                        </div>
                                                    </div>
                                                    <div className="collection-product-wrapper">
                                                        <div className="product-top-filter">
                                                            <div className="container-fluid p-0">
                                                                <div className="row">
                                                                    <div className="col-xl-12">
                                                                        <div className="filter-main-btn">
                                                                            <span onClick={this.openFilter}
                                                                                className="filter-btn btn btn-theme"><i
                                                                                    className="fa fa-filter"
                                                                                    aria-hidden="true"></i>Bộ lọc</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <FilterBar onLayoutViewClicked={(colmuns) => this.LayoutViewClicked(colmuns)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ProductListing colSize={this.state.layoutColumns} products={listProduct} />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 collection-filter">

                                    <StickyBox offsetTop={20} offsetBottom={20}>
                                        <div>
                                            <Filter />
                                            <NewProduct />
                                            <div className="collection-sidebar-banner">
                                                <a href="#">
                                                    <img src={`${process.env.PUBLIC_URL}/assets/images/side-banner.png`} className="img-fluid" alt="" />
                                                </a>
                                            </div>
                                        </div>
                                    </StickyBox>
                                    {/*side-bar banner end here*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default connect(Shop, state => ({
    productHome: state.productHome
}), actions);