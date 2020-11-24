import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartPage from './../../components/frontEnd/cart-header';

class Cart extends Component {
    render() {
        const cartList = [];
        return (
            <li className="onhover-div mobile-cart">
                <div className="cart-qty-cls">
                    {cartList.length}
                </div>
                <Link to={`${process.env.PUBLIC_URL}/cart`}>
                    <img src={`/assets/images/icon/cart.png`} className="img-fluid" alt="" />
                    <i className="fa fa-shopping-cart"></i>
                </Link>
                <ul className="show-div shopping-cart">
                    {cartList.map((item, index) => (
                        <CartPage />
                    ))}
                    {(cartList.length > 0) ?
                        <div>
                            <li>
                                <div className="total">
                                    <h5>subtotal : <span>acsd</span></h5>
                                </div>
                            </li>
                            <li>
                                <div className="buttons">
                                    <Link to={`/cart`} className="view-cart">view cart</Link>
                                    <Link to={`/checkout`} className="checkout">checkout</Link>
                                </div>
                            </li></div>
                        :
                        <li><h5>Your cart is currently empty.</h5></li>}
                </ul>

            </li>
        )
    }
}



export default Cart;
