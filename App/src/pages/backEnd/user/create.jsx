

import React, { Component, Fragment } from 'react'
import Breadcrumb from './../../../components/backEnd/breadCrumb';
import Tabset_user from './../../../components/backEnd/user/tabset';

export class CreateUser extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Create User" parent="Users" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5> Add User</h5>
                                </div>
                                <div className="card-body">
                                    <Tabset_user />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default CreateUser
