import React, { Component, Fragment } from 'react';
import Breadcrumb from './../../../components/backEnd/breadCrumb';
import Datatable from '../../../components/backEnd/products/listCategory';
import 'react-responsive-modal/styles.css';
import connect from './../../../lib/connect';
import SimpleReactValidator from 'simple-react-validator';
import * as actions from './../../../actions/backEnd/blog';
import Loading from './../../../components/loadding2';
import Create from './create';
import queryString from 'query-string';
import Pagination from "react-bootstrap-4-pagination";
import moment from 'moment';
import {
    Link,
} from "react-router-dom";
import Edit from './edit';

class Blog extends Component {
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
    render() {
        const { open, category } = this.state;
        const { categories } = this.props;
        // const items = categories.items ? categories.items : [];
        const { blogs } = this.props.blog;
        console.log(blogs, "âs");

        return (
            <Fragment>
                <Breadcrumb title="Tin tức" parent="Digital" />
                <Loading type="full" show={this.state.show} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Danh sách bài viết</h5>
                                </div>
                                <div className="card-body">
                                    <div className="btn-popup pull-right">
                                        <Create open={this.state.openCreate}
                                            onCloseModal={() => this.setState({ openCreate: false })}
                                        />
                                        <button type="button" className="btn btn-secondary"
                                            onClick={() => this.setState({ openCreate: true })} data-toggle="modal" data-original-title="test" data-target="#exampleModal">Thêm mới</button>

                                    </div>
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        {
                                            !this.state.loading &&
                                            <React.Fragment>
                                                <table className="table">
                                                    <tr>
                                                        <th style={{ width: '5%' }}>#</th>
                                                        <th style={{ width: '20%' }}>Tên</th>
                                                        <th style={{ width: '20%' }}>Ảnh</th>
                                                        <th style={{ width: '20%' }}>Mô tả</th>
                                                        <th style={{ width: '15%' }}>Ngày tạo</th>
                                                        <th style={{ width: '10%' }} className='text-center' colSpan='2'>Action</th>
                                                    </tr>
                                                    {
                                                        blogs && (
                                                            blogs.items.map((item, index) => {
                                                                return (
                                                                    <tr >
                                                                        <td>{++index}</td>
                                                                        <td>{item.title}</td>
                                                                        <td><img src={item.image} style={{ height: "50px", width: "50px" }} /></td>
                                                                        <td>{item.disception}</td>
                                                                        <td>{moment(item.created_at).format("DD/MM/YYYY")}</td>
                                                                        <td>
                                                                            <div className="d-flex">
                                                                                <button style={{ padding: '5px 10px' }} type='button' className='btn btn-warning btn-sm mr-1' onClick={() => this.handleEdit(item)}>Sửa</button>
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
                                                    blogs?.items.length == 0 &&
                                                    <p className="text-center alert alert-warning">Chưa có danh mục</p>
                                                }
                                                {/* <Pagination
                                                    totalPages={total / pageSize + 1}
                                                    currentPage={page}
                                                    showMax={total > pageSize ? total / pageSize + 1 : 0}
                                                    size={"md"}
                                                    prevNext={true}
                                                    onClick={this.handlePageChange}
                                                /> */}
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

export default connect(Blog, state => (
    {
        categories: state.category,
        blog: state.blogAdmin
    }
), actions);