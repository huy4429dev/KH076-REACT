import React, { Component, Fragment } from 'react';
// import ReactTable from 'react-table';
// import 'react-table/react-table.css';
import "react-table-6/react-table.css"
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import {
    Link,
} from "react-router-dom";
import moment from 'moment';
import connect from '../../../lib/connect';
import $ from 'jquery';
import * as actions from '../../../actions/backEnd/category';
import Loading from '../loading';
import { LogIn } from 'react-feather';
import ModalEdit from './edit';
import ModalDelete from './../../../components/backEnd/modalDelete';

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            checkedValues: [],
            myData: props.myData,
            itemEdit: null,
            showEdit: false,
            openModalEdit: false,
            itemId: null,
            openModalDelete: false,
        }
    }
    componentDidMount() {
        this.setState({ loading: false });
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
        this.setState({
            openModalDelete: true,
            itemId: id
        })
    }

    handleEdit = (item) => {

        this.setState({
            itemEdit: item,
            showEdit: true
        })

    }

    handleEditItem = (item) => {

        const { updateCategory } = this.props.actions;
        this.setState({
            loading: true
        });

        updateCategory({
            ...item
        }).then((data) => {

            if (data.success) {
                return data;
            } else {
                throw new Error('Something went wrong');
            }

        })
            .then((data) => {
                this.setState({
                    myData: this.props.myData,
                    showEdit: false,
                    itemEdit: null,
                    loading: false
                });

                window.notify("Chỉnh sửa danh mục thành công");

            })
            .catch((err) => {
                this.setState({ loading: false });
            });


    }

    handleDeleteItem = (id) => {

        const { deleteCategory } = this.props.actions;
        this.setState({
            loading: true
        });

        deleteCategory(id)
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

    render() {

        const { myData, loading, openModalEdit, openModalDelete } = this.state;

        return (

            <Fragment>
                {
                    loading ? 'LOADING'
                        : <table className="table">
                            <tr>
                                <th style={{ width: '5%' }}>#</th>
                                <th style={{ width: '20%' }}>Khách hàng</th>
                                <th style={{ width: '20%' }}>Điện thoại</th>
                                <th style={{ width: '15%' }}>Địa chỉ</th>
                                <th style={{ width: '15%' }}>Ngày thêm</th>
                                <th style={{ width: '10%' }} className='text-center' colSpan='2'>Action</th>
                            </tr>

                            {
                                myData.map((item, index) => {
                                    return (
                                        <tr >
                                            <td>{++index}</td>
                                            <td><Link to={`/admin/products/category/${item.id}`}>{item.name}</Link></td>
                                            <td>{item.description}</td>
                                            <td>{moment(item.created_at).format("DD/MM/YYYY")}</td>
                                            <td>{moment(item.updated_at).format("DD/MM/YYYY")}</td>
                                            <td>
                                                <button style={{ padding: '5px 10px' }} type='button' className='btn btn-warning btn-sm mr-1' onClick={() => this.handleEdit(item)}>Sửa</button>
                                                <button style={{ padding: '5px 10px' }} type='button' className='btn btn-primary btn-sm' onClick={() => this.handleDelete(item.id)}>Xóa</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }



                        </table>
                }


                <ModalEdit
                    open={this.state.showEdit}
                    data={this.state.itemEdit}
                    onHandleEditItem={(item) => this.handleEditItem(item)}
                    onCloseModal={() => this.setState({ showEdit: false })}
                />

                <ModalDelete
                    open={openModalDelete}
                    data={this.state.itemId}
                    onHandleDelete={(id) => this.handleDeleteItem(id)}
                    onCloseModal={(id) => this.onCloseModalDelete(id)}
                />


            </Fragment>


        )
    }
}


export default connect(List, state => (
    {
    }
), actions);