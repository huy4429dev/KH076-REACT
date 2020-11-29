import React, { Component, Fragment } from 'react';
import Breadcrumb from './../../../components/backEnd/breadCrumb';
import data from './../../../assets/data/category';
import Datatable from './../../../components/backEnd/user/list';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import connect from './../../../lib/connect';
import SimpleReactValidator from 'simple-react-validator';
import * as actions from './../../../actions/backEnd/category';
import Loading from './../../../components/backEnd/loading';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
class Categorys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: true,
            name: null,
            description: null,
        };

        this.validator = new SimpleReactValidator();
    }

    componentDidMount = () => {

        this.setState({
            loading: true
        })
        const { getCategories } = this.props.actions;

        getCategories()
            .then(() => {
                this.setState({ loading: false });
                console.log("GET SUCCESS");
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
        const tagName = target.name;
        const { name, description } = this.state;

        this.setState({
             [tagName]: value 
        });

        
         
    }

    handleSubmit = (event) => {

        event.preventDefault();
        const { name, description } = this.state;
        console.log(name, "category");
        const {createCategory} = this.props.actions;
        // if(name === '' || name === null) return;
        createCategory({
            name: name,
            description: description    
        })
        .then((data) => {
            this.setState({ loading: false });
            toast.success(data.message);
        })
        .catch((err) => {
            this.setState({ loading: false });
            toast.error(err)
        });
        

        this.onCloseModal();

    }

    onOpenModal = () => {

        const { name } = this.state;
        this.setState({
            open: true,
        });
    };

    onCloseModal = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        const { open,category } = this.state;
        const { categories } = this.props;
        const items = categories.items ? categories.items : [];

        console.log(categories, "data");

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
                                                            value={this.state.name}
                                                            className="form-control"
                                                            onChange={this.handleInputOnchange}
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
                                                    <button type="submit" className="btn btn-primary" onClick={() =>this.handleSubmit}>Lưu</button>
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
                                                    onDelete={(id) => {console.log('ON DELETE', id);}}
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