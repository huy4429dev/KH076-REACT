import React, { Component, Fragment } from 'react';
import Breadcrumb from './../../components/backEnd/breadCrumb';
import { Navigation, Box, MessageSquare, Users, Briefcase, CreditCard, ShoppingCart, Calendar } from 'react-feather';
import CountUp from 'react-countup';
import { Chart } from "react-google-charts";
import connect from '../../lib/connect';
import * as actions from '../../actions/backEnd/dashboard';
import CanvasJSReact from './../../assets/canvas/canvasjs.react';
import Loading from '../../components/backEnd/loading';
import moment from 'moment';

import { Pie, Doughnut, Bar, Line } from 'react-chartjs-2';
import {
    pieOptions,
    doughnutOption,
    lineOptions,
    buyOption,
    employeeData,
    employeeOptions
} from './../../constants/chartData.js'
// image impoer
import user2 from './../../assets/images/dashboard/user2.jpg';
import user1 from './../../assets/images/dashboard/user1.jpg';
import man from './../../assets/images/dashboard/man.png';
import user from './../../assets/images/dashboard/user.png';
import designer from './../../assets/images/dashboard/designer.jpg'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: {},
            loading: false
        }
    }


    componentDidMount() {

        this.setState({
            loading: true
        });

        const { getDataDashboard } = this.props.actions;
        getDataDashboard()
            .then((data) => {
                this.setState({ loading: false, data });
            })
            .catch((err) => {
                this.setState({ loading: false });
                window.notify('Lỗi: ', err.message)
            });

    }


    render() {

        const { data } = this.state.data;
        const { loading } = this.state;

        console.log('LOADING', loading);

        const date = new Date();
        const curentMonth = date.getMonth();

        let labelLineData = [];
        let dataLineData = [];

        if (data?.totalAmount != null) {
            labelLineData = data.totalAmount.map(item => item.day + '/' + curentMonth);
            dataLineData = data.totalAmount.map(item => item.total);
        }


        const lineData = {
            labels: labelLineData,
            datasets: [
                {
                    lagend: 'none',
                    data: dataLineData,
                    borderColor: "#ff8084",
                    backgroundColor: "#ff8084",
                    borderWidth: 2
                },
                // {
                //     lagend: 'none',
                //     data: [3.8, 1.8, 4.3, 2.3, 3.6, 2.8, 2.8, 2.8],
                //     borderColor: "#a5a5a5",
                //     backgroundColor: "#a5a5a5",
                //     borderWidth: 2
                // }
            ]
        };

        return (

            <Fragment>
                <Breadcrumb title="Dashboard" parent="Dashboard" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-md-6 xl-50">
                            <div className="card o-hidden widget-cards">
                                <div className="bg-warning card-body">
                                    <div className="media static-top-widget row">
                                        <div className="icons-widgets col-4" style={{ height: '80px' }}>
                                            <div className="align-self-center text-center"><Navigation className="font-warning" /></div>
                                        </div>
                                        <div className="media-body col-8"><span className="m-0">Doanh thu</span>
                                            <h3 className="mb-0">$ <CountUp className="counter" end={data?.totalDiscount == null ? 0 : data?.totalDiscount} /><small> / Tháng {curentMonth}</small></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 xl-50">
                            <div className="card o-hidden  widget-cards">
                                <div className="bg-secondary card-body">
                                    <div className="media static-top-widget row">
                                        <div className="icons-widgets col-4" style={{ height: '80px' }}>
                                            <div className="align-self-center text-center"><Box className="font-secondary" /></div>
                                        </div>
                                        <div className="media-body col-8"><span className="m-0">Đơn hàng mới</span>
                                            <h3 className="mb-0"><CountUp className="counter" end={data?.countNewOrder == null ? 0 : data?.countNewOrder} /><small> / Tháng {curentMonth}</small></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 xl-50">
                            <div className="card o-hidden widget-cards">
                                <div className="bg-primary card-body">
                                    <div className="media static-top-widget row">
                                        <div className="icons-widgets col-4" style={{ height: '80px' }}>
                                            <div className="align-self-center text-center"><MessageSquare className="font-primary" /></div>
                                        </div>
                                        <div className="media-body col-8"><span className="m-0">Phản hồi</span>
                                            <h3 className="mb-0"><CountUp className="counter" end={data?.countContact == null ? 0 : data?.countContact} /><small> / Tháng {curentMonth}</small></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 xl-50">
                            <div className="card o-hidden widget-cards">
                                <div className="bg-danger card-body">
                                    <div className="media static-top-widget row">
                                        <div className="icons-widgets col-4" style={{ height: '80px' }}>
                                            <div className="align-self-center text-center"><Users className="font-danger" /></div>
                                        </div>
                                        <div className="media-body col-8"><span className="m-0">Khách hàng mới</span>
                                            <h3 className="mb-0"><CountUp className="counter" end={data?.countNewCustomer == null ? 0 : data?.countNewCustomer} /><small> / Tháng {curentMonth}</small></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 xl-100">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Biểu đồ doanh thu theo ngày</h5>
                                </div>
                                <div className="card-body">
                                    {
                                        loading ?
                                            <div className='d-flex justify-content-center align-items-center'>
                                                <Loading type='box' />
                                            </div>
                                            :
                                            <div className="market-chart">
                                                <Bar data={lineData} options={lineOptions} width={778} height={308} />
                                            </div>
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 xl-100">
                            <div className="card height-equal">
                                <div className="card-header">
                                    <h5>Sản phẩm bán chạy</h5>
                                </div>
                                <div className="card-body">
                                    <div className="user-status table-responsive products-table">
                                        <table className="table table-bordernone mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Sản phẩm</th>
                                                    <th scope="col">Số lượng</th>
                                                    <th scope="col">Lượt bán</th>
                                                    <th scope="col">Đơn giá</th>
                                                </tr>
                                            </thead>
                                            {
                                                data?.productHots?.length > 0 && !loading &&
                                                <tbody>
                                                    {
                                                        data.productHots.map((item, index) => {
                                                            return (
                                                                <tr key={item.id}>
                                                                    <td>{item.name}</td>
                                                                    <td className="digits">{item.quantity}</td>
                                                                    <td className="font-primary">{item.count_purchases}</td>
                                                                    <td className="digits">{item.price}</td>
                                                                </tr>
                                                            )

                                                        })

                                                    }
                                                </tbody>

                                            }

                                        </table>
                                        {
                                            data?.productHots?.length === 0 && !loading &&
                                            <p className='alert alert-warning w-100'>Chưa có sản phẩm nào</p>


                                        }
                                        {
                                            loading &&
                                            <div className='d-flex justify-content-center align-items-center'>
                                                <Loading type='box' />
                                            </div>
                                        }


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Tin mới</h5>
                                </div>
                                <div className="card-body">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>

        )
    }
}


export default connect(Dashboard, state => (
    {

    }
), actions);