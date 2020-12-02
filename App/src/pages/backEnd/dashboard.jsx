import React, { Component, Fragment } from 'react';
import Breadcrumb from './../../components/backEnd/breadCrumb';
import { Navigation, Box, MessageSquare, Users, Briefcase, CreditCard, ShoppingCart, Calendar } from 'react-feather';
import CountUp from 'react-countup';
import { Chart } from "react-google-charts";
// import CanvasJSReact from '../assets/canvas/canvasjs.react';
import CanvasJSReact from './../../assets/canvas/canvasjs.react';

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


export class Dashboard extends Component {

    render() {

        const lineData = {
            labels: ['100', '200', '300', '400', '500', '600', '700', '800'],
            datasets: [
                {
                    lagend: 'none',
                    data: [2.5, 3, 3, 0.9, 1.3, 1.8, 3.8, 1.5],
                    borderColor: "#ff8084",
                    backgroundColor: "#ff8084",
                    borderWidth: 2
                },
                {
                    lagend: 'none',
                    data: [3.8, 1.8, 4.3, 2.3, 3.6, 2.8, 2.8, 2.8],
                    borderColor: "#a5a5a5",
                    backgroundColor: "#a5a5a5",
                    borderWidth: 2
                }
            ]
        };

        const buyData = {
            labels: ["", "10", "20", "30", "40", "50"],
            datasets: [{
                backgroundColor: "transparent",
                borderColor: "#13c9ca",
                data: [20, 5, 80, 10, 100, 15],
            },
            {
                backgroundColor: "transparent",
                borderColor: "#a5a5a5",
                data: [0, 50, 20, 70, 30, 27],
            },
            {
                backgroundColor: "transparent",
                borderColor: "#ff8084",
                data: [0, 30, 40, 10, 86, 40],
            }]
        }

        const doughnutOptions = {
            title: "",
            pieHole: 0.35,
            pieSliceBorderColor: "none",
            colors: ['#ff8084', '#13c9ca', '#a5a5a5'],
            legend: {
                position: "none"
            },
            pieSliceText: "none",
            tooltip: {
                trigger: "none"
            },
            animation: {
                startup: true,
                easing: 'linear',
                duration: 1500,
            },
            chartArea: { left: 0, top: 10, width: '360px', height: '100%' },
            enableInteractivity: false,
        }
        const pieOptions = {
            title: "",
            pieHole: 1,
            slices: [
                {
                    color: "#ff8084"
                },
                {
                    color: "#13c9ca"
                },
                {
                    color: "#f0b54d"
                },
            ],
            tooltip: {
                showColorCode: false
            },
            chartArea: { left: 0, top: 10, width: '360px', height: '100%' },
            legend: "none"
        };
        const LineOptions = {
            hAxis: {
                textPosition: 'none', baselineColor: 'transparent',
                gridlineColor: 'transparent',
            },
            vAxis: {
                textPosition: 'none', baselineColor: 'transparent',
                gridlineColor: 'transparent',
            },
            colors: ['#ff8084'],
            legend: 'none',
        }
        const LineOptions1 = {
            hAxis: {
                textPosition: 'none', baselineColor: 'transparent',
                gridlineColor: 'transparent',
            },
            vAxis: {
                textPosition: 'none', baselineColor: 'transparent',
                gridlineColor: 'transparent',
            },
            colors: ['#13c9ca'],
            chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
            legend: 'none',
        }
        const LineOptions2 = {
            hAxis: {
                textPosition: 'none', baselineColor: 'transparent',
                gridlineColor: 'transparent',
            },
            vAxis: {
                textPosition: 'none', baselineColor: 'transparent',
                gridlineColor: 'transparent',
            },
            colors: ['#f5ce8a'],
            chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
            legend: 'none',
        }
        const LineOptions3 = {
            hAxis: {
                textPosition: 'none', baselineColor: 'transparent',
                gridlineColor: 'transparent',
            },
            vAxis: {
                textPosition: 'none', baselineColor: 'transparent',
                gridlineColor: 'transparent',
            },
            colors: ['#a5a5a5'],
            chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
            legend: 'none',
        }
        return (

            <Fragment>
                <Breadcrumb title="Dashboard" parent="Dashboard" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-md-6 xl-50">
                            <div className="card o-hidden widget-cards">
                                <div className="bg-warning card-body">
                                    <div className="media static-top-widget row">
                                        <div className="icons-widgets col-4" style={{height:'80px'}}>
                                            <div className="align-self-center text-center"><Navigation className="font-warning" /></div>
                                        </div>
                                        <div className="media-body col-8"><span className="m-0">Doanh thu</span>
                                            <h3 className="mb-0">$ <CountUp className="counter" end={6659} /><small> / Tháng 1</small></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 xl-50">
                            <div className="card o-hidden  widget-cards">
                                <div className="bg-secondary card-body">
                                    <div className="media static-top-widget row">
                                        <div className="icons-widgets col-4" style={{height:'80px'}}>
                                            <div className="align-self-center text-center"><Box className="font-secondary" /></div>
                                        </div>
                                        <div className="media-body col-8"><span className="m-0">Sản phẩm bán</span>
                                            <h3 className="mb-0"><CountUp className="counter" end={9856} /><small> / Tháng 1</small></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 xl-50">
                            <div className="card o-hidden widget-cards">
                                <div className="bg-primary card-body">
                                    <div className="media static-top-widget row">
                                        <div className="icons-widgets col-4" style={{height:'80px'}}>
                                            <div className="align-self-center text-center"><MessageSquare className="font-primary" /></div>
                                        </div>
                                        <div className="media-body col-8"><span className="m-0">Phản hồi</span>
                                            <h3 className="mb-0"><CountUp className="counter" end={893} /><small> / Tháng 1</small></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 xl-50">
                            <div className="card o-hidden widget-cards">
                                <div className="bg-danger card-body">
                                    <div className="media static-top-widget row">
                                        <div className="icons-widgets col-4" style={{height:'80px'}}>
                                            <div className="align-self-center text-center"><Users className="font-danger" /></div>
                                        </div>
                                        <div className="media-body col-8"><span className="m-0">Khách hàng mới</span>
                                            <h3 className="mb-0"><CountUp className="counter" end={4563} /><small> / Tháng 1</small></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 xl-100">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Doanh thu trong tuần</h5>
                                </div>
                                <div className="card-body">
                                    <div className="market-chart">
                                        <Bar data={lineData} options={lineOptions} width={778} height={308} />
                                    </div>
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
                                            <tbody>
                                                <tr>
                                                    <td>Simply dummy text of the printing</td>
                                                    <td className="digits">1</td>
                                                    <td className="font-primary">Pending</td>
                                                    <td className="digits">$6523</td>
                                                </tr>
                                                <tr>
                                                    <td>Long established</td>
                                                    <td className="digits">5</td>
                                                    <td className="font-secondary">Cancle</td>
                                                    <td className="digits">$6523</td>
                                                </tr>
                                                <tr>
                                                    <td>sometimes by accident</td>
                                                    <td className="digits">10</td>
                                                    <td className="font-secondary">Cancle</td>
                                                    <td className="digits">$6523</td>
                                                </tr>
                                                <tr>
                                                    <td>classical Latin literature</td>
                                                    <td className="digits">9</td>
                                                    <td className="font-primary">Return</td>
                                                    <td className="digits">$6523</td>
                                                </tr>
                                                <tr>
                                                    <td>keep the site on the Internet</td>
                                                    <td className="digits">8</td>
                                                    <td className="font-primary">Pending</td>
                                                    <td className="digits">$6523</td>
                                                </tr>
                                                <tr>
                                                    <td>Molestiae consequatur</td>
                                                    <td className="digits">3</td>
                                                    <td className="font-secondary">Cancle</td>
                                                    <td className="digits">$6523</td>
                                                </tr>
                                            </tbody>
                                        </table>
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
// javascript:void(0)

export default Dashboard
