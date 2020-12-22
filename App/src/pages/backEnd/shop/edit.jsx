import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MyCustomUploadAdapterPlugin from './../../../components/backEnd/myCustomUploadAdapterPlugin';
import Dropzone from 'react-dropzone-uploader'
import * as ep from "./../../../constants/enpoint";
import SimpleReactValidator from 'simple-react-validator';
import * as actions from './../../../actions/backEnd/shop';
import connect from './../../../lib/connect';
import Select from 'react-select';
import Loading from './../../../components/loadding2';
class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            image: '',
            disception: '',
            content: '',
            loading: false,
            optionUsers: [{ value: "", label: "" }]
        }
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            messages: {
                required: 'Dữ liệu không hợp lệ',
                email: 'Email không hợp lệ'
            }
        });
    }
    // componentDidMount() {
    //     this.props.actions.getUser()
    //         .then(data => {
    //             if (data.success) {
    //                 const users = data.data.map(item => {
    //                     return { value: item.id, label: item.username }
    //                 })
    //                 this.setState({ optionUsers: users });
    //             }
    //         });
    // }

    UNSAFE_componentWillReceiveProps(props) {
        if (props.dataEdit && props.dataEdit != this.props.dataEdit) {
            console.log(props.dataEdit);
            this.setState({
                name: props.dataEdit.name,
                disception: props.dataEdit.description,
                avatar: props.dataEdit.avatar,
                user: { value: props.dataEdit?.users[0]?.id, label: props.dataEdit?.users[0]?.username },
            })
        }
    }
    getUploadParams = ({ meta }) => {
        return { url: ep.enpoint + '/api/uploads/public/blog' }
    }
    // called every time a file's `status` changes
    handleChangeStatus = ({ meta, file, xhr }, status) => {
        if (status === 'done') {
            let response = JSON.parse(xhr.response);
            console.log(response.data);
            this.setState({ avatar: ep.enpoint + response.data.url })
        }

    }

    handleSubmit = (files, allFiles) => {
        allFiles.forEach(f => f.remove());
    }
    edit = (e) => {
        e.preventDefault();
        const { name, avatar, disception, user } = this.state;
        const { id } = this.props.dataEdit;
        if (user.value == '' || avatar == '' || name == '' || disception == '') {
            window.notify("Bạn cần điền đầy đủ thông tin", "warning");
            return;
        }
        const data = {
            avatar,
            disception,
            name,
            user_id: user.value
        }
        this.setState({ loading: true });
        this.props.actions.edit(id, data)
            .then(data => {
                this.setState({ loading: false });
                if (data.success) {
                    window.notify("Sửa thành công");
                } else {
                    window.notify("Sửa không thành công", "danger");
                }
                this.props.onCloseModal();
            }).catch(err => {
                this.setState({ loading: false });
                window.notify("Sửa không thành công", "danger");
                this.props.onCloseModal();
            })
    }
    render() {
        const { open } = this.props;
        const { optionUsers } = this.state;
        return (
            <Modal open={open} onClose={this.props.onCloseModal} >
                <Loading show={this.state.loading} type="full" />
                <div className="modal-header">
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">Sửa bài viết</h5>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-body">

                        <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label" >Tên cửa hàng :</label>
                            <input
                                name="name"
                                type="text"
                                value={this.state.name}
                                className="form-control"
                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                onBlur={() => this.validator.showMessageFor('name')}
                            />
                            {this.validator.message('name', this.state.name, 'required', { className: 'text-danger' })}

                        </div>
                        <div className="form-group">
                            <label htmlFor="message-text" className="col-form-label">Mô tả :</label>
                            <textarea
                                name="description"
                                className="form-control"
                                name="disception"
                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                onBlur={() => this.validator.showMessageFor('disception')}
                            >{this.state.disception}</textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message-text" className="col-form-label">avatar :</label>
                            <img style={{ width: "50px", height: "50px" }} src={this.state.avatar} />
                            <div className="dropzone d-flex justify-content-center">
                                <Dropzone
                                    getUploadParams={this.getUploadParams}
                                    onChangeStatus={this.handleChangeStatus}
                                    onSubmit={this.handleSubmit}
                                    accept="image/*,audio/*,video/*"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message-text" className="col-form-label">tài khoản :</label>
                            <Select
                                value={this.state.user}
                                onChange={(v) => this.handleChangeUser(v)}
                                // options={optionUsers}
                                isSearchable="true"
                                placeholder="Tài khoản"
                                className="mb-2"
                                isDisabled="true"
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-secondary" onClick={(e) => this.edit(e)}>Sửa</button>
                        <button type="button" className="btn btn-primary" onClick={() => this.props.onCloseModal('VaryingMdo')}>Hủy</button>
                    </div>
                </form>

            </Modal>
        )
    }
}
export default connect(Create, state => ({
    login: state.login,
    blog: state.blogAdmin,
    shop: state.shop
}), actions)