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
import Pagination from "react-bootstrap-4-pagination";
import queryString from 'query-string';
import { filter } from 'lodash';
class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layoutColumns: 3,
            loading: false,
            filterBy: '',
            price: 1000000,
            filter: {
                page: 1,
                pageSize: 20
            }
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.getData();
    }
    getData = () => {
        this.setState({ loading: true });
        const param = queryString.stringify(this.state.filter);
        this.props.actions.getListProducts(param)
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
    filterSort = (v) => {
        this.setState({
            filterBy: v
        })
    }
    filterPrice = (v) => {
        this.setState({
            price: v
        })
    }
    change = (value, key) => {
        console.log(value, key);
        // this.setState({
        //     filter: {
        //         ...this.state.filter,
        //         [key]: value
        //     }
        // }, () => {
        //     this.getData();
        // })
    }
    render() {
        const { listProduct } = this.props.productHome;
        const { filterBy, price, filter } = this.state;

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
                                                                        <FilterBar
                                                                            filterSort={(v) => this.filterSort(v)}
                                                                            onLayoutViewClicked={(colmuns) => this.LayoutViewClicked(colmuns)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ProductListing
                                                            filterBy={filterBy}
                                                            price={price}
                                                            colSize={this.state.layoutColumns}
                                                            products={listProduct} />
                                                        <div className="mt-5">
                                                            <Pagination
                                                                threeDots
                                                                totalPages={listProduct ? Math.ceil(listProduct.total / filter.pageSize) : 0}
                                                                currentPage={filter.page}
                                                                showMax={7}
                                                                prevNext
                                                                activeBgColor="#18eaca"
                                                                activeBorderColor="#7bc9c9"
                                                                onClick={(page) => this.change(page, "page")}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3 collection-filter">

                                    <StickyBox offsetTop={20} offsetBottom={20}>
                                        <div>
                                            <Filter filterPrice={(v) => this.filterPrice(v)} />
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