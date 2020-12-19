import React, { Component, Fragment } from 'react';
import Breadcrumb from '../../../components/backEnd/breadCrumb';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import connect from '../../../lib/connect';
import SimpleReactValidator from 'simple-react-validator';
import * as actions from '../../../actions/backEnd/order';
import Loading from '../../../components/backEnd/loading';
import ListOrder from '../../../components/backEnd/order/list';

const customButton = { borderRadius: 0, paddingTop: '6px', paddingBottom: '6px', paddingLeft: '10px', paddingRight: '10px' };

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: true,
            name: '',
            description: '',
        };
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            messages: {
                required: 'Dữ liệu không hợp lệ',
                email: 'Email không hợp lệ'
            }
        });
    }

    componentDidMount = () => {

        this.setState({
            loading: true
        })
        const { getOrders } = this.props.actions;
        getOrders()
            .then(() => {
                this.setState({ loading: false });
            })
            .catch((err) => {
                this.setState({ loading: false });
                window.notify('Tải xuống đơn hàng không thành công: ' + err.message, 'danger');
            });

    }


    handleInputOnchange = (event) => {

        const target = event.target;
        const value = target.value;
        const tagName = target.name;
        const { name, description } = this.state;
        this.setState({
            [tagName]: value
        });

    }

    handleSubmit = (event) => {

        event.preventDefault();


        if (this.validator.allValid()) {

            this.setState({
                loading: true
            });

            const { name, description } = this.state;
            const { createorder } = this.props.actions;
            if (name === '' || name === null) return;
            createorder({
                name: name,
                description: description
            })
                .then((data) => {
                    if (data.success) {
                        return data;
                    } else {
                        throw new Error('Something went wrong');
                    }
                })
                .then((data) => {
                    this.setState({ loading: false });
                    window.notify("Thêm mới danh mục thành công");
                })
                .catch((err) => {
                    this.setState({ loading: false });
                });

            this.onCloseModal();

        } else {

            this.validator.showMessages();
        }

    }

    onOpenModal = () => {

        const { name } = this.state;
        this.setState({
            open: true,
            name: null,
            description: null,
        });
    };

    onCloseModal = () => {
        this.setState({
            open: false,
        });
    };

    handlelRefresh = () => {

        this.setState({
            loading: true
        })
        const { getOrders } = this.props.actions;
        getOrders()
            .then(() => {
                this.setState({ loading: false });
            })
            .catch((err) => {
                this.setState({ loading: false });
                window.notify('Tải xuống đơn hàng không thành công: ' + err.message, 'danger');
            });

    }

    render() {
        const { open, order } = this.state;
        const { orders } = this.props;
        const items = orders.items ? orders.items : [];
        const total = orders.total ?? 0;
        return (
            <Fragment>
                <Breadcrumb title="ĐƠN HÀNG" parent="ĐƠN HÀNG" />

                {/* <!-- Container-fluid starts--> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>DANH SÁCH ĐƠN HÀNG</h5>
                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-secondary mr-1"
                                            style={customButton}
                                            data-toggle="modal"
                                            data-original-title="test"
                                            onClick={this.onOpenModal}
                                            data-target="#exampleModal"
                                        >
                                            <i className="fa fa-plus"></i>
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary mr-1"
                                            style={customButton}
                                            onClick={this.handlelRefresh}
                                        >
                                            <i className="fa fa-refresh" aria-hidden="true"></i>
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            style={customButton}
                                        >
                                            <i className="fas fa-print"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="btn-popup pull-right">
                                        <Modal open={open} onClose={this.onCloseModal} >
                                            <div className="modal-header">
                                                <h5 className="modal-title f-w-600" id="exampleModalLabel2">Thêm danh mục</h5>
                                            </div>
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="modal-body">
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >{this.props.name} Tên :</label>
                                                        <input
                                                            name="name"
                                                            type="text"
                                                            value={this.state.name}
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
                                                            onChange={this.handleInputOnchange}

                                                        />
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="submit" className="btn btn-secondary" onClick={() => this.handleSubmit}>Lưu</button>
                                                    <button type="button" className="btn btn-primary" onClick={() => this.onCloseModal('VaryingMdo')}>Hủy</button>
                                                </div>
                                            </form>
                                        </Modal>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        {
                                            this.state.loading
                                                ?
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <Loading type='box' />
                                                </div>
                                                :
                                                <ListOrder
                                                    myData={items}
                                                    total={total}
                                                    className="-striped -highlight"
                                                />
                                            // <table>

                                            // </table>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Container-fluid Ends--> */}

            </Fragment>
        )
    }
}

export default connect(Order, state => (
    {
        orders: state.order
    }
), actions);