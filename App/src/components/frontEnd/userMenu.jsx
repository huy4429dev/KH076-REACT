import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import man from './../../assets/images/dashboard/man.png';
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/login';
export class UserMenu extends Component {
    logout = () => {
        this.props.actions.logout();
    }
    redirect = () => {
        window.location.href = "http://localhost:3000/admin";
    }
    render() {
        const { user } = this.props;
        return (
            <Fragment>
                <li className="onhover-dropdown d-flex justify-content-end" style={{ minWidth: "200px" }}>
                    <div className="media align-items-center">
                        <div className="border text-uppercase border-secondary rounded-circle d-flex justify-content-center align-items-center"
                            style={{ width: "25px", height: "25px" }}>
                            {user.username.charAt(0)}
                        </div>
                        {/* <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={man} alt="header-user" /> */}
                        <div className="dotted-animation"><span className="animate-circle"></span><span className="main-circle"></span></div>
                    </div>
                    <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                        <Link to="/profile"><li className="text-dark">Trang cá nhân</li></Link>
                        <li className="text-dark" onClick={this.redirect}>Trang quản lý</li>
                        <li onClick={() => this.logout()} className="text-dark">Đăng xuất</li>
                    </ul>
                </li>
            </Fragment>
        )
    }
}

export default connect(UserMenu, state => ({

}), actions);
