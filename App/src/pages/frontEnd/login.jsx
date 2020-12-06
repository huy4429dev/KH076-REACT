import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Breadcrumb from "./../../components/frontEnd/home/breadcrumb";
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/login';
import { Link, Redirect } from 'react-router-dom';
import Loading from './../../components/loadding2';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false
        }
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }
    login = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { password, email } = this.state;
        if (this.validator.allValid()) {
            this.setState({
                loading: true
            })
            const data = {
                email: this.state.email,
                password: this.state.password
            }
            this.props.actions.login(data)
                .then((data) => {
                    this.setState({ loading: false });
                    if (data.token) {
                        window.notify('Đăng nhập thành công', 'success');
                        // this.props.history.push('/');
                    } else {
                        window.notify('Đăng nhập không thành công', 'danger');
                    }
                }).catch((err) => {
                    this.setState({ loading: false });
                    window.notify('Đăng nhập không thành công', 'danger');
                });
        } else {
            this.validator.showMessages();
            window.notify('Vui lòng điền đầy đủ các trường', 'danger');
        }
    }
    render() {
        return (
            <div>
                <Breadcrumb title={'Đăng nhập'} />
                <Loading type="full" show={this.state.loading} />
                {/*Login section*/}
                <section className="login-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h3>Login</h3>
                                <div className="theme-card">
                                    <form className="theme-form">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" id="email" placeholder="Email"
                                                required=""
                                                name="email"
                                                value={this.state.email}
                                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                onBlur={() => this.validator.showMessageFor('email')}
                                            />
                                            {this.validator.message('email', this.state.email, 'required|email', { className: 'text-danger' })}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="review">Password</label>
                                            <input type="password" className="form-control" id="review"
                                                placeholder="Mật khẩu..." required=""
                                                name="password"
                                                value={this.state.password}
                                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                onBlur={() => this.validator.showMessageFor('password')}
                                            />
                                            {this.validator.message('email', this.state.password, 'required', { className: 'text-danger' })}
                                        </div>
                                        <div>
                                            <a className="btn btn-solid" onClick={(e) => this.login(e)}>Đăng nhập</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 right-login">
                                <h3>Khách hàng mới</h3>
                                <div className="theme-card authentication-right">
                                    <h6 className="title-font">Tạo tài khoản</h6>
                                    <p>Đăng ký một tài khoản miễn phí tại cửa hàng của chúng tôi. Thủ tục đăng kí nhanh chóng và đơn giản. Nó cho phép bạn có thể đặt hàng từ cửa hàng của chúng tôi. Để bắt đầu mua sắm bấm đăng ký.</p>
                                    {/* <a href="#" className="btn btn-solid"></a> */}
                                    <Link to={'/register'} className="btn btn-solid">
                                        Tạo tài khoản
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default connect(Login, state => ({

}), actions);
