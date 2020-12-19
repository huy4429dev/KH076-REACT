import React, { Component } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Settings } from 'react-feather';
import ContentEditable from 'react-contenteditable'
import { useStore } from 'react-redux';
import Select from 'react-select';
import Loading from './../../loadding2';
import * as actions from './../../../actions/frontEnd/login';
import * as actionsAddress from './../../../actions/address.js';
import connect from './../../../lib/connect';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import SimpleReactValidator from 'simple-react-validator';
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
class Tabset_profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            phone: '',
            birthday: '',
            address: '',
            password: '',
            newPassword: '',
            changePass: false,
            gender: props.user?.profile ? props.user.profile.gender : '2',
            loading: false,
            optionsProvince: [],
            optionsDistrict: [],
            optionsWard: [],
            province: { value: "", label: "" },
            district: { value: "", label: "" },
            ward: { value: "", label: "" }
        }
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            messages: {
                required: 'Dữ liệu không hợp lệ',
                email: 'Email không hợp lệ'
            }
        });
    }
    componentDidMount() {
        this.props.actions.getProvince()
            .then(data => {
                if (data.success) {
                    const newData = data.data.map(item => { return { value: item.id, label: item.name } });
                    this.setState({ optionsProvince: newData })
                }
            });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user && nextProps.user != this.props.user) {
            const { user } = this.props;
            this.setState({
                username: nextProps.user.username,
                email: nextProps.user.email,
                phone: nextProps.user.phone + '',
                birthday: nextProps.user.profile != null ? (nextProps.user.profile.birthday ? moment(nextProps.user.profile.birthday) : new Date()) : new Date(),
                address: nextProps.user.address,
                gender: nextProps.user?.profile ? nextProps.user.profile.gender : '2',
                province: nextProps.user?.profile ?
                    { value: nextProps.user.profile.province_id, label: nextProps.user.profile.province }
                    : { value: "", label: "" },
                district: nextProps.user?.profile ?
                    { value: nextProps.user.profile.district_id, label: nextProps.user.profile.district }
                    : { value: "", label: "" },
                ward: nextProps.user?.profile ?
                    { value: nextProps.user.profile.ward_id, label: nextProps.user.profile.ward }
                    : { value: "", label: "" },
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
        this.setState({ loading: true });
        const { username, email, phone, birthday, address, gender, province,
            district, ward, changePass, password, newPassword } = this.state;
        const data = {
            username,
            email,
            phone,
            birthday,
            address,
            gender,
            password: changePass ? password : null,
            newPassword: changePass ? newPassword : null,
            province: province.label,
            district: district.label,
            ward: ward.label,
            province_id: province.value,
            district_id: district.value,
            ward_id: ward.value,
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
    handleChangeProvince = (v) => {
        this.setState({
            province: v
        }, () => {
            this.getDistrict(v.value);
        })
    }
    getDistrict = (id) => {
        const newId = `0${id}`.slice(-2);
        this.props.actions.getDistrict(newId)
            .then(data => {
                if (data.success) {
                    const newData = data.data.map(item => { return { value: item.id, label: item.name } });
                    this.setState({ optionsDistrict: newData })
                }
            });
    }
    handleChangeDistrict = (v) => {
        this.setState({
            district: v
        }, () => {
            this.getWard(v.value);
        })
    }
    getWard = (id) => {
        const newId = `00${id}`.slice(-3);
        this.props.actions.getWard(newId)
            .then(data => {
                if (data.success) {
                    const newData = data.data.map(item => { return { value: item.id, label: item.name } });
                    this.setState({ optionsWard: newData })
                }
            });
    }
    handleChangeWard = (v) => {
        this.setState({
            ward: v
        })
    }
    render() {
        const { user } = this.props;
        const options = [
            { value: '1', label: 'Nam' },
            { value: '2', label: 'Nữ' },
        ]
        const defaultGender = { value: this.state.gender, label: this.state.gender == "1" ? 'Nam' : 'Nữ' };
        const { optionsProvince, optionsDistrict, optionsWard, changePass } = this.state;
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
                            <div className=" profile-table h-100">
                                <div className=" h-100 w-100">
                                    <div>
                                        <div>
                                            <p>Tên:</p>
                                            <div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="username" placeholder="Tên"
                                                        required=""
                                                        name="username"
                                                        value={this.state.username}
                                                        onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                        onBlur={() => this.validator.showMessageFor('username')}
                                                    />
                                                    {this.validator.message('username', this.state.username, 'required', { className: 'text-danger' })}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p>Email:</p>
                                            <div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="email" placeholder="email"
                                                        required=""
                                                        name="email"
                                                        value={this.state.email}
                                                        onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                        onBlur={() => this.validator.showMessageFor('email')}
                                                    />
                                                    {this.validator.message('email', this.state.email, 'required|email', { className: 'text-danger' })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ml-1">
                                            <div className="form-group ml-1">
                                                <label className="form-check-label">
                                                    <input type="checkbox" className="form-check-input" value="" onChange={() => this.setState({ changePass: !changePass })} />Đổi mật khẩu
                                                </label>
                                            </div>
                                            {
                                                changePass &&
                                                <div>
                                                    <p>Mật khẩu cũ</p>
                                                    <div className="form-group">
                                                        <input type="password" className="form-control" id="password" placeholder="password"
                                                            required=""
                                                            name="password"
                                                            value={this.state.password}
                                                            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                            onBlur={() => this.validator.showMessageFor('password')}
                                                        />
                                                        {this.validator.message('password', this.state.email, 'required', { className: 'text-danger' })}
                                                    </div>
                                                    <p>Mật khẩu mới</p>
                                                    <div className="form-group">
                                                        <input type="password" className="form-control" id="newPassword" placeholder="mật khẩu mới"
                                                            required=""
                                                            name="newPassword"
                                                            value={this.state.newPassword}
                                                            onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                            onBlur={() => this.validator.showMessageFor('email')}
                                                        />
                                                        {this.validator.message('newPassword', this.state.newPassword, 'required', { className: 'text-danger' })}
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div>
                                            <p>giới tính:</p>
                                            <div style={{ minWidth: "10rem" }}>
                                                <Select
                                                    defaultValue={defaultGender}
                                                    options={options}
                                                    onChange={this.changeGender}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p>Số diện thoại:</p>
                                            <div>
                                                <div className="form-group">
                                                    <input type="text" className="form-control" id="email" placeholder="Điện thoại"
                                                        required=""
                                                        name="phone"
                                                        value={this.state.phone}
                                                        onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                        onBlur={() => this.validator.showMessageFor('phone')}
                                                    />
                                                    {this.validator.message('phone', this.state.phone, 'required', { className: 'text-danger' })}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <div className="d-flex flex-column">
                                                    <p>Tỉnh:</p>
                                                    <Select
                                                        value={this.state.province}
                                                        defaultValue={this.state.province}
                                                        onChange={(v) => this.handleChangeProvince(v)}
                                                        options={optionsProvince}
                                                        isSearchable="true"
                                                        placeholder="Tỉnh"
                                                        className="mb-2"
                                                    />
                                                    <p>Huyện:</p>
                                                    <Select
                                                        value={this.state.district}
                                                        defaultValue={this.state.district}
                                                        onChange={this.handleChangeDistrict}
                                                        options={optionsDistrict}
                                                        isSearchable="true"
                                                        placeholder="Huyện"
                                                        className="mb-2"
                                                    />
                                                    <p>Xã:</p>
                                                    <Select
                                                        value={this.state.ward}
                                                        defaultValue={this.state.ward}
                                                        onChange={this.handleChangeWard}
                                                        options={optionsWard}
                                                        isSearchable="true"
                                                        placeholder="Xã"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end mt-2">
                                    <button className="btn  bg-primary text-white" onClick={this.updateProfile}>Cập nhật</button>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div >
        )
    }
}

export default connect(Tabset_profile, null, { ...actions, ...actionsAddress })
