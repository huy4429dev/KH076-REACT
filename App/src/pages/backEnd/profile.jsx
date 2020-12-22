import React, { Component, Fragment } from 'react'

// import designer from '../../assets/images/dashboard/designer.jpg';
import designer from './../../assets/images/dashboard/designer.jpg';
import Tabset_profile from './../../components/backEnd/profile/tabset';
import Breadcrumb from './../../components/backEnd/breadCrumb';
import { validateComponent } from 'simple-react-validator';
import connect from '../../lib/connect';
import * as actions from './../../actions/frontEnd/login';
import { useStore } from 'react-redux';
import Loading from './../../components/loadding2';
import * as EP from './../../constants/endpoint';

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            avatar: null
        }
        this.refUpload = React.createRef();
    }
    componentDidMount() {
        const { login, user } = this.props.login;
        this.setState({ loading: true })
        this.props.actions.account(user.id)
            .then(data => {
                this.setState({ loading: false })
            }).catch(() => this.setState({ loading: false }));
    }
    avatar = () => {
        this.refUpload.current.click();
    }
    onFileChange = (e) => {
        const { user } = this.props.login;
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append(
            "file",
            file,
        );
        fetch(`${EP.endpoint}/api/uploads/public/avatar`, {
            method: 'POST',
            body: formData
        }).then(
            response => response.json()
        ).then(data => {
            this.props.actions.updateAvatar({ url: data.data.url }, user.id);
        }).catch(
            error => console.log(error)
        );
    }
    render() {
        const { login, user } = this.props.login;
        return (
            <Fragment>
                <Breadcrumb title="Profile" parent="Settings" />
                <Loading show={this.state.loading} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card">
                                {
                                    user && (
                                        <div className="card-body">
                                            <div className="profile-details text-center">
                                                {
                                                    user.profile ?
                                                        <div className="d-flex justify-content-center">
                                                            <img style={{ width: 50, height: 50 }} onClick={this.avatar} src={`${EP.endpoint}${user.profile.avatar}`}
                                                                alt="" className="img-fluid m-0 rounded-circle blur-up lazyloaded" />
                                                        </div>

                                                        :
                                                        <div className="d-flex justify-content-center text-uppercase">
                                                            <div onClick={this.avatar}
                                                                className="rounded-circle bg-light text-dark text-center d-flex justify-content-center align-items-center"
                                                                style={{ width: 50, height: 50 }}>
                                                                {user.username.charAt(0)}
                                                            </div>
                                                        </div>
                                                }
                                                <input type="file" ref={this.refUpload} 
                                                onChange={(e) => this.onFileChange(e)} style={{ visibility: "hidden" }} />
                                                <h5 className="f-w-600 f-16 mb-0">{user.username}</h5>
                                                <span>{user.email}</span>
                                                <div className="social">
                                                    <div className="form-group btn-showcase">
                                                        <button className="btn social-btn btn-fb d-inline-block"> <i className="fa fa-facebook"></i></button>
                                                        <button className="btn social-btn btn-twitter d-inline-block"><i className="fa fa-google"></i></button>
                                                        <button className="btn social-btn btn-google d-inline-block mr-0"><i className="fa fa-twitter"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="project-status">
                                                <h5 className="f-w-600 f-16">Người dùng</h5>
                                                <div className="media">
                                                    <div className="media-body">
                                                        <h6>Hiệu suất <span className="pull-right">80%</span></h6>
                                                        <div className="progress sm-progress-bar">
                                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '90%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="media">
                                                    <div className="media-body">
                                                        <h6>Tăng ca <span className="pull-right">60%</span></h6>
                                                        <div className="progress sm-progress-bar">
                                                            <div className="progress-bar bg-secondary" role="progressbar" style={{ width: '60%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="media">
                                                    <div className="media-body">
                                                        <h6>Gì đó <span className="pull-right">50%</span></h6>
                                                        <div className="progress sm-progress-bar">
                                                            <div className="progress-bar bg-danger" role="progressbar" style={{ width: '50%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="card profile-card">
                                <div className="card-body">
                                    <Tabset_profile user={user} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect(Profile, state => ({
    login: state.login
}), actions)
