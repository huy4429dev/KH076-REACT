import React, { Component, Fragment } from 'react';
// import ReactTable from 'react-table';
// import 'react-table/react-table.css';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedValues: [],
            myData: props.myData,
            open: false
        }
    }
    componentDidMount() {

    }

    UNSAFE_componentWillMount(nextProps) {
        // if(nextProps.myData && nextProps.myData != this.props.myData){
        //     this.setState({
        //         myData:  nextProps.myData
        //     })
        // }
    }
    selectRow = (e, i) => {
        if (!e.target.checked) {
            this.setState({
                checkedValues: this.state.checkedValues.filter((item, j) => i !== item)
            });
        } else {
            this.state.checkedValues.push(i);
            this.setState({
                checkedValues: this.state.checkedValues
            })
        }
    }

    handleRemoveRow = () => {
        const selectedValues = this.state.checkedValues;
        const updatedData = this.state.myData.filter(function (el) {
            return selectedValues.indexOf(el.id) < 0;
        });
        this.setState({
            myData: updatedData
        })
        toast.success("Successfully Deleted !")
    };

    renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.myData];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ myData: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.myData[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
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

        const { pageSize, myClass, multiSelectOption, pagination } = this.props;
        const { myData, open } = this.state;

        const columns = [];
        for (var key in myData[0]) {

            let editable = this.renderEditable
            if (key === "id") {
                editable = null;
            }
            if (key === "name") {
                editable = null;
            }
            if (key === "description") {
                editable = null;
            }
            if (key === "created_at") {
                editable = null;
            }
            if (key === "updated_at") {
                editable = null;
            }

            columns.push(
                {
                    Header: <b>{this.Capitalize(key.toString())}</b>,
                    accessor: key,
                    Cell: editable,
                    style: {
                        textAlign: 'center'
                    }
                });
        }

        if (multiSelectOption == true) {

            columns.push(
                {
                    Header: <button className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
                        onClick={
                            (e) => {
                                if (window.confirm('Are you sure you wish to delete this item?'))
                                    this.handleRemoveRow()
                            }}>Delete</button>,
                    id: 'delete',
                    accessor: str => "delete",
                    sortable: false,
                    style: {
                        textAlign: 'center'
                    },
                    Cell: (row) => (
                        <div>
                            <span >
                                <input type="checkbox" name={row.original.id} defaultChecked={this.state.checkedValues.includes(row.original.id)}
                                    onChange={e => this.selectRow(e, row.original.id)} />
                            </span>
                        </div>
                    ),
                    accessor: key,
                    style: {
                        textAlign: 'center'
                    }
                }
            )

        } else {
            columns.push(
                {
                    Header: <b>Action</b>,
                    id: 'delete',
                    accessor: str => "delete",
                    Cell: (row) => (
                        <div>
                            <span style={{ cursor: 'pointer' }} onClick={() => {


                                if (window.confirm('Bạn có muốn xóa danh mục này không ?')) {
                                    this.props.onDelete(row.index);
                                    let data = myData;
                                    data.splice(row.index, 1);
                                    this.setState({ myData: data });
                                }

                                toast.success("Successfully Deleted !")

                            }}>
                                <i className="fa fa-trash" style={{ width: 35, fontSize: 20, padding: 11, color: '#e4566e' }}
                                ></i>
                            </span>

                            <span><i className="fa fa-pencil" style={{ width: 35, fontSize: 20, padding: 11, color: 'rgb(40, 167, 69)' }}></i></span>
                        </div>
                    ),
                    style: {
                        textAlign: 'center'
                    },
                    sortable: false
                }
            )
        }

        return (
            <Fragment>
                <ReactTable
                    data={myData}
                    columns={columns}
                    defaultPageSize={pageSize}
                    className={myClass}
                    showPagination={pagination}
                />
                {/* <ToastContainer /> */}

                <div>
                    <button onClick={this.onOpenModal}>Open modal</button>
                    <Modal open={open} onClose={this.onCloseModal} >
                        <div className="modal-header">
                            <h5 className="modal-title f-w-600" id="exampleModalLabel2">Bạn có muốn xóa danh mục này không ?</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" onClick={() => this.handleSubmit}>Đồng ý</button>
                            <button type="button" className="btn btn-secondary" onClick={() => this.onCloseModal('VaryingMdo')}>Hủy</button>
                        </div>
                    </Modal>
                </div>
            </Fragment>


        )
    }
}

export default List
