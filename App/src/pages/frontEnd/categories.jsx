import React, { Component } from 'react';
import Breadcrumb from "./../../components/frontEnd/home/breadcrumb";
import Filter from "./../../components/frontEnd/shop/filter";
import FilterBar from "./../../components/frontEnd/shop/filterBar";
import ProductListing from "./../../components/frontEnd/shop/productListing";
// import NewProduct from "./../../components/frontEnd/shop/newProduct";
// import StickyBox from "react-sticky-box";
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/product';
import Pagination from "react-bootstrap-4-pagination";
import Loading from "./../../components/loadding2";
import queryString from 'query-string';
import $ from 'jquery';

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
                pageSize: 10,
            }
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.getData();
        $('.page-link').on('click', (e) => e.preventDefault());
    }
    getData = () => {
        const { id } = this.props.match.params;
        this.setState({ loading: true })
        this.props.actions.getProductCategory(id, queryString.stringify(this.state.filter))
            .then(() => {
                this.setState({ loading: false })
            }).catch(() => {
                this.setState({ loading: false })
            })
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
    change = (value) => {
        this.setState({
            filter: {
                ...this.state.filter,
                page: value
            }
        }, () => {
            this.getData();
        })
    }
    render() {
        const { loading, filter, filterBy, price } = this.state;
        const { productCategory } = this.props.productCategory;
        return (
            <div>
                <Breadcrumb title={'Danh mục'} />
                <Loading show={loading} type="full" />
                <section className="section-b-space">
                    <div className="collection-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="collection-content col-md-12">
                                    <div className="page-main-content">
                                        <div className="">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="top-banner-wrapper">
                                                        <a href="#"><img src={`https://react.pixelstrap.com/multikart/assets/images/mega-menu/2.jpg`} className="img-fluid" alt="" /></a>
                                                        <div className="top-banner-content small-section">
                                                            <h4>Thời trang</h4>
                                                            {/* <h5>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h5>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p> */}
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
                                                                                    aria-hidden="true"></i> Lọc</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        {
                                                                            productCategory &&
                                                                            <FilterBar
                                                                                filterSort={(v) => this.filterSort(v)}
                                                                                products={productCategory.items}
                                                                                onLayoutViewClicked={(colmuns) => this.LayoutViewClicked(colmuns)} />
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {
                                                            productCategory &&
                                                            <ProductListing colSize={this.state.layoutColumns}
                                                                filterBy={filterBy}
                                                                products={productCategory}
                                                                price={price}
                                                            />

                                                        }
                                                        {
                                                            productCategory?.items?.length > 0 && (
                                                                <div className="mt-5">
                                                                    <Pagination
                                                                        threeDots
                                                                        totalPages={productCategory ? Math.ceil(productCategory.total / filter.pageSize) : 0}
                                                                        currentPage={filter.page}
                                                                        showMax={7}
                                                                        prevNext
                                                                        activeBgColor="#18eaca"
                                                                        activeBorderColor="#7bc9c9"
                                                                        onClick={(page) => this.change(page)}
                                                                    />
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
    productCategory: state.productHome
}), actions);