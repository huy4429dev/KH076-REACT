import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MyCustomUploadAdapterPlugin from './../../../components/backEnd/myCustomUploadAdapterPlugin';
import Dropzone from 'react-dropzone-uploader'
import * as ep from "./../../../constants/enpoint";
import SimpleReactValidator from 'simple-react-validator';
import * as actions from './../../../actions/backEnd/blog';
import connect from './../../../lib/connect';
import Loading from './../../../components/loadding2';
class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            image: '',
            disception: '',
            content: '',
            loading: false
        }
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    getUploadParams = ({ meta }) => {

        return { url: ep.enpoint + '/api/uploads/public/blog' }

    }

    // called every time a file's `status` changes
    handleChangeStatus = ({ meta, file, xhr }, status) => {
        if (status === 'done') {
            let response = JSON.parse(xhr.response);
            console.log(response.data);
            this.setState({ image: ep.enpoint + response.data.url })
        }

    }

    handleSubmit = (files, allFiles) => {
        allFiles.forEach(f => f.remove());
    }
    add = (e) => {
        e.preventDefault();
        const { title, image, disception, content } = this.state;
        const { user } = this.props.login;
        const data = {
            image,
            disception,
            content,
            title,
            user_id: user.id
        }
        this.setState({ loading: true });
        this.props.actions.add(data)
            .then(data => {
                this.setState({ loading: false });
                if (data.success) {
                    window.notify("Thêm thành công");
                } else {
                    window.notify("Thêm không thành công", "danger");
                }
                this.props.onCloseModal();
            }).catch(err => {
                this.setState({ loading: false });
                window.notify("Thêm không thành công", "danger");
                this.props.onCloseModal();
            })
    }
    render() {
        const { open } = this.props;
        return (
            <Modal open={open} onClose={this.props.onCloseModal} >
                <Loading show={this.state.loading} type="full" />
                <div className="modal-header">
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">Thêm bài viết</h5>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-body">

                        <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label" >{this.props.name} Tên tin tức :</label>
                            <input
                                name="title"
                                type="text"
                                value={this.state.title}
                                className="form-control"
                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                onBlur={() => this.validator.showMessageFor('title')}
                            />
                            {this.validator.message('title', this.state.title, 'required', { className: 'text-danger' })}

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
                            <CKEditor
                                editor={ClassicEditor}
                                data={""}
                                placeholder="Question Text"
                                config={{ extraPlugins: [MyCustomUploadAdapterPlugin] }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.setState({ content: data })
                                }}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-secondary" onClick={(e) => this.add(e)}>Lưu</button>
                        <button type="button" className="btn btn-primary" onClick={() => this.props.onCloseModal('VaryingMdo')}>Hủy</button>
                    </div>
                </form>

            </Modal>
        )
    }
}
export default connect(Create, state => ({
    login: state.login,
    blog: state.blogAdmin
}), actions)