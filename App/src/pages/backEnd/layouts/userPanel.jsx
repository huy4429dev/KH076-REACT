import React, { Component } from 'react'
import connect from './../../../lib/connect';
import * as actions from './../../../actions/backEnd/login';
export class UserPanel extends Component {
    render() {
        const { user } = this.props.loginAdmin;
        return (
            <div>
                <div className="sidebar-user text-center">
                    <div className="mx-auto border text-uppercase border-secondary bg-light text-dark rounded-circle d-flex justify-content-center align-items-center"
                        style={{ width: "50px", height: "50px" }}>
                        {user?.username?.charAt(0) ?? 'ADMIN'}
                    </div>
                    {/* <h6 className="mt-3 f-14">{user?.username?.charAt(0) ?? 'ADMIN'}</h6> */}
                    <p className='mt-3'> {user?.username?.name ?? 'ADMIN'}</p>
                </div>
            </div>
        )
    }
}

export default connect(UserPanel, state => ({
    loginAdmin: state.loginAdmin
}), actions);