import React, { Component } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Settings } from 'react-feather'

class Tabset_profile extends Component {
    render() {
        const { user } = this.props;
        return (
            <div>
                <Tabs>
                    <TabList className="nav nav-tabs tab-coupon" >
                        <Tab className="nav-link"><User className="mr-2" />Thông tin</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="tab-pane fade show active">
                            <h5 className="f-w-600 f-16">Thông tin</h5>
                            <div className="table-responsive profile-table">
                                <table className="table table-responsive">
                                    <tbody>
                                        <tr>
                                            <td>Tên:</td>
                                            <td>{user.username}</td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <td>giới tính:</td>
                                            <td>chưa rõ</td>
                                        </tr>
                                        <tr>
                                            <td>Số diện thoại:</td>
                                            <td>{user.phone}</td>
                                        </tr>
                                        <tr>
                                            <td>Ngày sinh:</td>
                                            <td>1997</td>
                                        </tr>
                                        <tr>
                                            <td>Địa chỉ:</td>
                                            <td>{User.address}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                    {/* <TabPanel>
                 
                    <div className="account-setting">

                        <h5 className="f-w-600 f-16">Thông báo</h5>
                        <div className="row">
                            <div className="col">
                                <label className="d-block" >
                                    <input className="checkbox_animated" id="chk-ani" type="checkbox" defaultChecked />
                                            Allow Desktop Notifications
                                                    </label>
                                <label className="d-block">
                                    <input className="checkbox_animated" id="chk-ani1" type="checkbox" />
                                            Enable Notifications
                                                    </label>
                                <label className="d-block">
                                    <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                            Get notification for my own activity
                                                    </label>
                                <label className="d-block mb-0" >
                                    <input className="checkbox_animated" id="chk-ani3" type="checkbox" defaultChecked />
                                            DND
                                                    </label>
                            </div>
                        </div>
                    </div>
                    <div className="account-setting deactivate-account">
                        <h5 className="f-w-600 f-16">Deactivate Account</h5>
                        <div className="row">
                            <div className="col">
                                <label className="d-block" >
                                    <input className="radio_animated" id="edo-ani" type="radio" name="rdo-ani" defaultChecked />
                                            I have a privacy concern
                                                    </label>
                                <label className="d-block" >
                                    <input className="radio_animated" id="edo-ani1" type="radio" name="rdo-ani" />
                                            This is temporary
                                                    </label>
                                <label className="d-block mb-0" >
                                    <input className="radio_animated" id="edo-ani2" type="radio" name="rdo-ani" defaultChecked />
                                            Other
                                                    </label>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary">Deactivate Account</button>
                    </div>
                    <div className="account-setting deactivate-account">
                        <h5 className="f-w-600 f-16">Delete Account</h5>
                        <div className="row">
                            <div className="col">
                                <label className="d-block" >
                                    <input className="radio_animated" id="edo-ani3" type="radio" name="rdo-ani1" defaultChecked />
                                            No longer usable
                                                    </label>
                                <label className="d-block">
                                    <input className="radio_animated" id="edo-ani4" type="radio" name="rdo-ani1" />
                                            Want to switch on other account
                                                    </label>
                                <label className="d-block mb-0">
                                    <input className="radio_animated" id="edo-ani5" type="radio" name="rdo-ani1" defaultChecked />
                                            Other
                                                    </label>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary">Delete Account</button>
                    </div>
                  
                    </TabPanel> */}
                </Tabs>
            </div >
        )
    }
}

export default Tabset_profile
