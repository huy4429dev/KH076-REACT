import React, { Component, Fragment } from 'react'
import LoginTabset from './../../components/backEnd/login';
import { ArrowLeft, Sliders } from 'react-feather';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import stats from './../../assets/images/dashboard/stats.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/login';


export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("access_token") ? localStorage.getItem("access_token") : null
        }

    }
    componentDidMount() {
        const { login, user, token } = this.props.login;
        if (login && user && token && this.state.token) {
            this.props.history.push("/admin/dashboard");
        }
    }
    redirect = () => {
        this.props.history.push("/admin/dashboard");
    }
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            arrows: false
        };
        return (
            <Fragment>
                <div className="page-wrapper">
                    <div className="authentication-box">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5 p-0 card-left">
                                    <div className="card bg-primary">
                                        <div className="svg-icon">
                                            <img src={stats} className="Img-fluid" />
                                        </div>
                                        <Slider className="single-item" {...settings}>
                                            <div>
                                                <div>
                                                    <h3>Chào mừng đến với MultiKart</h3>
                                                    <p>Bạn sẽ có những trải nghiệm tuyệt vời tại đây!</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <h3>Chào mừng đến với MultiKart</h3>
                                                    <p>Bạn sẽ có những trải nghiệm tuyệt vời tại đây!</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <h3>Chào mừng đến với MultiKart</h3>
                                                    <p>Bạn sẽ có những trải nghiệm tuyệt vời tại đây!</p>
                                                </div>
                                            </div>
                                        </Slider >
                                    </div>
                                </div>
                                <div className="col-md-7 p-0 card-right">
                                    <div className="card tab2-card">
                                        <div className="card-body">
                                            <LoginTabset
                                                redirect={() => this.redirect()}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="/" target="_blank" className="btn btn-primary back-btn"><ArrowLeft />Trở lại</a>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect(Login, state => (
    {
        login: state.login
    }
), actions);
