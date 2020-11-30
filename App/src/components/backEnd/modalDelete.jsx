import React, { Component } from 'react'
import Modal from 'react-responsive-modal';
export default class ModalDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
        }
    }

    handleSubmit = () => {

        const id = this.props.data;
        if (this.props.onHandleDelete) {
            this.props.onHandleDelete(id);
        }
    }

    onCloseModal = () => {
        if (this.props.onCloseModal) {
            this.props.onCloseModal();
        }
    }


    render() {
        const { open } = this.props;
        return (
            <Modal open={open} onClose={this.onCloseModal} >
                <div className="modal-header">
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">Xóa danh mục</h5>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={() => this.handleSubmit()}>Lưu</button>
                    <button type="button" className="btn btn-secondary" onClick={() => this.onCloseModal()}>Hủy</button>
                </div>

            </Modal>
        )
    }
}
