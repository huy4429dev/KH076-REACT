import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { withTranslate } from 'react-redux-multilingual';
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/login';
import UserMenu from './../frontEnd/userMenu';

class TopBar extends Component {
    render() {
        const { user } = this.props.login;
        return (
            <div className="top-header" style={{ maxHeight: "30px" }}>
                <div className="container"  >
                    <div className="row" >
                        <div className="col-lg-6 d-flex align-items-center justify-content-start" style={{ maxHeight: "30px" }}>
                            <div className="header-contact p-0">
                                <ul>
                                    <li><i className="fa fa-phone" aria-hidden="true"></i>{('Gọi ngay')}:  0966756104</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 text-right d-flex align-items-center justify-content-end" style={{ maxHeight: "30px" }}>
                            {
                                user ?
                                    <ul className="header-dropdown nav-menus">
                                        <UserMenu user={user} />
                                    </ul>
                                    :
                                    <ul className="header-dropdown">
                                        <li className="onhover-dropdown mobile-account">
                                            <i className="fa fa-user" aria-hidden="true"></i> {('Tài khoản')}
                                            <ul className="onhover-show-div">
                                                <li>
                                                    <Link to={`/login`} data-lng="en">Đăng nhập</Link>
                                                </li>
                                                <li>
                                                    <Link to={`/register`} data-lng="en">Đăng ký</Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(TopBar, state => ({
    login: state.login
}), actions);