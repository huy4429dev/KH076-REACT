import React, { Component } from 'react';

import Breadcrumb from "./../../components/frontEnd/home/breadcrumb";
import SimpleReactValidator from 'simple-react-validator';
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/login';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            r_password: ''
        }
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            email: 'email không hợp lệ',
            default: 'Validation has failed!'
        });
    }
    register = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { username, password, r_password, email } = this.state;
        let err = false;
        if (!username || !password || !r_password || !email) {
            err = true
        }
        if (!err) {
            this.setState({
                loading: true
            })
            const data = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                c_password: this.state.r_password,
                role: "user"
            }
            this.props.actions.register(data)
                .then(() => {
                    this.setState({ loading: false });
                    window.notify('Đăng ký thành công', 'success');
                    this.props.history.push("/login");
                }).catch((err) => {
                    this.setState({ loading: false });
                    window.notify('Đăng ký không thành công', 'danger');
                });
        } else {
            window.notify('Vui lòng điền đầy đủ các trường', 'danger');
        }
    }
    render() {
        return (
            <div>
                <Breadcrumb title={'Tạo tài khoản'} />
                {/*Regsiter section*/}
                <section className="register-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h3>Tạo tài khoản</h3>
                                <div className="theme-card">
                                    <form className="theme-form">
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="name">Tên</label>
                                                <input type="text" className="form-control" id="name"
                                                    name="username"
                                                    onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                    placeholder="Tên" required=""
                                                    onBlur={() => this.validator.showMessageFor('username')}
                                                />
                                                {this.validator.message('username', this.state.username, 'required', { className: 'text-danger' })}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="email">Email</label>
                                                <input type="email" className="form-control" id="email"
                                                    name="email"
                                                    onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                    placeholder="Email" required=""
                                                    onBlur={() => this.validator.showMessageFor('email')}
                                                />
                                                {this.validator.message('email', this.state.email, 'required|email', { className: 'text-danger' })}
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <label htmlFor="password">Mật khẩu</label>
                                                <input type="password" className="form-control" id="password"
                                                    name="password"
                                                    onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                    placeholder="Mật khẩu" required=""
                                                    onBlur={() => this.validator.showMessageFor('password')}
                                                />
                                                {this.validator.message('password', this.state.password, 'required', { className: 'text-danger' })}
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="r_password">Nhập lại mật khẩu</label>
                                                <input type="password" className="form-control" id="r_password"
                                                    name="r_password"
                                                    onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                    onBlur={() => this.validator.showMessageFor('r_password')}
                                                    placeholder="Nhập lại mật khẩu" required="" />
                                                {this.validator.message('r_password', this.state.r_password, `required|in:${this.state.password}`, { className: 'text-danger' })}
                                            </div>
                                            <a className="btn btn-solid" onClick={(e) => this.register(e)}>Thêm tài khoản</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default connect(Register, state => (
    {}
), actions);