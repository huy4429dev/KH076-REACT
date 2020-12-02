import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { withTranslate } from 'react-redux-multilingual';
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/login';
import UserMenu from './../frontEnd/userMenu';

class TopBar extends Component {
    render() {
        const { user } = this.props.loginHome;
        return (
            <div className="top-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="header-contact">
                                <ul>
                                    <li><i className="fa fa-phone" aria-hidden="true"></i>{('Gọi cho chúng tôi')}:  123 - 456 - 7890</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 text-right">
                            {
                                user ?
                                    <ul className="header-dropdown nav-menus">
                                        <UserMenu user={user} />
                                    </ul>
                                 m   :
                                    <ul className="header-dropdown">
                                        <li className="onhover-dropdown mobile-account">
                                            <i className="fa fa-user" aria-hidden="true"></i> {('Tài khoản')}
                                            <ul className="onhover-show-div">
                                                <li>
                                                    <Link to={`/login`} data-lng="en">Đăng nhập</Link>
                                                </li>
                                                <li>
                                                    <Link to={`/register`} data-lng="en">Đăng kí</Link>
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
    loginHome: state.loginHome
}), actions);