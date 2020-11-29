import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Breadcrumb from "./../../components/frontEnd/home/breadcrumb";
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/login';
class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
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
                .then(() => {
                    this.setState({ loading: false });
                    window.notify('Đăng nhập thành công', 'success');
                    this.props.history.push('/');
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
                <Breadcrumb title={'Login'} />
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
                                        <a className="btn btn-solid" onClick={(e) => this.login(e)}>Đăng nhập</a>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-6 right-login">
                                <h3>New Customer</h3>
                                <div className="theme-card authentication-right">
                                    <h6 className="title-font">Create A Account</h6>
                                    <p>Sign up for a free account at our store. Registration is quick and easy. It
                                    allows you to be able to order from our shop. To start shopping click
                                        register.</p>
                                    <a href="#" className="btn btn-solid">Create an Account</a>
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
