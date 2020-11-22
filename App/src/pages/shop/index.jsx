import React, { Component } from 'react'
import Footer from '../../components/shop/footer'
import Header from '../../components/header'
import ListProduct from '../../components/shop/listProduct'
import PageBar from '../../components/shop/pageBar'
import Banner from '../../components/shop/banner'

export default class Shop extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <Banner />
                <div className="main-container no-sidebar">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 main-content">
                                
                                {/* page bar */}

                                <PageBar/>

                                {/* List product  */}

                                <ListProduct />

                                <nav className="woocommerce-pagination navigation">
                                    <ul className="page-numbers">
                                        <li><span className="page-numbers current">1</span></li>
                                        <li><a className="page-numbers" href="#">2</a></li>
                                        <li><a className="page-numbers" href="#">3</a></li>
                                        <li><a className="next page-numbers" href="#"><i className="fa fa-long-arrow-right" /></a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row margin-0">
                    <div className="col-sm-6 padding-0">
                        <div className="block-social">
                            <div className="social">
                                <a href="#"><i className="fa fa-facebook" /></a>
                                <a href="#"><i className="fa fa-twitter" /></a>
                                <a href="#"><i className="fa fa-google-plus" /></a>
                                <a href="#"><i className="fa fa-instagram" /></a>
                                <a href="#"><i className="fa fa-pinterest" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 padding-0">
                        <div className="block-newsletter">
                            <div className="inner">
                                <h2 className="title">Join Our Newsletter</h2>
                                <p className="subtitle">Sign up our newsletter and get more events &amp; promotions!</p>
                                <form>
                                    <input type="text" placeholder="Enter your email here" className="text-input" />
                                    <button className="button"><i className="fa fa-envelope-o" /></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </React.Fragment>
        )
    }
}
