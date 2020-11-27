import React, { Component } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Unlock } from 'react-feather';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimpleReactValidator from 'simple-react-validator';
import Loading from './../../components/backEnd/loading';
import connect from './../../lib/connect';
import * as actions from './../../actions/backEnd/login';

class LoginTabset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeShow: true,
            startDate: new Date(),
            username: '',
            password: '',
            confilm: '',
            email: '',
            Loading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }
    componentDidMount() {
        // toast('🦄 Wow so easy!', {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        // });
    }

    clickActive = (event) => {
        this.setState({
            username: '',
            password: '',
            confilm: ''
        })
        document.querySelector(".nav-link").classList.remove('show');
        event.target.classList.add('show');
    }
    handleChange = (date) => {
        this.setState({
            startDate: date
        });
    }

    routeChange = () => {

    }
    register = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            loading: true
        })
        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            c_password: this.state.confilm
        }
        this.props.actions.register(data)
            .then(() => {
                this.setState({ loading: false })
            }).catch(() => this.setState({ loading: false }));
    }
    render() {
        return (
            <div>
                <React.Fragment>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <ToastContainer />
                    <Loading show={this.state.loading} />
                    <Tabs>
                        <TabList className="nav nav-tabs tab-coupon" >
                            <Tab className="nav-link" onClick={(e) => this.clickActive(e)}><User />Đăng nhập</Tab>
                            <Tab className="nav-link" onClick={(e) => this.clickActive(e)}><Unlock />Đăng ký</Tab>
                        </TabList>

                        <TabPanel>
                            <form className="form-horizontal auth-form">
                                <div className="form-group">
                                    <input value={this.state.username} required="" name="username"
                                        onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                        // onBlur={() => this.validator.showMessageFor('username')}
                                        type="text" className="form-control" placeholder="Tên" id="exampleInputEmail1" />
                                </div>
                                <div className="form-group">
                                    <input value={this.state.password}
                                        // onBlur={() => this.validator.showMessageFor('password')}
                                        onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                        required="" name="password" type="password" className="form-control" placeholder="Mật khẩu" />
                                </div>
                                <div className="form-terms">
                                    <div className="custom-control custom-checkbox mr-sm-2">
                                        <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                        <label className="d-block">
                                            <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                                        Reminder Me <span className="pull-right"> <a href="#" className="btn btn-default forgot-pass p-0">lost your password</a></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-button">
                                    <button className="btn btn-primary" type="submit" onClick={(e) => this.register(e)}>Đăng nhập</button>
                                </div>
                                <div className="form-footer">
                                    <span>Or Login up with social platforms</span>
                                    <ul className="social">
                                        <li><a className="fa fa-facebook" href=""></a></li>
                                        <li><a className="fa fa-twitter" href=""></a></li>
                                        <li><a className="fa fa-instagram" href=""></a></li>
                                        <li><a className="fa fa-pinterest" href=""></a></li>
                                    </ul>
                                </div>
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <form className="form-horizontal auth-form">
                                <div className="form-group">
                                    <input value={this.state.username} required="" name="username"
                                        onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                        type="text" className="form-control" placeholder="Tên" id="exampleInputEmail12"
                                        onBlur={() => this.validator.showMessageFor('username')}
                                    />
                                    {this.validator.message('username', this.state.username, 'required|alpha', { className: 'text-danger' })}
                                </div>
                                <div className="form-group">
                                    <input value={this.state.email} required="" name="email"
                                        onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                        type="email" className="form-control" placeholder="email" id="exampleInputEmail12"
                                        onBlur={() => this.validator.showMessageFor('email')}
                                    />
                                    {this.validator.message('email', this.state.email, 'required|email', { className: 'text-danger' })}
                                </div>
                                <div className="form-group">
                                    <input value={this.state.password}
                                        onBlur={() => this.validator.showMessageFor('password')}
                                        onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                        required="" name="password" type="password" className="form-control" placeholder="Mật khẩu" />
                                    {this.validator.message('password', this.state.password, 'required', { className: 'text-danger' })}
                                </div>
                                <div className="form-group">
                                    <input value={this.state.confilm} name="confilm"
                                        onBlur={() => this.validator.showMessageFor('confilm')}
                                        onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                        required="" type="password" className="form-control" placeholder="Nhập lại mật khẩu" />
                                    {this.validator.message('confilm', this.state.confilm, `required|in:${this.state.password}`, { className: 'text-danger' })}
                                </div>
                                <div className="form-terms">
                                    <div className="custom-control custom-checkbox mr-sm-2">
                                        <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                        <label className="d-block">
                                            <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                            I agree all statements in <span><a href="">Terms &amp; Conditions</a></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-button">
                                    <button className="btn btn-primary" onClick={(e) => this.register(e)}>Đăng ký</button>
                                </div>
                                <div className="form-footer">
                                    <span>Or Sign up with social platforms</span>
                                    <ul className="social">
                                        <li><a className="fa fa-facebook" href=""></a></li>
                                        <li><a className="fa fa-twitter" href=""></a></li>
                                        <li><a className="fa fa-instagram" href=""></a></li>
                                        <li><a className="fa fa-pinterest" href=""></a></li>
                                    </ul>
                                </div>
                            </form>
                        </TabPanel>
                    </Tabs>
                </React.Fragment>
            </div>
        )
    }
}

export default connect(LoginTabset, state => (
    {
    }
), actions);

