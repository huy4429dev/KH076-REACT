import React, { Component, Fragment } from 'react';
import Breadcrumb from './../../../components/backEnd/breadCrumb';
import Datatable from '../../../components/backEnd/products/listCategory';
import 'react-responsive-modal/styles.css';
import connect from './../../../lib/connect';
import SimpleReactValidator from 'simple-react-validator';
import * as actions from './../../../actions/backEnd/contact';
import Loading from './../../../components/loadding2';
import Create from './create';
import queryString from 'query-string';
import Pagination from "react-bootstrap-4-pagination";
import moment from 'moment';
import $ from 'jquery';
import {
    Link,
} from "react-router-dom";
import Edit from './edit';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: true,
            name: '',
            description: '',
            openCreate: false,
            openEdit: false,
            dataEdit: null,
            filter: {
                page: 1,
                pageSize: 25
            }
        };
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    componentDidMount = () => {
        $('.page-link').on('click', (e) => e.preventDefault());
        this.getData();
    }
    getData = () => {
        this.setState({
            loading: true
        })
        const param = queryString.stringify(this.state.filter);
        const { getList } = this.props.actions;
        getList(param)
            .then(() => {
                this.setState({ loading: false });
            })
            .catch((err) => {
                this.setState({ loading: false });
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
            const { createCategory } = this.props.actions;
            if (name === '' || name === null) return;
            createCategory({
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
    handleDelete = (id) => {
        this.props.actions.remove(id).
            then(data => {
                this.setState({ loading: false })
                if (data.success) {
                    window.notify("Xóa thành công");
                } else {
                    window.notify("Xóa không thành công", "danger");
                }
            }).catch(err => {
                this.setState({ loading: false })
                window.notify("Xóa không thành công", "danger");
            })
    }
    handleEdit = (item) => {
        this.setState({
            dataEdit: item,
            openEdit: true
        })
    }
    change = (value) => {
        this.setState({
            filter: {
                ...this.state.filter,
                page: value
            }
        }, () => {
            this.getData();
        })
    }
    render() {
        const { open, category, filter } = this.state;
        const { categories } = this.props;
        const { contacts } = this.props.contact;
        console.log(contacts, "dmm");

        return (
            <Fragment>
                <Breadcrumb title="Liên hệ" parent="Admin" />
                <Loading type="full" show={this.state.show} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Danh sách liên hệ</h5>
                                </div>
                                <div className="card-body">
                                    {/* <div className="btn-popup pull-right">
                                        <Create open={this.state.openCreate}
                                            onCloseModal={() => this.setState({ openCreate: false })}
                                        />
                                        <button type="button" className="btn btn-secondary"
                                            onClick={() => this.setState({ openCreate: true })} data-toggle="modal" data-original-title="test" data-target="#exampleModal">Thêm mới</button>

                                    </div> */}
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        {
                                            !this.state.loading &&
                                            <React.Fragment>
                                                <table className="table">
                                                    <tr>
                                                        <th style={{ width: '5%' }}>#</th>
                                                        <th style={{ width: '20%' }}>Nội dung</th>
                                                        <th style={{ width: '20%' }}>Người gửi</th>
                                                        <th style={{ width: '15%' }}>Ngày tạo</th>
                                                        <th style={{ width: '10%' }} className='text-center' colSpan='2'>Action</th>
                                                    </tr>
                                                    {
                                                        contacts && (
                                                            contacts.items.map((item, index) => {
                                                                return (
                                                                    <tr >
                                                                        <td>{++index}</td>
                                                                        <td>{item.message}</td>
                                                                        <td>{item.user.username}</td>
                                                                        <td>{moment(item.created_at).format("DD/MM/YYYY")}</td>
                                                                        <td>
                                                                            <div className="d-flex">
                                                                                {/* <button style={{ padding: '5px 10px' }} type='button' className='btn btn-warning btn-sm mr-1' onClick={() => this.handleEdit(item)}>Sửa</button> */}
                                                                                <button style={{ padding: '5px 10px' }} type='button' className='btn btn-primary btn-sm' onClick={() => this.handleDelete(item.id)}>Xóa</button>
                                                                            </div>

                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        )

                                                    }
                                                </table>
                                                {
                                                    contacts?.items.length == 0 &&
                                                    <p className="text-center alert alert-warning">Chưa có danh mục</p>
                                                }
                                                {
                                                    contacts?.items.length > 0 && (
                                                        <div className="mt-5">
                                                            <Pagination
                                                                threeDots
                                                                totalPages={contacts ? Math.ceil(contacts.total / filter.pageSize) : 0}
                                                                currentPage={filter.page}
                                                                showMax={7}
                                                                prevNext
                                                                activeBgColor="#18eaca"
                                                                activeBorderColor="#7bc9c9"
                                                                onClick={(page) => this.change(page)}
                                                            />
                                                        </div>
                                                    )
                                                }

                                            </React.Fragment>
                                        }
                                        <Edit open={this.state.openEdit}
                                            dataEdit={this.state.dataEdit}
                                            onCloseModal={() => this.setState({ openEdit: false })}
                                        />
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

export default connect(Contact, state => (
    {
        categories: state.category,
        contact: state.contact
    }
), actions);