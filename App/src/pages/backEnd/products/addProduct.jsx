import React, { Component, Fragment } from 'react';
import Breadcrumb from '../../../components/backEnd/breadCrumb';
import CKEditors from "react-ckeditor-component";
import MyDropzone from '../../../components/backEnd/dropZone';

export class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: 'hello world',
        }
    }
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Thêm Sản phẩm" parent="Sản phẩm" />
                <div className="container-fluid">
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
                </div>
            </Fragment >
        )
    }
}

export default Add
