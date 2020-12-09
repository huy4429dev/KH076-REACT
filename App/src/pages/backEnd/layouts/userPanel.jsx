import React, { Component } from 'react'
import connect from './../../../lib/connect';
import * as actions from './../../../actions/frontEnd/login';
import * as EP from "./../../../constants/endpoint";

export class UserPanel extends Component {
    showAvatar = () => {
        const { user } = this.props.login;
        if (user) {
            if (user.profile) {
                return (
                    <div className="d-flex justify-content-center">
                        <img style={{ width: 50, height: 50 }} src={`${EP.endpoint}${user.profile.avatar}`}
                            alt="" className="img-fluid m-0 rounded-circle blur-up lazyloaded" />
                    </div>
                )
            } else {
                return (
                    <div className="d-flex justify-content-center text-uppercase">
                        <div onClick={this.avatar}
                            className="rounded-circle bg-light text-dark text-center d-flex justify-content-center align-items-center"
                            style={{ width: 50, height: 50 }}>
                            {user.username.charAt(0)}
                        </div>
                    </div>
                )
            }
        }
    }
    render() {
        const { user } = this.props.login;
        return null;
        // <div> 
        //     {this.showAvatar()}
        // </div>
    }
}

export default connect(UserPanel, state => ({
    login: state.login
}), actions);