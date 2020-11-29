import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/cart';

class CartHeader extends Component {
    removeCart = (item) => {
        this.props.actions.removeCart(item);
    }
    render() {
        const { item } = this.props;
        return (
            <li >
                <div className="media">
                    <Link to={``}><img alt="" className="mr-3" />
                        {item.product.images.length > 0 &&
                            < img alt="" className="mr-3" src={`${item.product.images[0].url}`} />
                        }
                    </Link>
                    <div className="media-body">
                        <Link to={`/product/`}>
                            <h4>{item.name}</h4>
                        </Link>
                        <h4>
                            <span>
                                {
                                    item.product.discount ?
                                        <React.Fragment>
                                            {item.quantity} x {item.product.price - (item.product.price * item.product.discount / 100)}
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            {item.quantity} x {(item.product.price)}
                                        </React.Fragment>
                                }
                            </span>
                        </h4>
                    </div>
                </div>
                <div className="close-circle" onClick={() => this.removeCart(item)}>
                    <a href={null}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </a>
                </div>
            </li>
        )
    }
}
export default connect(CartHeader, state => ({
    cart: state.cart
}), actions);