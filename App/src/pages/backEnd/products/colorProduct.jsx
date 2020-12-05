import React, { Component, Fragment } from 'react';
import Breadcrumb from '../../../components/backEnd/breadCrumb';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import connect from '../../../lib/connect';
import SimpleReactValidator from 'simple-react-validator';
import * as actions from '../../../actions/backEnd/productColor';
import Loading from '../../../components/backEnd/loading';
import { SketchPicker } from 'react-color';
const customButton = { borderRadius: '50%', paddingTop: '6px', paddingBottom: '6px', paddingLeft: '10px', paddingRight: '10px', fontSize: '13px' };
class ColorProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: true,
            name: '',
            color: '#2980b9',
            showPickColor: false
        };
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    componentDidMount = () => {

        this.setState({
            loading: true
        })
        const { getColors } = this.props.actions;
        console.log(getColors);
        getColors()
            .then(() => {
                this.setState({ loading: false });
            })
            .catch((err) => {
                this.setState({ loading: false });
                window.notify('Tải xuống danh sách mẫu màu sản phẩm không thành công', 'danger');
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

            const { name,color } = this.state;
            const { createColor } = this.props.actions;
            if (name === '' || name === null) return;
            createColor({
                name: name,
                color: color
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

    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
    };

    handlePickColor = () => {
        const { showPickColor } = this.state;
        this.setState({ showPickColor: !showPickColor })
    }

    handlelRefresh = () => {
        
        this.setState({
            loading: true
        })
        const { getColors } = this.props.actions;
        console.log(getColors);
        getColors()
            .then(() => {
                this.setState({ loading: false });
            })
            .catch((err) => {
                this.setState({ loading: false });
                window.notify('Tải xuống danh sách mẫu màu sản phẩm không thành công', 'danger');
            });

    }

    render() {
        const { open, Color, showPickColor, color } = this.state;
        const { colors } = this.props;
        const items = colors.items ? colors.items : [];
        const total = colors.total ?? 0;
        return (
            <Fragment>
                <Breadcrumb title="MẪU MÀU" parent="Sản phẩm" />

                {/* <!-- Container-fluid starts--> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>MẪU MÀU</h5>
                                </div>
                                <div className="card-body">
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        {
                                            this.state.loading
                                                ?
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <Loading type='box' />
                                                </div>
                                                :
                                                <div className="row">
                                                    <div className="col-4">
                                                        <div class="card">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <h5 class="card-header" style={{ color: 'gray' }}>DANH SÁCH MẪU MÀU</h5>
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
                                                                        className="btn btn-primary mr-4"
                                                                        style={customButton}
                                                                        onClick={this.handlelRefresh}
                                                                    >
                                                                        <i className="fa fa-refresh" aria-hidden="true"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div class="card-body">

                                                                {
                                                                    items.length > 0 ?
                                                                        items.map(item => (
                                                                            <div key={item.id} className="template-color-item d-flex justify-content-between"
                                                                                style={{
                                                                                    border: '1px solid gray',
                                                                                    paddingLeft: '8px',
                                                                                    cursor: 'pointer',
                                                                                }}
                                                                            >
                                                                                <h5 class="card-title mb-0 py-1"
                                                                                    style={{ color: 'gray', fontSize: '14px' }}
                                                                                >
                                                                                    {item.name}
                                                                                </h5>
                                                                                <div className="color-item"
                                                                                    style={{
                                                                                        background: item.color,
                                                                                        width: '100px'
                                                                                    }}
                                                                                >
                                                                                </div>
                                                                            </div>
                                                                        ))

                                                                        :
                                                                        <div className="alert alert-warning text-center">
                                                                            Chưa có mẫu màu
                                                                     </div>

                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Container-fluid Ends--> */}
                <Modal open={open} onClose={this.onCloseModal} >
                    <div className="modal-header">
                        <h5 className="modal-title f-w-600" id="exampleModalLabel2">Thêm mẫu màu</h5>
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
                                <div
                                    onClick={this.handlePickColor}
                                    style={{ height: '35px', background: color, cursor: 'pointer' }}
                                >

                                </div>
                                {
                                    showPickColor && <SketchPicker
                                        color={this.state.color}
                                        onChangeComplete={this.handleChangeComplete}
                                    />

                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-secondary" onClick={() => this.handleSubmit}>Lưu</button>
                            <button type="button" className="btn btn-primary" onClick={() => this.onCloseModal('VaryingMdo')}>Hủy</button>
                        </div>
                    </form>
                </Modal>


            </Fragment>
        )
    }
}

export default connect(ColorProduct, state => (
    {
        colors: state.productColor
    }
), actions);