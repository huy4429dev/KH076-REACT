import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Breadcrumb from "./../../components/frontEnd/home/breadcrumb";
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/cart';
const styles = {
    td: {
        minWidth: "150px"
    }
}
class Cart extends Component {

    constructor(props) {
        super(props)
    }
    removeFromCart = () => {

    }
    totalPrice = (items) => {
        console.log(items);
        if (items.length > 0) {
            return (
                items.reduce((a, c) => {
                    if (c.product.discount) {
                        return [...a, (c.quantity * (c.product.price - (c.product.price * c.product.discount / 100)))]
                    } else {
                        return [...a, (c.quantity * c.product.price)]
                    }
                }, []).reduce((a, c) => parseInt(a + c))
            )
        } else {
            return 0;
        }
    }
    removeCart = (item) => {
        this.props.actions.removeCart(item);
    }
    addOneItemCart = (id) => {
        this.props.actions.addOneItemCart(id);
    }
    removeOneItemCart = (id) => {
        this.props.actions.removeOneItemCart(id);
    }
    render() {
        const { symbol, total } = this.props;
        const cartItems = [];
        const { items } = this.props.cart;
        return (
            <div>
                {/*SEO Support*/}
                <Helmet>
                    <title>MultiKart | Cart List Page</title>
                    <meta name="description" content="Multikart – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses." />
                </Helmet>
                {/*SEO Support End */}

                <Breadcrumb title={'Giỏ hàng'} />

                {items.length > 0 ?
                    <section className="cart-section section-b-space">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <table className="table table-responsive-xs w-100" style={{ overflowWrap: "break-word" }}>
                                        <thead>
                                            <tr className="table-head">
                                                <th>Ảnh</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Giá</th>
                                                <th>Số lượng</th>
                                                <th>hành động</th>
                                                <th>Tổng tiền</th>
                                            </tr>
                                        </thead>
                                        {items.map((item, index) => {
                                            return (
                                                <tbody key={index}>
                                                    <tr>
                                                        <td style={styles.td}>
                                                            <Link to={`/product/${item.id}`}>
                                                                {
                                                                    item.product.images.length > 0 && (
                                                                        <img src={item.product.images[0].url} alt="" />
                                                                    )
                                                                }

                                                            </Link>
                                                        </td>
                                                        <td style={styles.td}><Link to={`/product/${item.id}`}>{item.product.name}</Link>
                                                            <div className="mobile-cart-content row">
                                                                <div className="col-xs-3">
                                                                    <div className="qty-box">
                                                                        <div className="input-group">
                                                                            <input type="text" name="quantity"
                                                                                className="form-control input-number" defaultValue={item.quantity} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xs-3">
                                                                    {
                                                                        item.product.discount ?
                                                                            <h2 className="td-color">{item.product.price - (item.product.price * item.product.discount / 100)}</h2>
                                                                            :
                                                                            <h2 className="td-color">{item.product.price}</h2>
                                                                    }
                                                                </div>
                                                                <div className="col-xs-3">
                                                                    <h2 className="td-color">
                                                                        <div className="icon" onClick={() => this.removeCart(item)}>
                                                                            <i className="icon-close"></i>
                                                                        </div>
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td style={styles.td}>
                                                            {
                                                                item.product.discount ?
                                                                    <h2>{item.product.price - (item.product.price * item.product.discount / 100)}đ</h2>
                                                                    :
                                                                    <h2>{item.product.price} đ</h2>
                                                            }

                                                        </td>
                                                        <td style={styles.td}>
                                                            <div className="qty-box">
                                                                <div className="input-group">
                                                                    <span className="input-group-prepend">
                                                                        <button type="button" className="btn quantity-left-minus" onClick={() => this.removeOneItemCart(item.product.id)} data-type="minus" data-field="">
                                                                            <i className="fa fa-angle-left"></i>
                                                                        </button>
                                                                    </span>
                                                                    <input type="text" name="quantity" value={item.quantity} readOnly={true} className="form-control input-number" />
                                                                    <span className="input-group-prepend">
                                                                        <button className="btn quantity-right-plus" onClick={() => this.addOneItemCart(item.product.id)} data-type="plus" disabled={(item.quantity >= item.product.quantity) ? true : false}>
                                                                            <i className="fa fa-angle-right"></i>
                                                                        </button>
                                                                    </span>
                                                                </div>
                                                            </div>{(item.quantity >= item.product.quantity) ? 'Quá số lượng hàng trong kho' : ''}
                                                        </td>
                                                        <td style={styles.td}>
                                                            <a className="icon" onClick={() => this.removeCart(item)}>
                                                                <i className="fa fa-times"></i>
                                                            </a>
                                                        </td>
                                                        <td style={styles.td}>
                                                            {
                                                                item.product.discount ?
                                                                    <h2 className="td-color">
                                                                        {item.quantity * (item.product.price - (item.product.price * item.product.discount / 100))}đ
                                                                    </h2>
                                                                    :
                                                                    <h2 className="td-color">
                                                                        {item.quantity * item.product.price}
                                                                    </h2>
                                                            }

                                                        </td>
                                                    </tr>
                                                </tbody>)
                                        })}
                                    </table>
                                    {/* <div className="">
                                        <tfoot>
                                            <tr >
                                                <td>Tổng :</td>
                                                <td></td>
                                            </tr>
                                        </tfoot>
                                    </div> */}
                                    <div className="d-flex justify-content-between">
                                        <div>Tổng :</div>
                                        <div><h2>{this.totalPrice(items)}đ</h2></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row cart-buttons">
                                <div className="col-6">
                                    <Link to={`/`} className="btn btn-solid">Tiếp tục mua hàng</Link>
                                </div>
                                <div className="col-6">
                                    <Link to={`/checkout`} className="btn btn-solid">Thanh toán</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    :
                    <section className="cart-section section-b-space">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div >
                                        <div className="col-sm-12 empty-cart-cls text-center">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/icon-empty-cart.png`} className="img-fluid mb-4" alt="" />
                                            <h3>
                                                <strong>Giỏ hàng trống</strong>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                }
            </div>
        )
    }
}


export default connect(Cart, state => ({
    cart: state.cart
}), actions);