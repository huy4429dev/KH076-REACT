import React, { Component, Fragment } from 'react';
import Breadcrumb from './../../../components/backEnd/breadCrumb';
import Datatable from '../../../components/backEnd/products/listCategory';
import 'react-responsive-modal/styles.css';
import connect from './../../../lib/connect';
import SimpleReactValidator from 'simple-react-validator';
import * as actions from './../../../actions/backEnd/shop';
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
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            messages: {
                required: 'Dữ liệu không hợp lệ',
                email: 'Email không hợp lệ'
            }
        });
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
                    window.notify("Thêm mới shop thành công");
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
    handleDelete = (id, userId) => {
        this.props.actions.remove(id, userId).
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
        const { shops } = this.props.shop;
        console.log(shops, "dmm");

        return (
            <Fragment>
                <Breadcrumb title="Liên hệ" parent="Admin" />
                <Loading type="full" show={this.state.show} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Danh sách shop</h5>
                                    <div className="btn-popup pull-right">
                                        <Create open={this.state.openCreate}
                                            onCloseModal={() => this.setState({ openCreate: false })}
                                        />
                                        <button type="button" className="btn btn-secondary"
                                            onClick={() => this.setState({ openCreate: true })} data-toggle="modal" data-original-title="test" data-target="#exampleModal">Thêm mới</button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        {
                                            !this.state.loading &&
                                            <React.Fragment>
                                                <table className="table">
                                                    <tr>
                                                        <th style={{ width: '5%' }}>#</th>
                                                        <th style={{ width: '20%' }}>Tên cửa hàng</th>
                                                        <th style={{ width: '20%' }}>Avatar</th>
                                                        <th style={{ width: '20%' }}>Tài khoản</th>
                                                        <th style={{ width: '20%' }}>Mô tả</th>
                                                        <th style={{ width: '15%' }}>Ngày tạo</th>
                                                        <th style={{ width: '10%' }} className='text-center' colSpan='2'>Action</th>
                                                    </tr>
                                                    {
                                                        shops && (
                                                            shops.items.map((item, index) => {
                                                                return (
                                                                    <tr >
                                                                        <td>{++index}</td>
                                                                        <td>{item.name}</td>
                                                                        <td><img style={{ width: "50px", height: "50px" }} src={item.avatar} /></td>
                                                                        <td>{item.users[0].username}</td>
                                                                        <td>{item.description}</td>
                                                                        <td>{moment(item.created_at).format("DD/MM/YYYY")}</td>
                                                                        <td>
                                                                            <div className="d-flex">
                                                                                <button style={{ padding: '5px 10px' }} type='button' className='btn btn-primary btn-sm' onClick={() => this.handleDelete(item.id, item.users[0].id)}>Xóa</button>
                                                                                <button style={{ padding: '5px 10px' }} type='button' className='ml-1 btn btn-primary btn-sm' onClick={() => this.handleEdit(item)}>Sửa</button>
                                                                            </div>

                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        )

                                                    }
                                                </table>
                                                {
                                                    shops?.items.length == 0 &&
                                                    <p className="text-center alert alert-warning">Chưa có danh mục</p>
                                                }
                                                {
                                                    shops?.items.length > 0 && (
                                                        <div className="mt-5">
                                                            <Pagination
                                                                threeDots
                                                                totalPages={shops ? Math.ceil(shops.total / filter.pageSize) : 0}
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
        contact: state.contact,
        shop: state.shop
    }
), actions);