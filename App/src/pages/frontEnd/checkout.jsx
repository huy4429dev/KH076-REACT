import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import SimpleReactValidator from 'simple-react-validator';
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/cart';
import * as actionsAddress from './../../actions/address';
import Breadcrumb from "./../../components/frontEnd/home/breadcrumb";
import Loading from './../../components/loadding2';
import Modal from './order';
import Select from 'react-select';
class CheckOut extends Component {

    constructor(props) {
        super(props)

        this.state = {
            payment: 'stripe',
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            country: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            create_account: '',
            loading: false,
            dataOrder: null,
            showOrder: false,
            optionsProvince: [],
            optionsDistrict: [],
            optionsWard: [],
            province: { value: "", label: "" },
            district: { value: "", label: "" },
            ward: { value: "", label: "" }
        }
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            messages: {
                required: 'Dữ liệu không hợp lệ',
                email: 'Email không hợp lệ',
                phone: "Số điện thoại không hợp lệ"
            }
        });
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        const { user, login, token } = this.props.login;
        const tokenL = localStorage.getItem("access_token");
        if (!user || !login || !token || !tokenL) {
            window.notify("Bạn cần đăng nhập để tiến hành thanh toán", "warning");
            this.props.history.push("/login");
        }
        const { items } = this.props.cart;
        if (user && login) {
            this.setState({
                username: user.username,
                email: user.email,
                phone: user.phone,
                address: user.address,
            })
        }
        if (items.length == 0) {
            window.notify('Bạn chưa thêm sản phẩm nào vào giỏ hàng', 'warning');
        }
        this.props.actions.getProvince()
            .then(data => {
                if (data.success) {
                    const newData = data.data.map(item => { return { value: item.id, label: item.name } });
                    this.setState({ optionsProvince: newData })
                }
            });
    }
    getDistrict = (id) => {
        const newId = `0${id}`.slice(-2);
        this.props.actions.getDistrict(newId)
            .then(data => {
                if (data.success) {
                    const newData = data.data.map(item => { return { value: item.id, label: item.name } });
                    this.setState({ optionsDistrict: newData })
                }
            });
    }
    handleChangeDistrict = (v) => {
        this.setState({
            district: v
        }, () => {
            this.getWard(v.value);
        })
    }
    getWard = (id) => {
        const newId = `00${id}`.slice(-3);
        this.props.actions.getWard(newId)
            .then(data => {
                if (data.success) {
                    const newData = data.data.map(item => { return { value: item.id, label: item.name } });
                    this.setState({ optionsWard: newData })
                }
            });
    }
    handleChangeWard = (v) => {
        this.setState({
            ward: v
        })
    }

    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);

    }

    setStateFromCheckbox = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.checked;
        this.setState(obj);

        if (!this.validator.fieldValid(event.target.name)) {
            this.validator.showMessages();
        }
    }

    checkhandle(value) {
        this.setState({
            payment: value
        })
    }

    StripeClick = () => {

        if (this.validator.allValid()) {
            alert('You submitted the form and stuff!');

            var handler = (window).StripeCheckout.configure({
                key: 'pk_test_glxk17KhP7poKIawsaSgKtsL',
                locale: 'auto',
                // token: (token: any) => {
                token: (token) => {
                    this.props.history.push({
                        pathname: '/order-success',
                        state: { payment: token, items: this.props.cartItems, orderTotal: this.props.total, symbol: this.props.symbol }
                    })
                }
            });
            handler.open({
                name: 'Multikart',
                description: 'Online Fashion Store',
                amount: this.amount * 100
            })
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }
    totalPrice = (items) => {
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
    addOrder = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { items } = this.props.cart;
        const { username, title, email, address, phone, district, province, ward } = this.state;
        if (!district.value || !province.value || !ward.value) {
            window.notify("Bạn cần điền đầy đủ thông tin địa chỉ", "warning");
            return;
        }
        if (this.validator.allValid()) {
            this.setState({
                loading: true
            })
            const data = {
                username: username,
                email: email,
                phone: phone,
                address: `${province.label}, ${district.label}, ${ward.label}`,
                user_id: this.props.login ? this.props.login.user.id : null,
                detailt: items,
                total: this.totalPrice(items),
                status: 1,
                ship_address: 'JNT'
            }
            this.props.actions.addOrder(data)
                .then((data) => {
                    this.setState({ loading: false });
                    if (data.success) {
                        window.notify('Thêm thành công', 'success');
                        this.setState({
                            showOrder: true,
                            dataOrder: data.data
                        })
                        this.props.actions.removeAllCart();
                    } else {
                        window.notify('Thêm không thành công', 'danger');
                    }
                }).catch((err) => {
                    this.setState({ loading: false });
                    window.notify('Thêm không thành công', 'danger');
                });
        } else {
            this.validator.showMessages();
            window.notify('Vui lòng điền đầy đủ các trường', 'danger');
        }
    }
    handleChangeProvince = (v) => {
        this.setState({
            province: v
        }, () => {
            this.getDistrict(v.value);
        })
    }
    render() {
        const { symbol } = this.props;
        const cartItems = [];
        const total = [];

        // Paypal Integration
        const onSuccess = (payment) => {
            console.log("The payment was succeeded!", payment);
            this.props.history.push({
                pathname: '/order-success',
                state: { payment: payment, items: cartItems, orderTotal: total, symbol: symbol }
            })

        }

        const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
        }

        const onError = (err) => {
            console.log("Error!", err);
        }

        const client = {
            sandbox: 'AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_',
            production: 'AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_',
        }
        const { items } = this.props.cart;
        const { optionsProvince, optionsDistrict, optionsWard } = this.state;
        return (
            <div>
                {/*SEO Support*/}
                <Helmet>
                    <title>MultiKart | CheckOut Page</title>
                    <meta name="description" content="Multikart – Multipurpose eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites. Multikart Bootstrap 4 Template will help you run multiple businesses." />
                </Helmet>
                {/*SEO Support End */}
                <Breadcrumb title={'Thanh toán'} />
                <Loading show={this.state.loading} />
                {
                    this.state.showOrder && (
                        <Modal
                            open={this.state.showOrder}
                            dataOrder={this.state.dataOrder}
                            onCloseModal={() => this.setState({ showOrder: false })}
                        />
                    )
                }
                <section className="section-b-space">
                    <div className="container padding-cls">
                        <div className="checkout-page">
                            <div className="checkout-form">
                                <form>
                                    <div className="checkout row">
                                        <div className="col-lg-6 col-sm-12 col-xs-12">
                                            <div className="checkout-title">
                                                <h3>Chi tiết hóa đơn</h3>
                                            </div>
                                            <div className="row check-out">
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Họ tên</div>
                                                    <input type="text" name="username" value={this.state.username}
                                                        value={this.state.username}
                                                        onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                        onBlur={() => this.validator.showMessageFor('username')}
                                                    />
                                                    {this.validator.message('username', this.state.username, 'required')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Điện thoại</div>
                                                    <input type="text" name="phone" value={this.state.phone}
                                                        value={this.state.phone}
                                                        onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                        onBlur={() => this.validator.showMessageFor('phone')}
                                                    />
                                                    {this.validator.message('phone', this.state.phone, 'required|phone')}
                                                </div>
                                                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                                                    <div className="field-label">Email</div>
                                                    <input type="text" name="email" value={this.state.email}
                                                        value={this.state.email}
                                                        onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                        onBlur={() => this.validator.showMessageFor('email')}
                                                    />
                                                    {this.validator.message('email', this.state.email, 'required|email')}
                                                </div>
                                                {/* <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                                    <div className="field-label">Địa chỉ</div>
                                                    <input type="text" name="address" value={this.state.address}
                                                        value={this.state.address}
                                                        onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                        onBlur={() => this.validator.showMessageFor('address')}
                                                        placeholder="Địa chỉ..." />
                                                    {this.validator.message('address', this.state.address, 'required')}
                                                </div> */}
                                                <div className="col-md-12">
                                                    <p>Tỉnh:</p>
                                                    <Select
                                                        value={this.state.province}
                                                        defaultValue={this.state.province}
                                                        onChange={(v) => this.handleChangeProvince(v)}
                                                        options={optionsProvince}
                                                        isSearchable="true"
                                                        placeholder="Tỉnh"
                                                        className="mb-2"
                                                    />
                                                    <p>Huyện:</p>
                                                    <Select
                                                        value={this.state.district}
                                                        defaultValue={this.state.district}
                                                        onChange={this.handleChangeDistrict}
                                                        options={optionsDistrict}
                                                        isSearchable="true"
                                                        placeholder="Huyện"
                                                        className="mb-2"
                                                    />
                                                    <p>Xã:</p>
                                                    <Select
                                                        value={this.state.ward}
                                                        defaultValue={this.state.ward}
                                                        onChange={this.handleChangeWard}
                                                        options={optionsWard}
                                                        isSearchable="true"
                                                        placeholder="Xã"
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-sm-12 col-xs-12">
                                            <div className="checkout-details">
                                                <div className="order-box">
                                                    <div className="title-box">
                                                        <div>Sản phẩm <span> Tổng</span></div>
                                                    </div>
                                                    <ul className="qty">
                                                        {items.map((item, index) => {
                                                            if (item.product.discount) {
                                                                return <li key={index}>{item.product.name} {(item.product.price - (item.product.price * item.product.discount / 100)).toLocaleString()} × {item.quantity} <span> {(item.quantity * (item.product.price - (item.product.price * item.product.discount / 100))).toLocaleString()} đ</span></li>
                                                            } else {
                                                                return <li key={index}>{item.product.name} {(item.product.price).toLocaleString()} × {item.quantity} <span> {(item.quantity * item.product.price).toLocaleString()} đ</span></li>
                                                            }

                                                        })
                                                        }
                                                    </ul>
                                                    <ul className="sub-total">
                                                        <li>Tổng <span className="count">{(this.totalPrice(items)).toLocaleString()}đ</span></li>
                                                        <li>Vận chuyển <div className="shipping">
                                                            <div className="shopping-option">
                                                                <input type="checkbox" name="free-shipping" id="free-shipping" />
                                                                <label htmlFor="free-shipping">Miễn phí</label>
                                                            </div>
                                                            <div className="shopping-option">
                                                                <input type="checkbox" name="local-pickup" id="local-pickup" />
                                                                <label htmlFor="local-pickup">Local Pickup</label>
                                                            </div>
                                                        </div>
                                                        </li>
                                                    </ul>

                                                    <ul className="total">
                                                        <li>Tổng tiền: <span className="count">{(this.totalPrice(items)).toLocaleString()}đ</span></li>
                                                    </ul>
                                                </div>

                                                <div className="payment-box">
                                                    <div className="upper-box">
                                                        <div className="payment-options">
                                                            <ul>
                                                                <li>
                                                                    <div className="radio-option stripe">
                                                                        <input type="radio" name="payment-group" id="payment-2" defaultChecked={true} onClick={() => this.checkhandle('stripe')} />
                                                                        <label htmlFor="payment-2">Stripe</label>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="radio-option paypal">
                                                                        <input type="radio" name="payment-group" id="payment-1" onClick={() => this.checkhandle('paypal')} />
                                                                        <label htmlFor="payment-1">PayPal<span className="image"><img src={`${process.env.PUBLIC_URL}/assets/images/paypal.png`} alt="" /></span></label>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <button type="button" className="btn-solid btn" onClick={(e) => this.addOrder(e)} >Đặt hàng</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="row section-t-space">
                                        <div className="col-lg-6">
                                            <div className="stripe-section">
                                                <h5>stripe js example</h5>
                                                <div>
                                                    <h5 className="checkout_class">dummy test</h5>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>cart number</td>
                                                                <td>4242424242424242</td>
                                                            </tr>
                                                            <tr>
                                                                <td>mm/yy</td>
                                                                <td>2/2020</td>
                                                            </tr>
                                                            <tr>
                                                                <td>cvc</td>
                                                                <td>2222</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 m-sm-t-2">
                                            <div className="stripe-section">
                                                <h5>paypal example</h5>
                                                <div>
                                                    <h5 className="checkout_class">dummy test</h5>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>cart number</td>
                                                                <td>4152521541244</td>
                                                            </tr>
                                                            <tr>
                                                                <td>mm/yy</td>
                                                                <td>11/18</td>
                                                            </tr>
                                                            <tr>
                                                                <td>cvc</td>
                                                                <td>521</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}


export default connect(CheckOut, state => ({
    login: state.login,
    cart: state.cart
}), { ...actions, ...actionsAddress });
