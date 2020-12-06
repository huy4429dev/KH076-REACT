import React, { Component } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Settings } from 'react-feather';
import ContentEditable from 'react-contenteditable'
import { useStore } from 'react-redux';
import Select from 'react-select';
import Loading from './../../loadding2';
import * as actions from './../../../actions/frontEnd/login';
import connect from './../../../lib/connect';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
class Tabset_profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            phone: '',
            birthday: '',
            address: '',
            gender: props.user.profile ? props.user.profile.gender : '2',
            loading: false
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user && nextProps.user != this.props.user) {
            const { user } = this.props;
            this.setState({
                username: nextProps.user.username,
                email: nextProps.user.email,
                phone: nextProps.user.phone + '',
                birthday: nextProps.user.profile != null ? moment(nextProps.user.profile.birthday) : '',
                address: nextProps.user.address,
                gender: nextProps.user.profile != null ? nextProps.user.profile.gender : '1',
            })
        }
    }
    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }
    changeGender = (value) => {
        this.setState({ gender: value.value });
    }
    updateProfile = () => {
        const { user } = this.props;
        console.log(user);
        this.setState({ loading: true });
        const { username, email, phone, birthday, address, gender } = this.state;
        const data = {
            username,
            email,
            phone,
            birthday,
            address,
            gender
        }
        this.props.actions.updateProfile(data, user.id)
            .then((data) => {
                if (data.success) {
                    window.notify("Cập nhật thành công");
                } else {
                    window.notify("Cập nhật không thành công", "danger");
                }
                this.setState({ loading: false })
            }).catch(() => {
                window.notify("Cập nhật không thành công", "danger");
                this.setState({ loading: false })
            }
            );
    }
    onChangeDate = (value) => {
        this.setState({ birthday: value })
    }
    render() {
        console.log(this.state, this.state.gender == "1" ? 'Nam' : 'Nữ');
        const { user } = this.props;
        const options = [
            { value: '1', label: 'Nam' },
            { value: '2', label: 'Nữ' },
        ]
        const defaultGender = { value: this.state.gender, label: this.state.gender == "1" ? 'Nam' : 'Nữ' };
        console.log(defaultGender);
        return (
            <div>
                <Tabs>
                    <TabList className="nav nav-tabs tab-coupon" >
                        <Tab className="nav-link"><User className="mr-2" />Thông tin</Tab>
                    </TabList>

                    <TabPanel>
                        <Loading show={this.state.loading} type="full" />
                        <div className="tab-pane fade show active">
                            <h5 className="f-w-600 f-16">Thông tin</h5>
                            <div className="table-responsive profile-table">
                                <table className="table table-responsive">
                                    <tbody>
                                        <tr>
                                            <td>Tên:</td>
                                            <td>
                                                <ContentEditable
                                                    // innerRef={this.contentEditable}
                                                    html={this.state.username}
                                                    disabled={false}
                                                    onChange={(e) => this.handleChange(e, "username")}
                                                    tagName='p'
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td>
                                                <ContentEditable
                                                    // innerRef={this.contentEditable}
                                                    html={this.state.email}
                                                    disabled={false}
                                                    onChange={(e) => this.handleChange(e, "email")}
                                                    tagName='p'
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>giới tính:</td>
                                            <td>
                                                <Select
                                                    defaultValue={defaultGender}
                                                    options={options}
                                                    onChange={this.changeGender}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Số diện thoại:</td>
                                            <td>
                                                <ContentEditable
                                                    // innerRef={this.contentEditable}
                                                    html={this.state.phone}
                                                    disabled={false}
                                                    onChange={(e) => this.handleChange(e, "phone")}
                                                    tagName='p'
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Ngày sinh:</td>
                                            <td>
                                                {/* <ContentEditable
                                                    // innerRef={this.contentEditable}
                                                    html={this.state.birthday}
                                                    disabled={false}
                                                    onChange={(e) => this.handleChange(e, "birthday")}
                                                    tagName='p'
                                                /> */}
                                                <DateTimePicker
                                                    disableClock="true"
                                                    onChange={this.onChangeDate}
                                                    format="y-MM-dd"
                                                    value={this.state.birthday}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Địa chỉ:</td>
                                            <td>
                                                <ContentEditable
                                                    // innerRef={this.contentEditable}
                                                    html={this.state.address}
                                                    disabled={false}
                                                    onChange={(e) => this.handleChange(e, "address")}
                                                    tagName='p'
                                                    name="address"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-end">
                                    <button className="btn  bg-primary text-white" onClick={this.updateProfile}>Cập nhật</button>
                                </div>
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

export default connect(Tabset_profile, null, actions)
