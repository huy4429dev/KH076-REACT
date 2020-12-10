import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import _ from 'lodash';
import ProductListItem from "./productListItem";
import Loadding from './../../loading';

class ProductListing extends Component {

    constructor(props) {
        super(props)

        this.state = { limit: 5, hasMoreItems: true };

    }

    render() {
        const { products, addToCart, price, symbol, addToWishlist, addToCompare, filterBy } = this.props;
        let items = [];
        if (products) {
            switch (filterBy) {
                case 'highToLow':
                    items = _.orderBy(products.items, ['price'], ['desc']);
                    break;
                case 'lowToHigh':
                    items = _.orderBy(products.items, ['price'], ['asc']);
                    break;
                case 'newest':
                    items = _.orderBy(products.items, ['created_at'], ['desc']);
                    break;
                case 'ascOrder':
                    items = _.orderBy(products.items, [pr => pr.name.toLowerCase()], ['asc']);
                    break;
                case 'descOrder':
                    items = _.orderBy(products.items, [pr => pr.name.toLowerCase()], ['desc']);
                    break;
                default:
                    items = products.items;
                    break;
            }
        }

        return (
            <div>
                <div className="product-wrapper-grid">
                    <div className="container-fluid">
                        {items.length > 0 ?
                            <InfiniteScroll
                                dataLength={this.state.limit} //This is important field to render the next data
                                next={this.fetchMoreItems}
                                hasMore={this.state.hasMoreItems}
                                // loader={<div className="loading-cls"></div>}
                                endMessage={
                                    <p className="seen-cls seen-it-cls">
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }
                            >
                                <div className="row">
                                    {
                                        items.length > 0 && items.filter(item => item.price <= price).map((product, index) => {
                                            return (
                                                <div div className={`${this.props.colSize === 3 ? 'col-xl-3 col-md-6 col-grid-box' : 'col-lg-' + this.props.colSize}`} key={index}>
                                                    <ProductListItem product={product} symbol={symbol}
                                                        onAddToCompareClicked={() => addToCompare(product)}
                                                        onAddToWishlistClicked={() => addToWishlist(product)}
                                                        onAddToCartClicked={addToCart} key={index} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </InfiniteScroll>
                            :
                            <div className="row">
                                <div className="col-sm-12 text-center section-b-space mt-5 no-found" >
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/empty-search.jpg`} className="img-fluid mb-4" />
                                    <h3>Sorry! Couldn't find the product you were looking For!!!    </h3>
                                    <p>Please check if you have misspelt something or try searching with other words.</p>
                                    <Link to={`${process.env.PUBLIC_URL}/`} className="btn btn-solid">continue shopping</Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div >
        )
    }
}

export default ProductListing;