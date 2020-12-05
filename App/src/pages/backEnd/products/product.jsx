import React, { Component, Fragment } from 'react';
import Breadcrumb from '../../../components/backEnd/breadCrumb';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import connect from '../../../lib/connect';
import SimpleReactValidator from 'simple-react-validator';
import * as actionProduct from '../../../actions/backEnd/product';
import * as actionCategory from '../../../actions/backEnd/category';
import Loading from '../../../components/backEnd/loading';
import CKEditors from "react-ckeditor-component";
import MyDropzone from '../../../components/backEnd/dropZone';

const customButton = { borderRadius: 0, paddingTop: '6px', paddingBottom: '6px', paddingLeft: '10px', paddingRight: '10px' };
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: true,
            name: '',
            description: '',
        };
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    componentDidMount = () => {

        this.setState({
            loading: true
        })
        const { getProducts, getCategories } = this.props.actions;

        getProducts()
            .then(() => {
                this.setState({ loading: false });
            })
            .catch((err) => {
                this.setState({ loading: false });
                window.notify('Tải xuống danh sách sản phẩm không thành công', 'danger');
            });

        getCategories('children=1')
            .then(() => {
                this.setState({ loading: false });
            })
            .catch((err) => {
                this.setState({ loading: false });
                window.notify('Tải xuống danh sách sản phẩm không thành công', 'danger');
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
            const { createProduct } = this.props.actionProduct;
            if (name === '' || name === null) return;
            createProduct({
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
        const { getProducts } = this.props.actionProduct;
        getProducts()
            .then(() => {
                this.setState({ loading: false });
            })
            .catch((err) => {
                this.setState({ loading: false });
                window.notify('Tải xuống danh sách sản phẩm không thành công', 'danger');
            });
    }

    render() {
        const { open, product } = this.state;
        const { products, categories } = this.props;
        const items = products.items ? products.items : [];
        const total = products.total ?? 0;
        console.log(categories, 'PRODUCTS');
        return (
            <Fragment>
                <Breadcrumb title="Sản phẩm" parent="Sản phẩm" />

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
                                                                    <input className="form-control" id="validationCustom01" type="text" required="" />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-form-label pt-0"><span>*</span> Số lượng</label>
                                                                    <input className="form-control" id="validationCustom02" type="text" required="" />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-form-label"><span>*</span> Danh mục</label>
                                                                    <select className="custom-select" required="">
                                                                        <option value="">--Select--</option>
                                                                        <option value="1">eBooks</option>
                                                                        <option value="2">Graphic Design</option>
                                                                        <option value="3">3D Impact</option>
                                                                        <option value="4">Application</option>
                                                                        <option value="5">Websites</option>
                                                                    </select>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-form-label"><span>*</span> Giá bán</label>
                                                                    <input className="form-control" id="validationCustom02" type="text" required="" />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label className="col-form-label"><span>*</span> Trạng thái</label>
                                                                    <div className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
                                                                        <label className="d-block">
                                                                            <input className="radio_animated" id="edo-ani" type="radio" name="rdo-ani" />
                                                    Đang kinh doanh
                                            </label>
                                                                        <label className="d-block" >
                                                                            <input className="radio_animated" id="edo-ani1" type="radio" name="rdo-ani" />
                                                    Ngừng kinh doanh
                                            </label>
                                                                    </div>
                                                                </div>
                                                                <label className="col-form-label pt-0"> Thêm hình ảnh</label>
                                                                <MyDropzone />
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
                                                                            content={this.state.content}
                                                                            events={{
                                                                                "blur": this.onBlur,
                                                                                "afterPaste": this.afterPaste,
                                                                                "change": this.onChange
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
                                                                    <button type="button" className="btn btn-primary">Lưu</button>
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
                                                            items.length > 0 ?
                                                                items.map((item, index) => {
                                                                    return (
                                                                        <tr>
                                                                            <td>{index++}</td>
                                                                            <td>Anh</td>
                                                                            <td>{item.name}</td>
                                                                            <td>Danh mục</td>
                                                                            <td>{item.name.toLocaleString()} đ</td>
                                                                            <td>{item.quantity}</td>
                                                                            <td>Trạng tdái</td>
                                                                            <td className='text-center'>
                                                                                <button style={{ padding: '5px 10px' }} type='button' className='btn btn-warning btn-sm mr-1' onClick={() => this.handleEdit()}>Sửa</button>
                                                                                <button style={{ padding: '5px 10px' }} type='button' className='btn btn-primary btn-sm' onClick={() => this.handleDelete()}>Xóa</button>
                                                                            </td>
                                                                        </tr>

                                                                    )
                                                                })


                                                                :
                                                                <div className="alert alert-warning">
                                                                    Chưa có sản phẩm nào
                                                            </div>
                                                        }

                                                    </tbody>
                                                </table>
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

export default connect(Product, state => (
    {
        products: state.product,
        categories: state.category,
    }
), { ...actionProduct, ...actionCategory });