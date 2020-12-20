import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Slider from 'react-slick';
import Modal from 'react-responsive-modal';
import connect from './../../../lib/connect';
import * as actions from './../../../actions/frontEnd/cart';

class DetailsWithPrice extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
            quantity: 1,
            stock: '',
            nav3: null
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        this.setState({
            nav3: this.slider3
        });
    }
    minusQty = () => {
        if (this.state.quantity > 1) {
            this.setState({ stock: '' })
            this.setState({ quantity: this.state.quantity - 1 })
        }
    }

    plusQty = () => {
        if (this.props.item.quantity >= this.state.quantity) {
            this.setState({ quantity: this.state.quantity + 1 })
        } else {
            this.setState({ stock: 'Hết hàng !' })
        }
    }
    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }
    addCart = (item, quantity) => {
        this.props.actions.addCart(item, quantity);
        window.notify("Thêm vào giỏ hàng thành công");
    }
    render() {
        const { symbol, item, addToCartClicked, BuynowClicked, addToWishlistClicked } = this.props

        var colorsnav = {
            slidesToShow: 6,
            swipeToSlide: true,
            arrows: false,
            dots: false,
            focusOnSelect: true
        };
        return (
            <div className="col-lg-6 rtl-text">
                <div className="product-right">
                    <h2> {item.name} </h2>
                    {
                        item.discount ?
                            <React.Fragment>
                                <h4>
                                    <del>{(item.price).toLocaleString()}</del>
                                    <span>{item.discount}% off</span></h4>
                                <h3>{(item.price - (item.price * item.discount / 100)).toLocaleString()} đ</h3>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <h3>{(item.price).toLocaleString()} đ</h3>
                            </React.Fragment>
                    }
                    {item.colors ?
                        <ul >
                            <Slider {...colorsnav} asNavFor={this.props.navOne} ref={slider => (this.slider1 = slider)} className="color-variant">
                                {item.colors.map((vari, i) => {
                                    return <li className={vari.color} key={i} title={vari.color}></li>
                                })}
                            </Slider>
                        </ul> : ''}
                    <div className="product-description border-product">
                        {item.size ?
                            <div>
                                <h6 className="product-title size-text">Chọn size
                                    <span><a href="#" data-toggle="modal"
                                        data-target="#sizemodal" onClick={this.onOpenModal}>size</a></span></h6>
                                <div className="modal fade" id="sizemodal" tabIndex="-1"
                                    role="dialog" aria-labelledby="exampleModalLabel"
                                    aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered"
                                        role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title"
                                                    id="exampleModalLabel">Sheer Straight
                                                    Kurta</h5>
                                                <button type="button" className="close"
                                                    data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <img src={`/assets/images/size-chart.jpg`} alt="" className="img-fluid" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="size-box">
                                    <ul>
                                        {item.size.map((size, i) => {
                                            return <li key={i}><a href="#">{size}</a></li>
                                        })}
                                    </ul>
                                </div>
                            </div> : ''}
                        <span className="instock-cls">{this.state.stock}</span>
                        <h6 className="product-title">Số lượng</h6>
                        <div className="qty-box">
                            <div className="input-group">
                                <span className="input-group-prepend">
                                    <button type="button" className="btn quantity-left-minus" onClick={this.minusQty} data-type="minus" data-field="">
                                        <i className="fa fa-angle-left"></i>
                                    </button>
                                </span>
                                <input type="text" name="quantity" value={this.state.quantity} onChange={this.changeQty} className="form-control input-number" />
                                <span className="input-group-prepend">
                                    <button type="button" className="btn quantity-right-plus" onClick={this.plusQty} data-type="plus" data-field="">
                                        <i className="fa fa-angle-right"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="product-buttons" >
                        <a className="btn btn-solid" onClick={() => this.addCart(item, this.state.quantity)}> Thêm vào giỏ hàng</a>
                        <Link to={`/checkout`} className="btn btn-solid" onClick={() => this.addCart(item, this.state.quantity)} >Thanh toán</Link>
                    </div>
                    <div className="border-product">
                        <h6 className="product-title">Chi tiết sản phẩm</h6>
                        <p>{item.description}</p>
                    </div>
                    <div className="border-product">
                        <h6 className="product-title">share it</h6>
                        <div className="product-icon">
                            <ul className="product-social">
                                <li><a href="https://www.facebook.com/" target="_blank"><i className="fa fa-facebook"></i></a></li>
                                <li><a href="https://plus.google.com/discover" target="_blank"><i className="fa fa-google-plus"></i></a></li>
                                <li><a href="https://twitter.com/" target="_blank"><i className="fa fa-twitter"></i></a></li>
                                <li><a href="https://www.instagram.com/" target="_blank"><i className="fa fa-instagram"></i></a></li>
                            </ul>
                            {/* <button className="wishlist-btn" onClick={() => addToWishlistClicked(item)}><i
                                className="fa fa-heart"></i><span
                                    className="title-font">Add To WishList</span>
                            </button> */}
                        </div>
                    </div>
                    {/* <div className="border-product">
                        <h6 className="product-title">Time Reminder</h6>
                        <div className="timer">
                            <p id="demo">
                                <span>25
                                    <span className="padding-l">:</span>
                                    <span className="timer-cal">Days</span>
                                </span>
                                <span>22
                                    <span className="padding-l">:</span>
                                    <span className="timer-cal">Hrs</span>
                                </span>
                                <span>13
                                    <span className="padding-l">:</span>
                                    <span className="timer-cal">Min</span>
                                </span>
                                <span>57
                                    <span className="timer-cal">Sec</span>
                                </span>
                            </p>
                        </div>
                    </div> */}
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Sheer Straight Kurta</h5>
                            </div>
                            <div className="modal-body">
                                <img src={`${process.env.PUBLIC_URL}/assets/images/size-chart.jpg`} alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}


export default connect(DetailsWithPrice, state => ({
    cart: state.cart
}), actions);