import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { withTranslate } from 'react-redux-multilingual';
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/login';
import UserMenu from './../frontEnd/userMenu';

class TopBar extends Component {
    constructor(props){
        super(props);
    }
    checkLogin = () =>{
        const {user,token,login} = this.props.login;
        const acToken =localStorage.getItem("access_token");
        if(user && token && login && acToken){
            return (
                <ul className="header-dropdown nav-menus">
                    <UserMenu user={user} />
                </ul>
            )
        }else{
            return(
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
            )
        }
    }
    render() {
        const { user } = this.props.login;
        return (
            <div className="top-header" style={{ maxHeight: "30px" }}>
                <div className="container"  >
                    <div className="row" >
                        <div className="col-lg-6 d-flex align-items-center justify-content-start" style={{ maxHeight: "30px" }}>
                            <div className="header-contact p-0">
                                <ul>
                                    <li><i className="fa fa-phone" aria-hidden="true"></i>{('Gọi ngay')}:  0123-456-789</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 text-right d-flex align-items-center justify-content-end" style={{ maxHeight: "30px" }}>
                            {
                              this.checkLogin()
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