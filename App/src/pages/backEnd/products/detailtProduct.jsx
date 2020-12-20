import React, { Component, Fragment } from 'react'
import Breadcrumb from '../../../components/backEnd/breadCrumb';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from 'react-responsive-modal';
import StarRatingComponent from 'react-star-rating-component';
import * as actions from '../../../actions/backEnd/product';
import connect from '../../../lib/connect';
import Loading from '../../../components/backEnd/loading';
import ReactTooltip from 'react-tooltip';

// image import
import two from '../../../assets/images/pro3/2.jpg';
import twentySeven from './../../../assets/images/pro3/27.jpg';
import one from '../../../assets/images/pro3/1.jpg';
import size_chart from '../../../assets/images/size-chart.jpg'


class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 1,
            rating: 5,
            open: false,
            nav1: null,
            nav2: null,
            product: null,
            id: 0
        }
    }



    componentDidMount() {

        const { id } = this.props.match.params;
        const { getProduct } = this.props.actions;
        this.setState({
            loading: true,
            id
        });

        getProduct(id)
            .then(data => {
                this.setState({ loading: false, product: data.data });
            })
            .catch(err => {
                this.setState({ loading: false });
                window.notify("Xảy ra lỗi: " + err.message);
            });

        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }
    onStarHover(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    } /* on icon hover handler */
    onStarHoverOut(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }
    IncrementItem = () => {
        this.setState(prevState => {
            if (prevState.quantity < 9) {
                return {
                    quantity: prevState.quantity + 1
                }
            } else {
                return null;
            }
        });
    }
    DecreaseItem = () => {
        this.setState(prevState => {
            if (prevState.quantity > 0) {
                return {
                    quantity: prevState.quantity - 1
                }
            } else {
                return null;
            }
        });
    }
    handleChange = (event) => {
        this.setState({ quantity: event.target.value });
    }

    render() {
        const { open, product } = this.state;
        const { rating } = this.state;
        console.log(product, 'PRODUCT DETAIL');;

        return (

            <Fragment>
                <Breadcrumb title="CHI TIẾT SẢN PHẨM" parent="SẢN PHẨM" />

                <div className="container-fluid">
                    <div className="card">
                        <div className="row product-page-main card-body">
                            <div className="col-xl-4">
                                <Slider asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)}
                                    className="product-slider">
                                    {

                                        product?.images != null ?
                                            product.images.length > 0 ?
                                                product.images.map(item => (
                                                    <div className="item">
                                                        <img className="img-fluid" src={item.url} alt="" />
                                                    </div>

                                                ))
                                                :
                                                <div className="item">
                                                    <img className="img-fluid" src={product?.images?.length > 0 ? product.images[0].url : one} alt="" />
                                                </div>
                                            : <Loading />
                                    }
                                </Slider>

                                <Slider
                                    asNavFor={this.state.nav1}
                                    ref={slider => (this.slider2 = slider)}
                                    slidesToShow={product?.images ? product.images.length : 1}
                                    swipeToSlide={true}
                                    focusOnSelect={true}
                                    className="small-slick"
                                >
                                    {

                                        product?.images != null ?
                                            product.images.length > 0 ?
                                                product.images.map(item => (
                                                    <div className="item">
                                                        <img className="img-fluid" src={item.url} alt="" />
                                                    </div>

                                                ))
                                                :
                                                <div className="item">
                                                    <img className="img-fluid" src={product?.images?.length > 0 ? product.images[0].url : one} alt="" />
                                                </div>
                                            : <Loading />
                                    }
                                </Slider>
                            </div>
                            <div className="col-xl-8">
                                <div className="product-page-details product-right mb-0">
                                    <h2>{product?.name}</h2>
                                    <div style={{ fontSize: 27, height: 31 }}>
                                        <StarRatingComponent
                                            name="rate1"
                                            starCount={5}
                                            value={rating}
                                            onStarClick={this.onStarClick.bind(this)}
                                            onStarHover={this.onStarHover.bind(this)}
                                            onStarHoverOut={this.onStarHoverOut.bind(this)}
                                        />
                                    </div>
                                    <hr />
                                    <h6 className="product-title">Mô tả</h6>
                                    <div dangerouslySetInnerHTML={{ __html: product?.description }}>
                                    </div>
                                    <div className="product-price digits mt-2">
                                        <h3>{product?.price != null ? product?.price.toLocaleString() : 0} đ</h3>
                                    </div>
                                    <label className="d-block mr-2 d-flex">
                                        {
                                            product?.colors != null &&
                                                product.colors.length > 0 ?

                                                product.colors.map(item => (
                                                    <span
                                                        data-tip={item.name}
                                                        className='d-block mr-1'
                                                        style={{
                                                            width: '30px',
                                                            height: '30px',
                                                            background: item.color,
                                                            opacity: 1,
                                                            cursor: 'pointer',
                                                            borderRadius: '100%',
                                                            marginRight: '5px',
                                                        }}>
                                                    </span>
                                                ))
                                                : <span>none</span>


                                        }
                                    </label>
                                    <hr />
                                    <h6 className="product-title size-text">Kích cỡ
                                        <span className="pull-right">
                                            <a data-toggle="modal" data-target="#sizemodal" onClick={this.onOpenModal}>size chart</a>
                                        </span>
                                    </h6>
                                    <Modal open={open} onClose={this.onCloseModal}>
                                        <div>
                                            <img src={size_chart} alt="" className="img-fluid blur-up lazyloaded" />
                                        </div>
                                    </Modal>
                                    <div className="size-box">
                                        <ul>
                                            {
                                                product?.size != null &&
                                                product.sizes.length > 0 &&
                                                product.sizes.map(item => (
                                                    <li className="active" style={{ lineHeight: '30px', fontSize: '18px' }}>s</li>
                                                ))

                                            }
                                        </ul>
                                    </div>
                                    <div className="add-product-form">
                                        <h6 className="product-title mt-2">Số lượng tồn</h6>
                                        <span>
                                            {product?.quantity}
                                        </span>
                                    </div>
                                    <hr />
                                    {/* <h6 className="product-title">Time Reminder</h6>
                                    <div className="timer">
                                        <p id="demo"><span>25 <span className="padding-l">:</span> <span className="timer-cal">Days</span> </span><span>22 <span className="padding-l">:</span> <span className="timer-cal">Hrs</span> </span><span>13 <span className="padding-l">:</span> <span className="timer-cal">Min</span> </span><span>57 <span className="timer-cal">Sec</span></span>
                                        </p>
                                    </div>
                                    <div className="m-t-15">
                                        <button className="btn btn-primary m-r-10" type="button">Sửa</button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Fragment >
        )
    }
}

export default connect(Detail, state => (
    {
    }
), actions);

