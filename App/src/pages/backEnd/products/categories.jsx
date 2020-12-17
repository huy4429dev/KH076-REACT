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

class Categories extends Component {
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
        const { getCategories } = this.props.actions;
        getCategories()
            .then((data) => {
                this.setState({ loading: false });

                console.log(data, 'DATA CALL ALL CATEGORIES');

            })
            .catch((err) => {
                this.setState({ loading: false });
                $.notify({ message: 'Tải xuống danh mục sản phẩm không thành công' }, { type: 'danger' });
            }); 

    }


    handleInputOnchange = (event) => {

        const target = event.target;
        const value = target.value;
        const tagName = target.name;
        this.setState({
            [tagName]: value
        } ,  () => console.log(this.state, 'NEW STATE'));

    }

    handleSubmit = (event) => {

        event.preventDefault();


        if (this.validator.allValid()) {

            this.setState({
                loading: true
            });

            const { name, description } = this.state;
            const { createCategory } = this.props.actions;

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

    render() {

        const { open, category } = this.state;
        const { categories } = this.props;
        const items = categories.items ? categories.items : []; 
        const total = categories.total ?? 0;
        return (
            <Fragment>
                <Breadcrumb title="Danh mục" parent="Sản phẩm" />

                {/* <!-- Container-fluid starts--> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>DANH MỤC SẢN PHẨM</h5>
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
                                                            value={this.state.name}
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
                                                    <button type="button" className="btn btn-primary" onClick={() => this.onCloseModal('VaryingMdo')}>Hủy</button>
                                                </div>
                                            </form>
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
                                                : <Datatable
                                                    myData={items}
                                                    total={total}
                                                    class="-striped -highlight"
                                                />
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

export default connect(Categories, state => (
    {
        categories: state.category
    }
), actions);