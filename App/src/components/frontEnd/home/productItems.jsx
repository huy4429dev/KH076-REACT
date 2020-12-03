import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import connect from './../../../lib/connect';
import * as actions from './../../../actions/frontEnd/cart';

class ProductItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            stock: '',
            quantity: 1,
            image: ''
        }
    }

    onClickHandle(img) {
        this.setState({ image: img });
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    minusQty = () => {
        if (this.state.quantity > 1) {
            this.setState({ stock: '' })
            this.setState({ quantity: this.state.quantity - 1 })
        }
    }

    plusQty = () => {
        if (this.props.product.quantity >= this.state.quantity) {
            this.setState({ quantity: this.state.quantity + 1 })
        } else {
            this.setState({ stock: 'Quá số lượng hàng trong kho !' })
        }
    }
    changeQty = (e) => {
        this.setState({ quantity: parseInt(e.target.value) })
    }
    onAddToCartClicked = (item) => {
        this.props.actions.addCart(item, this.state.quantity);
        window.notify("Thêm vào giỏ hàng thành công");
    }
    render() {
        const { symbol, onAddToCartClicked, onAddToWishlistClicked, onAddToCompareClicked, product } = this.props;
        // const product = [];
        let RatingStars = []
        for (var i = 0; i < product?.rating; i++) {
            RatingStars.push(<i className="fa fa-star" key={i}></i>)
        }
        return (
            <div className="product-box">
                <div className="img-wrapper">
                    <div className="lable-block">
                        {(product.new == true) ? <span className="lable3">Mới</span> : ''}
                        {(product.sale == true) ? <span className="lable4">Giamr giá</span> : ''}

                    </div>
                    <div className="front">
                        <Link to={`/product/${product.id}`} ><img
                            src={product.images.length > 0 ? product.images[0].url : ''}
                            className="img-fluid"
                            alt="" /></Link>
                    </div>
                    <div className="cart-info cart-wrap">
                        <button title="Add to cart" onClick={() => this.onAddToCartClicked(product)}>
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        </button>
                        {/* <a href="javascript:void(0)" title="Add to Wishlist" onClick={onAddToWishlistClicked}>
                            <i className="fa fa-heart" aria-hidden="true"></i>
                        </a> */}
                        <a href="javascript:void(0)" data-toggle="modal"
                            data-target="#quick-view"
                            title="Quick View"
                            onClick={this.onOpenModal}><i className="fa fa-search" aria-hidden="true"></i></a>
                        {/* <Link to={`/compare`} title="Compare" onClick={onAddToCompareClicked}>
                            <i className="fa fa-refresh" aria-hidden="true"></i></Link> */}
                    </div>
                    {
                        product.images.length >= 1 ?
                            <ul className="product-thumb-list">
                                {
                                    product.images.map((vari, i) => {
                                        if (i != 0) {
                                            return (
                                                <li className={`grid_thumb_img ${(vari.url === this.state.image) ? 'active' : ''}`} key={i}>
                                                    <a href="javascript:void(0)" title="Add to Wishlist">
                                                        <img src={`${vari.url}`} onClick={() => this.onClickHandle(vari.url)} />
                                                    </a>
                                                </li>
                                            )
                                        }
                                    }
                                    )}
                            </ul> : ''
                    }

                </div>
                <div className="product-detail">
                    <div>
                        <div className="rating">
                            {RatingStars}
                        </div>
                        <Link to={`/left-sidebar/product/${product.id}`}>
                            <h6>{product.name}</h6>
                        </Link>
                        {
                            product.discount ?
                                <h4>
                                    {product.price - (product.price * product.discount / 100)}đ
                                    <del><span className="money">{product.price} đ</span></del>
                                </h4>
                                :
                                <h4>
                                    <span className="money">{product.price}</span>
                                </h4>
                        }

                        {product.variants ?
                            <ul className="color-variant">
                                {product.variants.map((vari, i) => {
                                    return (
                                        <li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images)}></li>)
                                })}
                            </ul> : ''}
                    </div>
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content quick-view-modal">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-6  col-xs-12">
                                        <div className="quick-view-img">
                                            {
                                                product.images.length > 0 ?
                                                    <img src={product.images[0].url} alt="" className="img-fluid" />
                                                    :
                                                    <img src="" alt="" className="img-fluid" />
                                            }

                                        </div>
                                    </div>
                                    <div className="col-lg-6 rtl-text">
                                        <div className="product-right">
                                            <h2> {product.name} </h2>
                                            <h3>{product.price}đ</h3>
                                            {/* {product.variants ?
                                                <ul className="color-variant">
                                                    {product.variants.map((vari, i) =>
                                                        <li className={vari.color} key={i} title={vari.color} onClick={() => this.onClickHandle(vari.images)}></li>)
                                                    }
                                                </ul> : ''} */}
                                            <div className="border-product">
                                                <h6 className="product-title">Chi tiết sản phẩm</h6>
                                                <p>{product.shortDetails}</p>
                                            </div>
                                            <div className="product-description border-product">
                                                {/* {product.size ?
                                                    <div className="size-box">
                                                        <ul>
                                                            {product.size.map((size, i) => {
                                                                return <li key={i}><a href="#">{size}</a></li>
                                                            })}
                                                        </ul>
                                                    </div> : ''} */}
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
                                            <div className="product-buttons">
                                                <button className="btn btn-solid" onClick={() => this.onAddToCartClicked(product, this.state.quantity)} >Thêm vào giỏ hàng</button>
                                                <Link to={`/product/${product.id}`} className="btn btn-solid">Xem chi tiết</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default connect(ProductItem, state => ({

}), actions);