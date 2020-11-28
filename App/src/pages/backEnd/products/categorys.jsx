import React, { Component, Fragment } from 'react';
import Breadcrumb from './../../../components/backEnd/breadCrumb';
import data from './../../../assets/data/category';
import Datatable from './../../../components/backEnd/user/list';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import connect from './../../../lib/connect';
import * as actions from './../../../actions/backEnd/category';
import Loading from './../../../components/backEnd/loading';
import $ from 'jquery';
class Categorys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: true,
            category: null
        };
    }

    componentDidMount = () => {

        this.setState({
            loading: true
        })
        const { getCategories } = this.props.actions;

        getCategories()
            .then(() => {
                this.setState({ loading: false });
            })
            .catch((err) => {
                this.setState({ loading: false });
                $.notify({ message: 'Tải xuống danh mục sản phẩm không thành công' }, { type: 'danger' });
                $.notify('Tải xuống danh mục sản phẩm không thành công', 'danger');
            });
    }

    handleInputOnchange = (event) => {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { category } = this.state;

        this.setState({
            category: { ...category, ...{ [name]: value } }
        });
         
    }

    handleSubmit = (event) => {

        event.preventDefault();
        
        const { category } = this.state;
        console.log('SUBMIT CATEOGRY', this.state);
    }

    onOpenModal = () => {
        const { category } = this.state;
        this.setState({
            open: true,
        });
    };

    onCloseModal = () => {
        const { category } = this.state;
        this.setState({
            open: false,
        });
    };

    render() {

        const { open,category } = this.state;
        console.log(category, "WHAT");
        const { categories } = this.props;
        const items = categories.data ? categories.data.items : [];

        return (
            <Fragment>
                <Breadcrumb title="Category" parent="Digital" />
                {/* <!-- Container-fluid starts--> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Digital Category</h5>
                                </div>
                                <div className="card-body">
                                    <div className="btn-popup pull-right">
                                        <button type="button" className="btn btn-secondary" onClick={this.onOpenModal} data-toggle="modal" data-original-title="test" data-target="#exampleModal">Thêm mới</button>
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
                                                            className="form-control"
                                                            onChange={this.handleInputOnchange}

                                                        />
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
                                                    <button type="submit" className="btn btn-primary" onClick={() => this.onCloseModal('VaryingMdo')}>Lưu</button>
                                                    <button type="button" className="btn btn-secondary" onClick={() => this.onCloseModal('VaryingMdo')}>Hủy</button>
                                                </div>
                                            </form>
                                        </Modal>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        {
                                            this.state.loading
                                                ? <Loading show={this.state.loading} type="card" />
                                                : <Datatable
                                                    multiSelectOption={false}
                                                    myData={items}
                                                    pageSize={5}
                                                    pagination={false}
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

export default connect(Categorys, state => (
    {
        categories: state.category
    }
), actions);