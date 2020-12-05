import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

class Order extends Component {
    onCloseModal = () => {
        if (this.props.onCloseModal) {
            this.props.onCloseModal();
        }
    }
    render() {
        const { open, dataOrder } = this.props;
        console.log(dataOrder, "order");
        return (
            <Modal open={open} onClose={this.onCloseModal} >
                <div style={{ width: "560px" }}>
                    <div className="modal-header d-flex justify-content-center text-center">
                        <h5 className="modal-title" style={{ border: "none" }}>Đặt hàng thành công</h5>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="">
                                    <table className="table table-sm">
                                        <th>Tên sản phẩm</th>
                                        <th>Số lượng</th>
                                        <tbody>
                                            {dataOrder.products.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>{item.product.name}</td>
                                                        <td>{item.quantity}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-flex">
                                    <p className="font-weight-bold">Tổng tiền : </p>
                                    <p>{dataOrder.order.total} đ</p>
                                </div>
                                <div className="d-flex">
                                    <p className="font-weight-bold">Mã đơn hàng : </p>
                                    <p>{dataOrder.order.id}</p>
                                </div>
                                <div className="d-flex">
                                    <p className="font-weight-bold">Khách hàng : </p>
                                    <p>{dataOrder.user.username}</p>
                                </div>
                                <div className="d-flex">
                                    <p className="font-weight-bold">Số điện thoại : </p>
                                    <p>{dataOrder.user.phone} </p>
                                </div>
                                <div className="d-flex">
                                    <p className="font-weight-bold">Địa chỉ : </p>
                                    <p>{dataOrder.user.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}
export default Order;