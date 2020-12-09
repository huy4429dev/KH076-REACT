import React, { Component, Fragment } from 'react';
import Breadcrumb from '../../../components/backEnd/breadCrumb';
import 'react-responsive-modal/styles.css';
import connect from '../../../lib/connect';
import SimpleReactValidator from 'simple-react-validator';
import * as actions from '../../../actions/backEnd/revenue';
import Loading from '../../../components/backEnd/loading';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import './report.css';


const customButton = { brevenueRadius: 0, paddingTop: '6px', paddingBottom: '6px', paddingLeft: '10px', paddingRight: '10px' };

class Revenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: true,
            name: '',
            description: '',
            dataStatictis: [],

            chartOptions: {

                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['1/11', '1/12', '1/13'],
                },
                yAxis: {
                    lineWidth: 1,
                    tickWidth: 1,
                    title: {
                        align: 'high',
                        text: '( vnđ )'
                    }
                },
                series: [
                    { data: [1, 2, 3] }
                ],
                plotOptions: {
                    series: {
                        point: {
                            events: {
                                // mouseOver: this.setHoverData.bind(this)
                            }
                        }
                    }
                }
            }
        };


        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    componentDidMount = () => {

        this.setState({
            loading: true
        })
        const { getRevenue } = this.props.actions;

        let { chartOptions } = this.state;

        getRevenue()
            .then((data) => {

                const listDays = data.map(item => item.day);
                const listAmounts = data.map(item => item.totalAmount);
                chartOptions.xAxis.categories = listDays;
                chartOptions.series[0].data = listAmounts;
                this.setState({
                    loading: false,
                    dataStatictis: data,
                    chartOptions: chartOptions
                });
            })
            .catch((err) => {
                this.setState({ loading: false });
                window.notify('Tải xuống đơn hàng không thành công: ' + err.message, 'danger');
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
            const { createrevenue } = this.props.actions;
            if (name === '' || name === null) return;
            createrevenue({
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
        const { getRevenue } = this.props.actions;

        let { chartOptions } = this.state;

        getRevenue()
            .then((data) => {

                const listDays = data.map(item => item.day);
                const listAmounts = data.map(item => item.totalAmount);
                chartOptions.xAxis.categories = listDays;
                chartOptions.series[0].data = listAmounts;
                this.setState({
                    loading: false,
                    dataStatictis: data,
                    chartOptions: chartOptions
                });
            })
            .catch((err) => {
                this.setState({ loading: false });
                window.notify('Tải xuống đơn hàng không thành công: ' + err.message, 'danger');
            });

    }

    updateSeries = () => {
        // The chart is updated only with new options.
        this.setState({
            chartOptions: {
                series: [
                    { data: [Math.random() * 5, 2, 1] }
                ]
            }
        });
    }


    render() {
        const { open, chartOptions, dataStatictis } = this.state;
        console.log(dataStatictis, 'REVENUE');
        const date = new Date();

        const curentMonth = date.getMonth() + 1;
        return (
            <Fragment>
                <Breadcrumb title="DOANH THU" parent="BÁO CÁO" />

                {/* <!-- Container-fluid starts--> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>BÁO CÁO DOANH THU</h5>
                                    <div>
                                        <div className="report__filter">
                                            <div className="form-group">
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-primary mr-1"
                                            style={customButton}
                                            onClick={this.handlelRefresh}
                                        >
                                            <i className="fa fa-refresh" aria-hidden="true"></i>
                                        </button>
                                    </div>
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
                                                <div>
                                                    <h4 className="text-center">
                                                        Biểu đồ thống kê doanh thu tháng {curentMonth} - 2020
                                                    </h4>
                                                    <HighchartsReact
                                                        highcharts={Highcharts}
                                                        options={chartOptions}
                                                    />

                                                    <table className='table mt-3 report'>
                                                        <thead>
                                                            <tr>
                                                                <th>Thời gian</th>
                                                                <th>Số lượng đơn</th>
                                                                <th>Số lượng đơn chốt</th>
                                                                <th>Số lượng sản phẩm</th>
                                                                <th>Số lượng khách hàng</th>
                                                                <th>Doanh thu</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                dataStatictis.length > 0 &&
                                                                dataStatictis.map(item => (
                                                                    <tr>
                                                                        <td>{item.day}/{curentMonth}</td>
                                                                        <td>{item.totalOrder}</td>
                                                                        <td>{item.totalOrderSuccess}</td>
                                                                        <td>{item.totalProduct}</td>
                                                                        <td>{0}</td>
                                                                        <td>{item.totalAmount}</td>
                                                                    </tr>

                                                                ))


                                                            }
                                                        </tbody>
                                                    </table>
                                                    {
                                                        dataStatictis.length == 0 &&
                                                        <div className="alert alert-warning text-center w-100">
                                                            Chưa có số liệu thống kê
                                                                  </div>
                                                    }

                                                </div>

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

export default connect(Revenue, state => (
    {
    }
), actions);