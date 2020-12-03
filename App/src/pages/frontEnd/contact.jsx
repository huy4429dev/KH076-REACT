import React, { Component } from 'react';
import Breadcrumb from "./../../components/frontEnd/home/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/contact';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            phone: "",
            address: '',
            message: ''
        }
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }
    addContact = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (this.validator.allValid()) {
            let data = null;
            if (this.props.login.login) {
                data = {
                    email: this.state.email,
                    username: this.state.username,
                    phone: this.state.phone,
                    address: this.state.address,
                    message: this.state.message,
                    idUser: this.props.login.user.id
                }
            } else {
                data = {
                    email: this.state.email,
                    username: this.state.username,
                    phone: this.state.phone,
                    address: this.state.address,
                    message: this.state.message,
                    idUser: null
                }
            }
            this.props.actions.addContact(data)
                .then(() => {
                    // this.setState({ loading: false });
                    window.notify('Thêm liên hệ thành công', 'success');
                }).catch((err) => {
                    // this.setState({ loading: false });
                    window.notify('Thêm liên hệ không thành công', 'danger');
                });
        } else {
            this.validator.showMessages();
            window.notify('Vui lòng điền đầy đủ các trường', 'danger');
        }
    }
    render() {
        return (
            <div>
                <Breadcrumb title={'Liên hệ'} />
                {/*Forget Password section*/}
                <section className=" contact-page section-b-space">
                    <div className="container">
                        <div className="row section-b-space">
                            <div className="col-lg-7 map">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8396925331867!2d108.14772551478403!3d16.073806443584967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218d68dff9545%3A0x714561e9f3a7292c!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBLaG9hIC0gxJDhuqFpIGjhu41jIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1606745044026!5m2!1svi!2s"
                                    allowFullScreen></iframe>
                            </div>
                            <div className="col-lg-5">
                                <div className="contact-right">
                                    <ul>
                                        <li>
                                            <div className="contact-icon">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/icon/phone.png`} alt="Generic placeholder image" />
                                                <h6>Liên hệ</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>0966756104</p>
                                                <p>0966789654</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                <h6>Địa chỉ</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>Cửa hàng thời trang</p>
                                                <p>VN 123456</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <img src={`${process.env.PUBLIC_URL}/assets/images/icon/email.png`} alt="Generic placeholder image" />
                                                <h6>Email</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>shoponline@Shopcart.com</p>
                                                <p>abc@shopcart.com</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="contact-icon">
                                                <i className="fa fa-fax" aria-hidden="true"></i>
                                                <h6>Fax</h6>
                                            </div>
                                            <div className="media-body">
                                                <p>Support@Shopcart.com</p>
                                                <p>info@shopcart.com</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <form className="theme-form">
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <label htmlFor="name">Họ Tên</label>
                                            <input type="text" className="form-control" id="name"
                                                placeholder="Họ..." required=""
                                                name="username"
                                                value={this.state.username}
                                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                onBlur={() => this.validator.showMessageFor('username')}
                                            />
                                            {this.validator.message('username', this.state.username, 'required', { className: 'text-danger' })}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="phone">Điện thoại<img src="" alt="" sizes="" srcset="" /></label>
                                            <input type="text" className="form-control" id="last-name"
                                                placeholder="Điện thoại..." required=""
                                                name="phone"
                                                value={this.state.phone}
                                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                onBlur={() => this.validator.showMessageFor('phone')}
                                            />
                                            {this.validator.message('phone', this.state.phone, 'required|numeric', { className: 'text-danger' })}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="review">Điạ chỉ</label>
                                            <input type="text" className="form-control" id="review"
                                                placeholder="Địa chỉ..." required=""
                                                name="address"
                                                value={this.state.address}
                                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                onBlur={() => this.validator.showMessageFor('address')}
                                            />
                                            {this.validator.message('address', this.state.email, 'required', { className: 'text-danger' })}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" id="email" placeholder="Email..."
                                                required=""
                                                name="email"
                                                value={this.state.email}
                                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                onBlur={() => this.validator.showMessageFor('email')}
                                            />
                                            {this.validator.message('email', this.state.email, 'required|email', { className: 'text-danger' })}
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="review"></label>
                                            <textarea className="form-control" placeholder="Tin nhắn..."
                                                id="exampleFormControlTextarea1" rows="6"
                                                name="message"
                                                value={this.state.message}
                                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                onBlur={() => this.validator.showMessageFor('message')}
                                            ></textarea>
                                            {this.validator.message('message', this.state.message, 'required', { className: 'text-danger' })}
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" onClick={(e) => this.addContact(e)}>Gửi liên hệ</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default connect(Contact, state => ({
    login: state.loginHome,
}), actions);