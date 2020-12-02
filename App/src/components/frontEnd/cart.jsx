import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartPage from './../../components/frontEnd/cart-header';
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/cart';

class Cart extends Component {

    total = (items) => {
        if (items.length > 0) {
            return (
                items.reduce((a, c) => {
                    return [...a, c.quantity]
                }, []).reduce((a, c) => a + c)
            )
        } else {
            return 0;
        }
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

    render() {
        const { items } = this.props.cart;
        return (
            <li className="onhover-div mobile-cart">
                <div className="cart-qty-cls">
                    {this.total(items)}
                </div>
                <Link to={`/cart`}>
                    <img src={`/assets/images/icon/cart.png`} className="img-fluid" alt="" />
                    <i className="fa fa-shopping-cart"></i>
                </Link>
                <ul className="show-div shopping-cart">
                    {items.map((item, index) => (
                        <CartPage item={item} key={index} />
                    ))}
                    {(items.length > 0) ?
                        <div>
                            <li>
                                <div className="total">
                                    <h5>Tổng số: <span>{this.totalPrice(items)}đ</span></h5>
                                </div>
                            </li>
                            <li>
                                <div className="buttons">
                                    <Link to={`/cart`} className="view-cart">Xem giỏ hàng</Link>
                                    <Link to={`/checkout`} className="checkout">Thanh toán</Link>
                                </div>
                            </li></div>
                        :
                        <li><h5>Giỏ hàng trống</h5></li>}
                </ul>

            </li>
        )
    }
}



export default connect(Cart, state => ({
    cart: state.cart
}), actions);
