import React, { Component, Fragment } from 'react';
import Breadcrumb from '../../../components/backEnd/breadCrumb';
import Datatable from '../../../components/backEnd/products/listCategory';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import connect from '../../../lib/connect';
import SimpleReactValidator from 'simple-react-validator';
import * as actions from '../../../actions/backEnd/category';
import Loading from '../../../components/backEnd/loading';

class CategoryDetailt extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            loading: false,
            category: null,
            name: '',
            description: '',
            parentId: 0
        };

        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            messages: {
                required: 'Dữ liệu không hợp lệ',
                email: 'Email không hợp lệ'
            }
        });
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const { getCategory } = this.props.actions;

        this.setState({
            loading: true,
            parentId: id
        });

        getCategory(id)
            .then(data => {
                this.setState({ loading: false, category: data.data });
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

    handleSubmit = (event) => {

        event.preventDefault();


        if (this.validator.allValid()) {

            this.setState({
                loading: true
            });

            const { name, description, category, parentId } = this.state;
            const { createCategoryChildren } = this.props.actions;
            if (name === '' || name === null) return;
            createCategoryChildren({
                name: name,
                description: description
            }, parentId)
                .then((data) => {
                    if (data.success) {
                        return data;
                    } else {
                        throw new Error('Something went wrong');
                    }
                })
                .then((data) => {
                    let item = data.data;
                    this.setState({
                        loading: false,
                        category: { ...category, children: [{ ...item, ...category.children }] }
                    });

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

    handleInputOnchange = (event) => {

        const target = event.target;
        const value = target.value;
        const tagName = target.name;
        this.setState({
            [tagName]: value
        });

    }

    render() {
        const { open, category } = this.state;
        const items = category?.children;
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
                                {

                                    this.state.loading
                                        ?
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <Loading type='box' />
                                        </div>
                                        :
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
                                            <div className="card bg-light mb-4" style={{ maxWidth: '18rem' }}>
                                                <div className="card-header" style={{ color: 'black' }}>Danh mục gốc</div>
                                                <div className="card-body">
                                                    <h5 className="card-title">{category?.name}</h5>
                                                    <p className="card-text">{category?.description}</p>
                                                </div>
                                            </div>
                                            <div id="basicScenario" className="product-physical">


                                                <Datatable
                                                    myData={items}
                                                    class="-striped -highlight"
                                                />


                                            </div>
                                        </div>
                                }
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

