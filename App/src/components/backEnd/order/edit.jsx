import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MyCustomUploadAdapterPlugin from './../../../components/backEnd/myCustomUploadAdapterPlugin';
import Dropzone from 'react-dropzone-uploader'
import * as ep from "./../../../constants/enpoint";
import SimpleReactValidator from 'simple-react-validator';
import * as actions from '../../../actions/backEnd/order';
import connect from './../../../lib/connect';
import Loading from './../../../components/loadding2';
import Select from 'react-select';
const status = [
    { 1: "Chờ lấy hàng" },
    { 2: "Đang lấy hàng" },
    { 3: "Không lấy được hàng" },
    { 4: "Đã nhận hàng" },
    { 5: "Đang chuyển" },
    { 6: "Đã giao hàng" },
    { 7: "Delay giao hàng" },
    { 8: "Không giao được hàng" },
    { 9: "Đang đối soát" },
    { 10: "Đã đối soát" },
    { 11: "Chờ hoàn trả" },
    { 12: "Đã hoàn trả" },
    { 13: "Bị thất lạc" },
    { 14: "Đã hủy đơn" },
    { 15: "Chưa gửi" },
    { 16: "Mới" },
    { 17: "Chờ xác nhận" },
    { 18: "Đang xác nhận" },
    { 19: "Đã xác nhận" },
    { 20: "Đang sản xuất" },
    { 21: "Hết hàng" },
    { 22: "Đổi kho hàng" },
    { 23: "Đang đóng gói" },
    { 24: "Đã lấy hàng" },
    { 25: "Đang chuyển hoàn" },
    { 26: "Thất bại" },
    { 27: "Khách hủy" },
    { 28: "Người bán hủy" },
    { 29: "Hãng v.chuyển hủy" },
    { 30: "Đã đối soát" }
]
class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // title: '',
            // image: '',
            // disception: '',
            // content: '',
            status: { value: "", label: "" },
            loading: false
        }
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            messages: {
                required: 'Dữ liệu không hợp lệ',
                email: 'Email không hợp lệ'
            }
        });
    }
    UNSAFE_componentWillReceiveProps(props) {
        if (props.data && props.data != this.props.data) {
            const item = status.filter(it => Object.keys(it) == props.data.status).map(it => { return Object.values(it) });
            this.setState({
                status: { value: props.data.status, label: item[0] }
            }, () => console.log(this.state.status, "aa"))
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
            this.setState({ image: ep.enpoint + response.data.url })
        }

    }

    handleSubmit = (files, allFiles) => {
        allFiles.forEach(f => f.remove());
    }
    edit = (e) => {
        e.preventDefault();
        const { title, image, disception, content } = this.state;
        const { dataEdit } = this.props;
        const { user } = this.props.login;
        const data = {
            image,
            disception,
            content,
            title,
            user_id: user.id
        }
        this.setState({ loading: true });
        this.props.actions.edit(data, dataEdit.id)
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
    handleChange = (v) => {
        this.setState({ status: v });
    }
    handleChangeOrder = () => {
        const { data } = this.props;
        const { status } = this.state;
        this.props.actions.handleChangeOrder(data.id, status.value)
            .then(data => {
                if (data.success) {
                    window.notify("Cập nhật thành công")
                    this.props.onCloseModal();
                } else {
                    window.notify("Cập nhật không thành công", "danger");
                    this.props.onCloseModal();
                }
            }).catch(er => {
                window.notify("Cập nhật không thành công", "danger")
                this.props.onCloseModal();
            });
    }
    render() {
        const { open } = this.props;
        const optionStatus = status.map(item => { return { value: Object.keys(item), label: Object.values(item) } });
        return (
            <div>
                <Modal open={open}
                    onClose={this.props.onCloseModal}

                >
                    <Loading show={this.state.loading} type="full" />
                    <div className="modal-header" style={{ width: "350px", height: "auto" }}>
                        <h5 className="modal-title" id="exampleModalLabel2">Sửa đơn hàng</h5>
                    </div>
                    <div style={{ width: "350px", height: "50vh" }}>
                        <label htmlFor="message-text" className="col-form-label">Trạng thái đơn:</label>
                        <Select
                            value={this.state.status}
                            onChange={(v) => this.handleChange(v)}
                            options={optionStatus}
                            isSearchable="true"
                            placeholder="Trạng thái đơn"
                            className="mb-2"
                            style={{ position: "absolute", zIndex: "100000" }}
                        />
                        <div className="d-flex justify-content-end">
                            <button className="ml-auto btn btn-primary btn-sm" onClick={this.handleChangeOrder}>Lưu</button>
                        </div>
                    </div>
                </Modal>
            </div>

        )
    }
}
export default connect(Create, state => (
    {
    }
), actions);