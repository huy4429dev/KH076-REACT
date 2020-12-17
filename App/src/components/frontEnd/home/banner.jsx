import React, { Component } from 'react';
import Slider from "react-slick";
// import Breadcrumb from "./breadcrumb";
import { Link } from 'react-router-dom';
import connect from './../../../lib/connect';
import * as actions from './../../../actions/frontEnd/product';

class Banner extends Component {
    componentDidMount() {
        this.props.actions.getBestSaleMen();
        this.props.actions.getBestSaleWomen();
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            autoplaySpeed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true,
        };
        const { saleMen, saleWomen } = this.props.productHome;
        // const backgroundMen =  saleMen[0].images[0]. : ''
        return (
            <div>
                {/* <Breadcrumb parent={'Elements'} title={'Slider'} /> */}
                <section className="p-0">
                    <Slider className="slide-1 home-slider" {...settings}>
                        <div>
                            <div className="home home1 text-center"
                                style={{
                                    backgroundImage: "url(https://images.unsplash.com/photo-1513373319109-eb154073eb0b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80)",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }}
                            >
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h4>Chào mừng đến với Multikart</h4>
                                                    <h1>Thời trang nam</h1>
                                                    <Link to={'/shop'} className="btn btn-solid">Mua sắm nào</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="home home1 text-center"
                                style={{
                                    backgroundImage: "url(https://images.unsplash.com/photo-1603252109360-909baaf261c7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",

                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }}
                            >
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h4>Chào mừng đến với Multikart</h4>
                                                    <h1>Thời trang nam</h1>
                                                    <Link to={'/shop'} className="btn btn-solid">Mua sắm nào</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="home home2 text-center"
                                style={{
                                    backgroundImage: "url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }}
                            >
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h4>Chào mừng đến với Multikart</h4>
                                                    <h1>Thời trang nữ</h1>
                                                    <Link to={'/shop'} className="btn btn-solid">Mua sắm nào</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </section>
                {/*Home Section End*/}
                {/*collection banner*/}
                <section className="pb-0">
                    <div className="container">
                        <div className="row partition2">
                            {
                                saleMen.map((item, index) => {
                                    return (
                                        <div className="col-md-6" key={index}>
                                            <Link to={`/product/${item.id}`}>
                                                <div className="collection-banner p-right text-center">
                                                    <img src={item.images[0].url} className="img-fluid" alt="" />
                                                    <div className="contain-banner">
                                                        <div>
                                                            <h4>save 30%</h4>
                                                            <h2>Phái nữ</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                            {
                                saleWomen.map((item, index) => {
                                    return (
                                        <div className="col-md-6">
                                            <Link to={`/product/${item.id}`}>
                                                <div className="collection-banner p-right text-center">
                                                    <img src={item.images[0].url} className="img-fluid" alt="" />
                                                    <div className="contain-banner">
                                                        <div>
                                                            <h4>save 60%</h4>
                                                            <h2>Phái nữ</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section>
                {/*collection banner end*/}
            </div >
        )
    }
}

export default connect(Banner, state => ({
    productHome: state.productHome
}), actions);