import React, { Component } from 'react';
import Banner from './../../components/frontEnd/home/banner';
import TopCollection from './../../components/frontEnd/home/topCollection';
import SpecialProducts from './../../components/frontEnd/home/specialProducts';
import BlogSection from './../../components/frontEnd/home/blockSection';
import LogoBlock from './../../components/frontEnd/home/logoBlock';
import {
    svgFreeShipping,
    svgservice,
    svgoffer
} from "./../../services/script";

class Home extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <div>
                <Banner />
                <TopCollection type={'women'} />
                {/*Parallax banner*/}
                <section className="p-0">
                    <div className="full-banner parallax-banner1 parallax text-center p-left"
                        style={{
                            backgroundImage: "url(https://ih1.redbubble.net/image.357784026.6852/cposter,small,square_product,1000x1000.2.jpg)",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}
                    >
                        {/* <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="banner-contain">
                                        <h2>2020</h2>
                                        <h3>fashion trends</h3>
                                        <h4>special offer</h4>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>
                {/*Parallax banner End*/}
                <SpecialProducts />
                {/*service layout*/}
                <div className="container">
                    <section className="service border-section small-section ">
                        <div className="row">
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgFreeShipping }} />
                                    <div className="media-body">
                                        <h4>Miễn phí vận chuyển</h4>
                                        <p>Miễn phí vận chuyển mọi nơi</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgservice }} />
                                    <div className="media-body">
                                        <h4>24 X 7 dịch vụ</h4>
                                        <p>Dịch vụ trực tuyến cho khách hàng </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgoffer }} />
                                    <div className="media-body">
                                        <h4>Lễ hội ưu đãi</h4>
                                        <p>Ưu đãi Lễ hội Đặc biệt Trực tuyến Mới</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {/*Blog Section end*/}
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="title1 section-t-space">
                                <h4>Gần đây</h4>
                                <h2 className="title-inner1">Từ bài viết</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="blog p-t-0">
                    <BlogSection />
                </section>
                {/*Blog Section End*/}

                {/*logo section*/}
                <LogoBlock />
                {/*logo section end*/}
            </div >
        )
    }
}
export default Home;