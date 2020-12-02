import React, { Component, Fragment } from 'react';
import Breadcrumb from '../../../components/backEnd/breadCrumb';
import Datatable from '../../../components/backEnd/products/listCategory';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import connect from '../../../lib/connect';
import SimpleReactValidator from 'simple-react-validator';
import * as actions from '../../../actions/backEnd/category';
import Loading from '../../../components/backEnd/loading';
import $ from 'jquery';
class CategoryDetailt extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            loading: false,
            categories: null
        };

        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const { getCategory } = this.props.actions;

        this.setState({
            loading: true
        });

        getCategory(id)
            .then(data => {
                this.setState({ loading: false, categories: data.data });
            })
            .catch(err => {
                this.setState({ loading: false });
                window.notify("Xảy ra lỗi: " + err.message);
            });
    }

    onOpenModal = () => {
        this.setState({
            open: true
        });
    }

    onCloseModal = () => {
        this.setState({
            open: false
        });
    }

    render() {
        const { open, categories } = this.state;

        console.log(categories, 'DATA');
        const items = [{ id: 1, name: 'x1', description: 'xxx' }];
        return (
            <Fragment>
                <Breadcrumb title="Chi tiết" parent="Danh mục" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>CHI TIẾT DANH MỤC</h5>
                                    <button type="button" className="btn btn-secondary" onClick={this.onOpenModal} data-toggle="modal" data-original-title="test" data-target="#exampleModal">Thêm mới</button>
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
                                                            value="1"
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
                                                    <button type="button" className="btn btn-primary" onClick={() => this.onCloseModal()}>Hủy</button>
                                                </div>
                                            </form>
                                        </Modal>
                                    </div>
                                    <div className="card bg-light mb-3" style={{maxWidth: '18rem'}}>
                                        <div className="card-header">Header</div>
                                        <div className="card-body">
                                            <h5 className="card-title">Light card title</h5>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                    <div id="basicScenario" className="product-physical">
                                        {
                                            this.state.loading
                                                ? "LOADINGGGGGGGGG"
                                                : <Datatable
                                                    myData={items}
                                                    class="-striped -highlight"
                                                />
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default connect(CategoryDetailt, state => (
    {
    }
), actions);

