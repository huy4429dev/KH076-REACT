import React, { Component } from 'react';
import Slider from "react-slick";
// import Breadcrumb from "./breadcrumb";
import { Link } from 'react-router-dom'

class Banner extends Component {

    render() {
        return (
            <div>
                {/* <Breadcrumb parent={'Elements'} title={'Slider'} /> */}
                <section className="p-0">
                    <Slider className="slide-1 home-slider">
                        <div>
                            <div className="home home1 text-center"
                                style={{
                                    backgroundImage: "url(https://media.slidesgo.com/storage/50128/responsive-images/teWPFDlO0roD0dA_i8NepvLsQf3L8UIiNyBMNFAee37nY219CSgaQcJmhuCt1tXpe2JTIkeLeIpQxxuL9m2q4D4Wb5lz59klsaHiqrHY9pzZ1Qfv7qkxiaPSZI1eQgSU4fAspFULrV4aWgJV3EXZnJXW426LR7mWfDLEdTo4bt72fDKB_rVy99CCLkqS1DMB13rfdw%3Ds1600___media_library_original_1600_900.png)",
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
                                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} className="btn btn-solid">shop now</Link>
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
                                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} className="btn btn-solid">shop now</Link>
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
                                                    <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`} className="btn btn-solid">shop now</Link>
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
                            <div className="col-md-6">
                                <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}>
                                    <div className="collection-banner p-right text-center">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/sub-banner1.jpg`} className="img-fluid" alt="" />
                                        <div className="contain-banner">
                                            <div>
                                                <h4>save 30%</h4>
                                                <h2>men</h2>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-6">
                                <Link to={`${process.env.PUBLIC_URL}/left-sidebar/collection`}>
                                    <div className="collection-banner p-right text-center">
                                        <img src={`${process.env.PUBLIC_URL}/assets/images/sub-banner2.jpg`} className="img-fluid" alt="" />
                                        <div className="contain-banner">
                                            <div>
                                                <h4>save 60%</h4>
                                                <h2>women</h2>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                {/*collection banner end*/}
            </div >
        )
    }
}
export default Banner;
