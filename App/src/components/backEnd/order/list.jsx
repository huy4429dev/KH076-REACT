import React, { Component, Fragment } from 'react';
import "react-table-6/react-table.css"
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';
import moment from 'moment';
import connect from '../../../lib/connect';
import $ from 'jquery';
import * as actions from '../../../actions/backEnd/order';
import ModalDelete from './../../../components/backEnd/modalDelete';
import Pagination from "react-bootstrap-4-pagination";
import ModalEdit from './edit';
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
class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            checkedValues: [],
            myData: props.myData,
            total: props.total,
            itemEdit: null,
            showEdit: false,
            openModalEdit: false,
            itemId: null,
            openModalDelete: false,
            page: 1,
            pageSize: 25,
            filter: {
            }
        }
    }

    componentDidMount() {

        this.setState({ loading: false });
        $('.page-link').on('click', (e) => e.preventDefault());
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.myData && nextProps.myData != this.props.myData) {
            this.setState({ myData: nextProps.myData })
        }
    }
    onOpenModalEdit = () => {
        this.setState({
            openModalEdit: true
        });
    };

    onCloseModalEdit = () => {
        this.setState({
            openModalEdit: false
        });
    };

    onCloseModalDelete = () => {
        this.setState({
            openModalDelete: false
        });
    }

    onOpenModalDelete = () => {
        this.setState({
            openModalDelete: true
        });
    }


    handleDelete = (id) => {
        let ok = window.confirm("Bạn có muốn xóa")
        if (ok) {
            this.props.actions.deleteOrder(id);
        }
        // this.setState({
        //     openModalDelete: true,
        //     itemId: id
        // })
    }

    handleEdit = (item) => {

        this.setState({
            itemEdit: item,
            showEdit: true
        })

    }


    handleEditItem = (item) => {

        const { updateOrder } = this.props.actions;
        this.setState({
            loading: true
        });

        // updateOrder({
        //     ...item
        // }).then((data) => {

        //     if (data.success) {
        //         return data;
        //     } else {
        //         throw new Error('Something went wrong');
        //     }

        // })
        //     .then((data) => {
        //         this.setState({
        //             myData: this.props.myData,
        //             showEdit: false,
        //             itemEdit: null,
        //             loading: false
        //         });
        //         window.notify("Chỉnh sửa danh mục thành công");
        //     })
        //     .catch((err) => {
        //         this.setState({ loading: false });
        //         window.notify("Lỗi: " + err.message, "danger");
        //     });


    }

    handleDeleteItem = (id) => {

        const { deleteOrder } = this.props.actions;
        this.setState({
            loading: true
        });

        deleteOrder(id)
            .then((data) => {

                if (data.success) {
                    return data;
                } else {
                    throw new Error('Something went wrong');
                }

            })
            .then(() => {
                this.setState({
                    loading: false,
                    myData: this.props.myData,
                    itemId: null,
                    openModalDelete: false
                });

                window.notify("Xóa danh mục thành công");
            })
            .catch((err) => {
                this.setState({ loading: false });
            });
    }

    applyFilter = (filter) => {

        filter = { ...this.state.filter, ...filter };
        this.setState({
            filter,
            loading: true
        });

        const { getCategories } = this.props.actions;
        getCategories()
            .then(() => {
                this.setState({ loading: false });
            })
            .catch((err) => {
                this.setState({ loading: false });
                $.notify({ message: 'Tải xuống danh mục sản phẩm không thành công' }, { type: 'danger' });
            });
    }

    handlePageChange = (page) => {
        const { getCategories } = this.props.actions;
        this.setState({
            loading: true
        });

        getCategories(page)
            .then(() => {
                this.setState({ loading: false, page: page }, () => { console.log(this.state) });
            })
            .catch(err => {
                this.setState({ loading: false });
                window.notify('Lỗi: ', err.message)
            })
    }
    showStatus = (stt) => {
        const item = status.filter(item => Object.keys(item) == stt).map(item => { return Object.values(item) });
        return item[0];
    }

    render() {

        const { myData, total, loading, openModalEdit, openModalDelete, page, pageSize, filter } = this.state;
        return (

            <Fragment>
                {
                    loading ? 'LOADING'
                        : <table className="table">
                            <tr>
                                <th style={{ width: '5%' }}>#</th>
                                <th style={{ width: '15%' }}>Khách hàng</th>
                                <th style={{ width: '15%' }}>Hãng vận chuyển</th>
                                <th style={{ width: '10%' }}>Tổng tiền</th>
                                <th style={{ width: '5%' }}>Trạng thái</th>
                                <th style={{ width: '15%' }}>Ngày tạo</th>
                                <th style={{ width: '15%' }}>Ngày cập nhật</th>
                                <th style={{ width: '15%' }} className='text-center' colSpan='2'>Action</th>
                            </tr>

                            {
                                myData.map((item, index) => {
                                    return (
                                        <tr >
                                            <td>{++index}</td>
                                            <td>{item.user.username}</td>
                                            <td>{item.ship_address}</td>
                                            <td>{item.total.toLocaleString()} đ</td>
                                            <td>{item.status ?
                                                <span className="badge badge-secondary text-center" style={{ width: '100px' }}>
                                                    {this.showStatus(item.status)}
                                                </span>
                                                :
                                                <span class="badge badge-danger text-center" style={{ width: '100px' }}>Chờ xác nhận</span>}
                                            </td>
                                            <td>{moment(item.created_at).format("DD/MM/YYYY")}</td>
                                            <td>{moment(item.updated_at).format("DD/MM/YYYY")}</td>
                                            <td className='text-center'>
                                                <button style={{ padding: '5px 10px' }} type='button'
                                                    className='btn btn-warning btn-sm mr-1'
                                                    onClick={() => this.handleEdit(item)}>Sửa</button>
                                                <button style={{ padding: '5px 10px' }}
                                                    type='button' className='btn btn-primary btn-sm'
                                                    onClick={() => this.handleDelete(item.id)}>Xóa</button>
                                            </td>
                                        </tr>
                                    )
                                })

                            }

                        </table>
                }
                {
                    myData?.length == 0 && <div className="alert alert-warning text-center">Chưa có đơn hàng </div>
                }
                {
                    total > pageSize &&
                    <div className='d-flex justify-content-end'>
                        <Pagination
                            totalPages={total / pageSize + 1}
                            currentPage={page}
                            showMax={total > pageSize ? total / pageSize + 1 : 0}
                            size={"md"}
                            prevNext={true}
                            onClick={this.handlePageChange}
                        />
                    </div>
                }
                <ModalEdit
                    open={this.state.showEdit}
                    data={this.state.itemEdit}
                    onHandleEditItem={(item) => this.handleEditItem(item)}
                    onCloseModal={() => this.setState({ showEdit: false })}
                />

                {/* <ModalDelete
                    open={openModalDelete}
                    data={this.state.itemId}
                    title={'Xóa đơn hàng'}
                    onHandleDelete={(id) => this.handleDeleteItem(id)}
                    onCloseModal={(id) => this.onCloseModalDelete(id)}
                /> */}




            </Fragment>


        )
    }
}


export default connect(List, state => (
    {
    }
), actions);