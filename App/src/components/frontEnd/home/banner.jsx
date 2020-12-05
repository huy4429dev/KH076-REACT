import React, { Component } from 'react';
import Slider from "react-slick";
// import Breadcrumb from "./breadcrumb";
import { Link } from 'react-router-dom';
import connect from './../../../lib/connect';
import * as actions from './../../../actions/frontEnd/product';

class Banner extends Component {
    componentDidMount() {
        const shopId = 1;
        this.props.actions.getBestSaleMen(shopId);
        this.props.actions.getBestSaleWomen(shopId);
    }

    render() {
        const { saleMen, saleWomen } = this.props.productHome;
        // const backgroundMen =  saleMen[0].images[0]. : ''
        return (
            <div>
                {/* <Breadcrumb parent={'Elements'} title={'Slider'} /> */}
                <section className="p-0">
                    <Slider className="slide-1 home-slider">
                        <div>
                            <div className="home home1 text-center"
                                style={{
                                    backgroundImage: "url(https://media.slidesgo.com/storage/117798/responsive-images/0-annual-marketing-plan___media_library_original_1600_900.png)",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }}
                            >
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h4>welcome to fashion</h4>
                                                    <h1>men fashion</h1>
                                                    <Link to={'/shop'} className="btn btn-solid">shop now</Link>
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
                                    backgroundImage: "url(https://image.freepik.com/free-vector/horizontal-fashion-banner-blog_23-2148670931.jpg)",

                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }}
                            >
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h4>welcome to fashion</h4>
                                                    <h1>men fashion</h1>
                                                    <Link to={`/shop`} className="btn btn-solid">shop now</Link>
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
                                    backgroundImage: "url(https://media.slidesgo.com/storage/135449/responsive-images/0-memphis-marketing-plan___media_library_original_1600_900.png)",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }}
                            >
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <div className="slider-contain">
                                                <div>
                                                    <h4>welcome to fashion</h4>
                                                    <h1>women fashion</h1>
                                                    <Link to={`/shop`} className="btn btn-solid">shop now</Link>
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
                                                            <h2>men</h2>
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
                                                            <h2>women</h2>
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