import React, { Component } from 'react'
import Modal from 'react-responsive-modal';
import SimpleReactValidator from 'simple-react-validator';
export default class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: null,
            description: null
        }
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        // GET NEXT PROPS --> WHEN PROPS CHANGE [MODAL EDIT ITEM [null] -> [item]]

        if (nextProps.data && nextProps.data != this.props.data) {

            const itemEdit = nextProps.data;
            this.setState({
                id: itemEdit.id,
                name: itemEdit.name,
                description: itemEdit.description
            })

        }
    }

    handleSubmit = () => { 

        const { id, name, description } = this.state;
        this.props.onHandleEditItem({
            id,
            name,
            description
        });
    }


    handleInputOnchange = (event) => {

        const target = event.target;
        const value = target.value;
        const tagName = target.name;
        
        this.setState({
            [tagName]: value
        });

    }

    onCloseModal = () => {
        if (this.props.onCloseModal) {
            this.props.onCloseModal();
        }
    }


    render() {
        const { open } = this.props;
        const { id, name, description } = this.state;
        return (
            <Modal open={open} onClose={this.onCloseModal} >
                <div className="modal-header">
                    <h5 className="modal-title f-w-600" id="exampleModalLabel2">Sửa danh mục</h5>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="recipient-name" className="col-form-label" >{this.props.name} Tên :</label>
                            <input
                                name="name"
                                type="text"
                                value={name}
                                className="form-control"
                                onChange={this.handleInputOnchange}
                            // onBlur={() => this.validator.showMessageFor('name')}
                            />
                            {this.validator.message('name', this.state.name, 'required', { className: 'text-danger' })}

                        </div>
                        <div className="form-group">
                            <label htmlFor="message-text" className="col-form-label">Mô tả :</label>
                            <textarea
                                name="description"
                                className="form-control"
                                value={description}
                                onChange={this.handleInputOnchange}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => this.handleSubmit()}>Lưu</button>
                        <button type="button" className="btn btn-secondary" onClick={() => this.onCloseModal()}>Hủy</button>
                    </div>
                </form>
            </Modal>
        )
    }
}
