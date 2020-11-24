import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CartHeader extends Component {
    render() {
        const item = [];
        return (
            <li >
                <div className="media">
                    <Link to={``}><img alt="" className="mr-3" />
                        {/* <img alt="" className="mr-3" src={`${item.pictures[0]}`} /> */}
                    </Link>
                    <div className="media-body">
                        <Link to={`/product/`}>
                            <h4>{item.name}</h4>
                        </Link>
                        <h4>
                            <span>
                                {/* {item.qty} x {symbol} {(item.price * item.discount / 100)} */}
                            </span>
                        </h4>
                    </div>
                </div>
                <div className="close-circle">
                    <a href={null}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </a>
                </div>
            </li>
        )
    }
}



export default CartHeader;
