import React, { Component, Fragment } from 'react';
import Breadcrumb from '../../../components/backEnd/breadCrumb';
import 'react-responsive-modal/styles.css';
import connect from '../../../lib/connect';
import SimpleReactValidator from 'simple-react-validator';
import * as actions from '../../../actions/backEnd/revenue';
import Loading from '../../../components/backEnd/loading';
import { Calendar } from 'react-feather';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './report.css';
import moment from 'moment';
const date = new Date();
const customButton = { brevenueRadius: 0, paddingTop: '6px', paddingBottom: '6px', paddingLeft: '10px', paddingRight: '10px' };

class Revenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: true,
            showCalendar: false,
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
            },
            startDate: date
        };


        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            messages: {
                required: 'Dữ liệu không hợp lệ',
                email: 'Email không hợp lệ'
            }
        });
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


    setStartDate = (date) => {

        let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        firstDayOfMonth = moment(firstDayOfMonth).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
        let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        lastDayOfMonth = moment(lastDayOfMonth).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
        const filter = `fromDate=${firstDayOfMonth}&toDate=${lastDayOfMonth}`;
        this.setState({
            loading: true,
            startDate: date
        });

        const { getRevenue } = this.props.actions;

        let { chartOptions } = this.state;

        getRevenue(filter)
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
                window.notify('Tải xuống báo cáo không thành công: ' + err.message, 'danger');
            });

    }

    render() {
        const { chartOptions, dataStatictis, startDate } = this.state;

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
                                    <div className='d-flex align-items-center'>
                                        <DatePicker
                                            onChange={date => this.setStartDate(date)}
                                            dateFormat="MM/yyyy"
                                            showMonthYearPicker
                                            selected={startDate}
                                        />
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
                                                        Biểu đồ thống kê doanh thu tháng {startDate.getMonth() + 1} - 2020
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

                                                                    <tr className={startDate.getDay() == item.day ? 'tr-active' : ''}>
                                                                        <td>{item.day}/{startDate.getMonth() + 1}</td>
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