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
    render() {
        return (
            <div>
                <Banner />
                <TopCollection type={'women'} />
                {/*Parallax banner*/}
                <section className="p-0">
                    <div className="full-banner parallax-banner1 parallax text-center p-left"
                        style={{
                            backgroundImage: "url(https://media.slidesgo.com/storage/50887/responsive-images/QnWBlHOUCKzBiJtMx3SALP3gSdEXAkuOYKE42JsT_Iqmneot7FALCn6PyI5xX1wm21mcZMSLxLlK0q0Y9uyrhIN-p1K8OU_EY1BkCCunLezObdjVWGoiGHbg8bU4q-LMchr61TsCo02VHneDNPHGldmE3xugmMOmcuYd5eKJuxQ1x3NteRk1GMd6WfTKG-plnDsu7g%3Ds1600___media_library_original_1600_900.png)",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}
                    >
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="banner-contain">
                                        <h2>2018</h2>
                                        <h3>fashion trends</h3>
                                        <h4>special offer</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                        <h4>free shipping</h4>
                                        <p>free shipping world wide</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgservice }} />
                                    <div className="media-body">
                                        <h4>24 X 7 service</h4>
                                        <p>online service for new customer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 service-block">
                                <div className="media">
                                    <div dangerouslySetInnerHTML={{ __html: svgoffer }} />
                                    <div className="media-body">
                                        <h4>festival offer</h4>
                                        <p>new online special festival offer</p>
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
                                <h4>Recent Story</h4>
                                <h2 className="title-inner1">from the blog</h2>
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
            </div>
        )
    }
}
export default Home;