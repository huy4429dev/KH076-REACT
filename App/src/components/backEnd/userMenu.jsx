import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/login';
export class UserMenu extends Component {
    logout = () => {
        this.props.actions.logout();
        if (this.props.redirect) {
            this.props.redirect();
        }
    }
    render() {
        const { user } = this.props.login;
        return (
            <Fragment>
                <li className="onhover-dropdown">
                    <div className="media align-items-center">
                        <div className="border text-uppercase border-secondary bg-light text-dark rounded-circle d-flex justify-content-center align-items-center"
                            style={{ width: "50px", height: "50px" }}>
                            {user?.username?.charAt(0) ?? 'ADMIN'}
                        </div>
                    </div>
                    <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover d-block">
                        {/* <li><Link to={`/settings/profile`} ><i data-feather="user"></i>Edit Profile</Link></li>
                        <li><a href="javascript:void(0)"><i data-feather="mail"></i>Inbox</a></li>
                        <li><a href="javascript:void(0)"><i data-feather="lock"></i>Lock Screen</a></li>
                        <li><a href="javascript:void(0)"><i data-feather="settings"></i>Settings</a></li> */}
                        <li onClick={() => this.logout()}>Đăng xuất</li>
                    </ul>
                </li>
            </Fragment>
        )
    }
}

export default connect(UserMenu, state => ({
    login: state.login
}), actions);
