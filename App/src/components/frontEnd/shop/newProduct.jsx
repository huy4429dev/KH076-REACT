import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import * as actions from './../../../actions/frontEnd/product';
import connect from './../../../lib/connect';

class NewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }
    componentDidMount() {
        this.props.actions.getNewProducts().then(data => {
            if (data.success) {
                this.setState({ items: data.data.items })
            }
        })
    }

    render() {
        const { symbol } = this.props;
        const { items } = this.state;

        // while (items.length > 0) {
        //     arrays.push(items.splice(0, 3));
        // }
        var settings = {
            // dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            vertical: false,
            // verticalSwiping: false,
        };
        return (
            <div className="theme-card">
                <h5 className="title-border">Sản phẩm mới</h5>
                <Slider className="offer-slider slide-1">
                    {items.length > 0 && items.map((product, index) =>
                        <div key={index}>

                            <div className="media" key={index}>
                                <Link to={`/product/${product.id}`}>
                                    <img className="img-fluid"
                                        src={`${product.images[0].url}`} alt="" /></Link>
                                <div className="media-body align-self-center">
                                    <div className="rating">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div>
                                    <Link to={`/product/${product.id}`}><h6>{product.name}</h6></Link>
                                    {
                                        product.discount ?
                                            <h4>{product.price - (product.price * product.discount / 100)}đ
                                                <del><span className="money">{product.price}đ</span></del>
                                            </h4>
                                            :
                                            <h4>
                                                <span className="money">{product.price}đ</span>
                                            </h4>
                                    }

                                </div>
                            </div>

                        </div>
                    )}
                </Slider>
            </div>
        )
    }
}


export default connect(NewProduct, state => ({

}), actions);
