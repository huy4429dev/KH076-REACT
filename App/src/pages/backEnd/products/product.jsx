import React, { Component, Fragment } from 'react';
import Breadcrumb from '../../../components/backEnd/breadCrumb';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import connect from '../../../lib/connect';
import SimpleReactValidator from 'simple-react-validator';
import * as actionProduct from '../../../actions/backEnd/product';
import * as actionCategory from '../../../actions/backEnd/category';
import * as actionColor from '../../../actions/backEnd/productColor';
import * as actionSize from '../../../actions/backEnd/productSize';
import Loading from '../../../components/backEnd/loading';
import CKEditors from "react-ckeditor-component";
import MyDropzone from '../../../components/backEnd/dropZone';
import ReactTooltip from 'react-tooltip';
import ModalDelete from './../../../components/backEnd/modalDelete';
import Pagination from "react-bootstrap-4-pagination";
import $ from 'jquery';
import {
    Link,
} from "react-router-dom";

const customButton = { borderRadius: 0, paddingTop: '6px', paddingBottom: '6px', paddingLeft: '10px', paddingRight: '10px' };
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openEdit: false,
            open: false,
            loading: true,
            name: '',
            quantity: 0,
            price: 0,
            status: 1,
            categoryId: 0,
            description: null,
            images: [],
            colors: [],
            sizes: [],
            discount: 0,
            bought: 0,
            total: props.total,
            itemEdit: null,
            showEdit: false,
            openModalEdit: false,
            itemId: null,
            openModalDelete: false,
            page: 1,
            pageSize: 25,
            q: ''
        };
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            messages: {
                required: 'Dữ liệu không hợp lệ ',
            }
        });
    }

    componentDidMount = () => {

        this.setState({
            loading: true
        })
        const { getProducts, getCategories, getColors, getSizes } = this.props.actions;

        Promise.all([
            getProducts(),
            getCategories('children=1'),
            getColors(),
            getSizes()
        ])
            .then(() => {
                this.setState({ loading: false });
                $('.page-link').on('click', (e) => e.preventDefault());
            })
            .catch((err) => {
                this.setState({ loading: false });
                window.notify('Lỗi: ' + err.message, 'danger');
            })

    }

    handleOnSearch = (event) => {

        const { searchProducts } = this.props.actions;

        const value = event.target.value;


        if (this.state.q !== value && !this.state.loading) {

            if (this.searchTimer) {
                clearTimeout(this.searchTimer);
            }

            this.searchTimer = setTimeout(() => {

                this.setState({
                    loading: true
                })


                searchProducts(1, `&q=${value}`)
                    .then(() => {
                        this.setState({ loading: false, q: value });
                    })
                    .catch((err) => {
                        this.setState({ loading: false });
                        window.notify('Lỗi: ' + err.message, 'danger');
                    })



            }, 800);
        }

    }


    handleInputOnchange = (event) => {

        const target = event.target;
        const value = target.value;
        const tagName = target.name;
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

            const { name, quantity, price, status, categoryId, description, images, colors, sizes, discount, bought } = this.state;
            const { createProduct } = this.props.actions;
            createProduct({
                name, description, quantity, price, status, categoryId, description, images, colors, sizes, discount, bought
            })
                .then((data) => {
                    if (data.success) {
                        return data;
                    } else {
                        throw new Error('Something went wrong');
                    }
                })
                .then((data) => {
                    this.setState(
                        {
                            open: false,
                            loading: false,
                            name: '',
                            quantity: 0,
                            price: 0,
                            status: 1,
                            categoryId: 0,
                            description: null,
                            images: [],
                            colors: [],
                            sizes: [],
                            discount: 0,
                            bought: 0
                        }
                    );
                    window.notify("Thêm mới sản phẩm thành công");

                })
                .catch((err) => {
                    this.setState({ loading: false });
                    window.notify("Lỗi " + err.message, "danger");
                });

            this.onCloseModal();

        } else {

            this.validator.showMessages();
        }

    }

    onOpenModal = () => {
        this.setState({
            open: true,
            name: null,
            description: null,
        });
    };

    onCloseModal = () => {
        this.setState({
            open: false,
            showEdit: false
        });
    };

    handlelRefresh = () => {

        this.setState({
            loading: true
        })
        const { getProducts, getCategories, getColors, getSizes } = this.props.actions;

        Promise.all([
            getProducts(),
            getCategories('children=1'),
            getColors(),
            getSizes()
        ])
            .then(() => {
                this.setState({ loading: false });
            })
            .catch((err) => {
                this.setState({ loading: false });
                window.notify('Lỗi: ' + err.message, 'danger');
            })

    }

    handeUploadImage = (url) => {
        this.setState({
            images: [...this.state.images, { url }]
        });
    }


    handlePickColor = (id) => {

        let { colors } = this.state;
        let color = colors.filter(item => item.id === id)[0];
        if (color == null) {
            color = {
                id: id
            };
            colors = [...colors, color];
        }
        else {
            colors = colors.filter(item => item.id != id)
            colors = [...colors];
        }

        this.setState({
            colors
        });

    }

    handleCkEditorOnchange = (evt) => {

        this.setState({
            description: evt.editor.getData()
        });
    }

    filterActiveColors = (colorLists, colorPicks) => {


        colorLists = colorLists.map(item => {
            let any = colorPicks.some(pick => pick.id == item.id);
            if (any) {
                return { id: item.id, name: item.name, color: item.color, active: true };
            }
            return { id: item.id, name: item.name, color: item.color }
        })



        return colorLists;

    }


    handlePickSize = (id) => {

        let { sizes } = this.state;
        let size = sizes.filter(item => item.id === id)[0];
        if (size == null) {
            size = {
                id: id
            };
            sizes = [...sizes, size];
        }
        else {
            sizes = sizes.filter(item => item.id != id)
            sizes = [...sizes];
        }

        this.setState({
            sizes
        }, () => console.log(this.state.sizes, 'STATE SIZES'));

    }

    handleDelete = (id) => {

        this.setState({
            openModalDelete: true,
            itemId: id
        });

    }

    onCloseModalDelete = () => {
        this.setState({
            openModalDelete: false
        })
    }

    handleEdit = (item) => {

        let { itemEdit } = this.state;

        this.setState({
            itemEdit: item,
            showEdit: true
        });

        console.log(item, 'ITEM EDIT');

    }

    handlePageChange = (page) => {

        
        this.setState({
            loading: true
        })
        const { searchProducts } = this.props.actions;
        const {q} = this.state;
        let filter = `&q=${q}`;
        searchProducts(page,filter)
            .then(() => {
                this.setState({ loading: false, page: page });
            })
            .catch((err) => {
                this.setState({ loading: false });
                window.notify('Lỗi: ' + err.message, 'danger');
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

        const { deleteProduct } = this.props.actions;
        this.setState({
            loading: true
        });

        deleteProduct(id)
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

                window.notify("Xóa sản phẩm thành công");
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    itemId: null,
                    openModalDelete: false
                });
                window.notify("Cảnh báo: Ràng buộc đơn hàng", "warning");
            });
    }

    render() {
        const { open, colors, loading, openModalEdit, openModalDelete, page, pageSize, filter, showEdit, q } = this.state;
        let { products, categories, productColors, productSizes } = this.props;
        categories = categories ?? null;
        productColors = productColors ?? null;
        productSizes = productSizes ?? null;
        const items = products.items ? products.items : [];
        const total = products.total ?? 0;
        productColors.items = this.filterActiveColors(productColors.items, colors);

        return (
            <Fragment>
                <Breadcrumb title="Sản phẩm" parent="Sản phẩm" />

                {/* <!-- Container-fluid starts--> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>SẢN PHẨM</h5>
                                    <div className='d-flex align-items-center'>
                                        <div className="form-group mb-0 mr-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ fontSize: '14px', outline: 'none' }}
                                                placeholder='Tìm kiếm sản phẩm ...'
                                                name='q'
                                                onChange={this.handleOnSearch}
                                            />
                                        </div>
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
                                                <h5 className="modal-title f-w-600" id="exampleModalLabel2">Thêm sản phẩm</h5>
                                            </div>
                                            <div className="row product-adding">
                                                <div className="col-xl-6">
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <h5>Thông tin chung</h5>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="digital-add needs-validation">
                                                                <div className="form-group">
                                                                    <label className="col-form-label pt-0"><span>*</span>Tên sản phẩm</label>
                                                                    <input onChange={this.handleInputOnchange} name="name" className="form-control" id="validationCustom01" type="text" required="" />
                                                                    {this.validator.message('name', this.state.name, 'required', { className: 'text-danger mt-1' })}
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-form-label pt-0"><span>*</span> Số lượng</label>
                                                                    <input onChange={this.handleInputOnchange} name='quantity' className="form-control" id="validationCustom02" type="text" required="" />
                                                                    {this.validator.message('quantity', this.state.name, 'required|number', { className: 'text-danger mt-1' })}
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-form-label"><span>*</span> Danh mục</label>
                                                                    <select name='categoryId' onChange={this.handleInputOnchange} className="custom-select" required="">
                                                                        <option value="">Danh mục</option>
                                                                        {
                                                                            categories != null && categories.items.map((item, index) => {

                                                                                if (item.children?.length && item.children?.length == 0) {
                                                                                    return <option value={item.id} style={{ color: 'blue' }} >{item.name}</option>
                                                                                }
                                                                                else {
                                                                                    let optionParent = <option value={item.id} style={{ color: 'blue', fontWeight: 'bold' }}>{item.name}</option>;
                                                                                    if (item.children?.length > 0) {
                                                                                        let optionChilds = item.children.map((child, childIndex) => {
                                                                                            return <option value={child.id}>{child.name}</option>;
                                                                                        })

                                                                                        return [optionParent, optionChilds]
                                                                                    }
                                                                                    else {
                                                                                        return optionParent
                                                                                    }
                                                                                }
                                                                            })

                                                                        }
                                                                    </select>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-form-label"><span>*</span> Giá bán</label>
                                                                    <input name='price' onChange={this.handleInputOnchange} className="form-control" id="validationCustom02" type="text" required="" />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-form-label">Giảm giá (%)</label>
                                                                    <input name='discount' onChange={this.handleInputOnchange} className="form-control" id="validationCustom02" type="text" required="" />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-form-label"><span>*</span> Trạng thái</label>
                                                                    <div className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                        <label className="d-block mr-2">
                                                                            <input onChange={this.handleInputOnchange} valye={1} checked className="radio_animated" id="edo-ani" type="radio" name="status" />
                                                                            <span style={{ color: 'green' }}>Đang kinh doanh</span>
                                                                        </label>
                                                                        <label className="d-block mr-0" >
                                                                            <input onChange={this.handleInputOnchange} valye={0} className="radio_animated" id="edo-ani1" type="radio" name="status" />
                                                                            <span>Ngừng kinh doanh</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <label className="col-form-label pt-0"> Thêm hình ảnh</label>
                                                                <MyDropzone
                                                                    onUpload={this.handeUploadImage}
                                                                />
                                                                <div className="form-group">
                                                                    <label className="col-form-label">Mẫu màu</label>
                                                                    <div className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                        <label className="d-block mr-2 d-flex">
                                                                            {
                                                                                productColors != null &&
                                                                                    productColors.items.length > 0 ?

                                                                                    productColors.items.map(item => (
                                                                                        <span
                                                                                            onClick={() => this.handlePickColor(item.id)}
                                                                                            data-tip={item.name}
                                                                                            className='d-block mr-1'
                                                                                            style={{ width: '20px', height: '20px', background: item.color, opacity: item.active ? 1 : 0.5 }}>
                                                                                        </span>
                                                                                    ))
                                                                                    : <span>Chưa có mẫu màu</span>


                                                                            }

                                                                            <ReactTooltip />
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                <div className="form-group">
                                                                    <label className="col-form-label">Mẫu size</label>
                                                                    <div className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                        {
                                                                            productSizes != null &&
                                                                                productSizes.items.length > 0 ?

                                                                                productSizes.items.map(item => (
                                                                                    <label className="d-block mr-2">
                                                                                        <input onChange={() => this.handlePickSize(item.id)}
                                                                                            type="checkbox"
                                                                                            name="size"
                                                                                            className="mr-2"
                                                                                        />
                                                                                        <span style={{ color: 'green' }}>{item.name}</span>
                                                                                    </label>
                                                                                ))
                                                                                : <span>Chưa có mẫu size</span>
                                                                        }

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6">
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <h5>Thêm mô tả</h5>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="digital-add needs-validation">
                                                                <div className="form-group mb-0">
                                                                    <div className="description-sm">
                                                                        <CKEditors
                                                                            activeclassName="p10"
                                                                            content={this.state.description}
                                                                            events={{
                                                                                "change": this.handleCkEditorOnchange
                                                                            }}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="form-group mb-0">
                                                                <div className="product-buttons text-center">
                                                                    <button onClick={this.handleSubmit} type="button" className="btn btn-primary">Lưu</button>
                                                                    <button type="button" className="btn btn-light">Hủy</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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

                                                <table className='table'>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th></th>
                                                            <th>Sản phẩm</th>
                                                            <th>Danh mục</th>
                                                            <th>Giá bán</th>
                                                            <th>Tồn kho</th>
                                                            <th>Trạng thái</th>
                                                            <th className='text-center'>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            items.length > 0 &&
                                                            items.map((item, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{index++}</td>
                                                                        <td><img style={{ width: '50px' }} src={item.images[0]?.url} alt="" /></td>
                                                                        <td><Link to={`/admin/products/detail/${item.id}`} >   {item.name} </Link></td>
                                                                        <td>{item.category.name}</td>
                                                                        <td>{item.price.toLocaleString()} đ</td>
                                                                        <td>{item.quantity}</td>
                                                                        <td>{item.status === 1 ? <span class="badge badge-success">Đang KD</span> : <span class="badge badge-warning">Dừng KD</span>}</td>
                                                                        <td className='text-center'>
                                                                            <button style={{ padding: '5px 10px' }} type='button' className='btn btn-warning btn-sm mr-1' onClick={() => this.handleEdit(item)}>Sửa</button>
                                                                            <button style={{ padding: '5px 10px' }} type='button' className='btn btn-primary btn-sm' onClick={() => this.handleDelete(item.id)}>Xóa</button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })

                                                        }

                                                    </tbody>
                                                </table>
                                        }
                                        {
                                            items.length === 0 &&
                                            <div className="alert alert-warning text-center">
                                                Chưa có sản phẩm nào
                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

                <ModalDelete
                    open={openModalDelete}
                    data={this.state.itemId}
                    title={'Xóa sản phẩm'}
                    onHandleDelete={(id) => this.handleDeleteItem(id)}
                    onCloseModal={() => this.onCloseModalDelete()}
                />
                <Modal open={showEdit} onClose={this.onCloseModal} >
                    <div className="modal-header">
                        <h5 className="modal-title f-w-600" id="exampleModalLabel2">Sửa sản phẩm</h5>
                    </div>
                    <div className="row product-adding">
                        <div className="col-xl-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Thông tin chung</h5>
                                </div>
                                <div className="card-body">
                                    <div className="digital-add needs-validation">
                                        <div className="form-group">
                                            <label className="col-form-label pt-0"><span>*</span>Tên sản phẩm</label>
                                            <input onChange={this.handleInputOnchange} name="name" className="form-control" id="validationCustom01" type="text" required="" />
                                            {this.validator.message('name', this.state.name, 'required', { className: 'text-danger mt-1' })}
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label pt-0"><span>*</span> Số lượng</label>
                                            <input onChange={this.handleInputOnchange} name='quantity' className="form-control" id="validationCustom02" type="text" required="" />
                                            {this.validator.message('quantity', this.state.name, 'required|number', { className: 'text-danger mt-1' })}
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label"><span>*</span> Danh mục</label>
                                            <select name='categoryId' onChange={this.handleInputOnchange} className="custom-select" required="">
                                                <option value="">Danh mục</option>
                                                {
                                                    categories != null && categories.items.map((item, index) => {

                                                        if (item.children?.length && item.children?.length == 0) {
                                                            return <option value={item.id} style={{ color: 'blue' }} >{item.name}</option>
                                                        }
                                                        else {
                                                            let optionParent = <option value={item.id} style={{ color: 'blue', fontWeight: 'bold' }}>{item.name}</option>;
                                                            if (item.children?.length > 0) {
                                                                let optionChilds = item.children.map((child, childIndex) => {
                                                                    return <option value={child.id}>{child.name}</option>;
                                                                })

                                                                return [optionParent, optionChilds]
                                                            }
                                                            else {
                                                                return optionParent
                                                            }
                                                        }
                                                    })

                                                }
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label"><span>*</span> Giá bán</label>
                                            <input name='price' onChange={this.handleInputOnchange} className="form-control" id="validationCustom02" type="text" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label">Giảm giá (%)</label>
                                            <input name='discount' onChange={this.handleInputOnchange} className="form-control" id="validationCustom02" type="text" required="" />
                                        </div>
                                        <div className="form-group">
                                            <label className="col-form-label"><span>*</span> Trạng thái</label>
                                            <div className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                <label className="d-block mr-2">
                                                    <input onChange={this.handleInputOnchange} valye={1} checked className="radio_animated" id="edo-ani" type="radio" name="status" />
                                                    <span style={{ color: 'green' }}>Đang kinh doanh</span>
                                                </label>
                                                <label className="d-block mr-0" >
                                                    <input onChange={this.handleInputOnchange} valye={0} className="radio_animated" id="edo-ani1" type="radio" name="status" />
                                                    <span>Ngừng kinh doanh</span>
                                                </label>
                                            </div>
                                        </div>
                                        <label className="col-form-label pt-0"> Thêm hình ảnh</label>
                                        <MyDropzone
                                            onUpload={this.handeUploadImage}
                                        />
                                        <div className="form-group">
                                            <label className="col-form-label">Mẫu màu</label>
                                            <div className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                <label className="d-block mr-2 d-flex">
                                                    {
                                                        productColors != null &&
                                                            productColors.items.length > 0 ?

                                                            productColors.items.map(item => (
                                                                <span
                                                                    onClick={() => this.handlePickColor(item.id)}
                                                                    data-tip={item.name}
                                                                    className='d-block mr-1'
                                                                    style={{ width: '20px', height: '20px', background: item.color, opacity: item.active ? 1 : 0.5 }}>
                                                                </span>
                                                            ))
                                                            : <span>Chưa có mẫu màu</span>


                                                    }

                                                    <ReactTooltip />
                                                </label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-form-label">Mẫu size</label>
                                            <div className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                {
                                                    productSizes != null &&
                                                        productSizes.items.length > 0 ?

                                                        productSizes.items.map(item => (
                                                            <label className="d-block mr-2">
                                                                <input onChange={() => this.handlePickSize(item.id)}
                                                                    type="checkbox"
                                                                    name="size"
                                                                    className="mr-2"
                                                                />
                                                                <span style={{ color: 'green' }}>{item.name}</span>
                                                            </label>
                                                        ))
                                                        : <span>Chưa có mẫu size</span>
                                                }

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Thêm mô tả</h5>
                                </div>
                                <div className="card-body">
                                    <div className="digital-add needs-validation">
                                        <div className="form-group mb-0">
                                            <div className="description-sm">
                                                <CKEditors
                                                    activeclassName="p10"
                                                    content={this.state.description}
                                                    events={{
                                                        "change": this.handleCkEditorOnchange
                                                    }}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="product-buttons text-center">
                                            <button onClick={this.handleSubmit} type="button" className="btn btn-primary">Lưu</button>
                                            <button type="button" className="btn btn-light">Hủy</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </Fragment>
        )
    }
}

export default connect(Product, state => (
    {
        products: state.product,
        categories: state.category,
        productColors: state.productColor,
        productSizes: state.productSize,
    }
), { ...actionProduct, ...actionCategory, ...actionColor, ...actionSize });