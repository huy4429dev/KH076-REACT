import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import { Link } from 'react-router-dom';
import connect from './../../../lib/connect';
import * as actions from './../../../actions/frontEnd/product';
import Loading from './../../loadding2';
import SimpleReactValidator from 'simple-react-validator';
import moment from 'moment';
const styles = {
    boxImg: {
        width: "50px",
        height: "50px",
        overflow: "hidden"
    },
    image: {
        objectFit: "cover",
        width: "100%",
        height: "100%"
    },
    avatarName: {
        width: "100%",
        height: "100%",
        fontSize: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#333",
        textTransform: "uppercase"
    }
}
class DetailsTopTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            title: "",
            content: "",
            loading: false
        }
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            messages: {
                required: 'Dữ liệu không hợp lệ',
                email: 'Email không hợp lệ'
            }
        });
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        const { user, login, token } = this.props.login;
        const tokenL = localStorage.getItem("access_token");
        const { id } = this.props;
        if (user && login && token && tokenL) {
            this.setState({
                username: user.username,
                email: user.email,
            })
        }
        this.props.actions.getComment(id);
    }
    sendComment = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { username, title, email, content } = this.state;
        if (this.validator.allValid()) {
            this.setState({
                loading: true
            })
            const data = {
                username: username,
                email: email,
                content: content,
                title: title,
                productId: this.props.item ? this.props.item.id : null,
                userId: this.props.login ? this.props.login.user.id : null
            }
            this.props.actions.comment(data)
                .then((data) => {
                    this.setState({ loading: false });
                    if (data.success) {
                        window.notify('Thêm thành công', 'success');
                    } else {
                        window.notify('Thêm không thành công', 'danger');
                    }
                }).catch((err) => {
                    this.setState({ loading: false });
                    window.notify('Thêm không thành công', 'danger');
                });
        } else {
            this.validator.showMessages();
            window.notify('Vui lòng điền đầy đủ các trường', 'danger');
        }
    }
    render() {
        const { user } = this.props.login;
        const { comment } = this.props.product;
        return (
            <section className="tab-product m-0">
                <Loading show={this.state.loading} type="full" />
                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <Tabs className="tab-content nav-material">
                            <TabList className="nav nav-tabs nav-material">
                                <Tab className="nav-item">
                                    <span className="nav-link active">
                                        Mô tả</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" >Chi tiết</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" >
                                        Video</span>
                                    <div className="material-border"></div>
                                </Tab>
                                <Tab className="nav-item">
                                    <span className="nav-link" >
                                        Bình luận</span>
                                    <div className="material-border"></div>
                                </Tab>
                            </TabList>
                            <TabPanel className="tab-pane fade mt-4 show active">
                                <table className="table table-striped mb-0">
                                    <tbody>
                                        <tr>
                                            <th>Sản phẩm dành cho :</th>
                                            <td>Women's</td>
                                        </tr>
                                        <tr>
                                            <th>Mẫu :</th>
                                            <td>Embroidered</td>
                                        </tr>
                                        <tr>
                                            <th>Chất liệu :</th>
                                            <td>Silk</td>
                                        </tr>
                                        <tr>
                                            <th>Kiểu :</th>
                                            <td>Ghagra, Choli, Dupatta Set</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </TabPanel>
                            <TabPanel>
                                <p className="mt-4 p-0">
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled it to make a
                                    type specimen book. It has survived not only five centuries,
                                    but also the leap into electronic typesetting, remaining
                                    essentially unchanged. It was popularised in the 1960s with
                                    the release of Letraset sheets containing Lorem Ipsum
                                    passages, and more recently with desktop publishing software
                                    like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                            </TabPanel>
                            <TabPanel>
                                <div className="mt-4 text-center">
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <iframe
                                            src="https://www.youtube.com/embed/BUWzX78Ye_8"
                                            allow="autoplay; encrypted-media"
                                            allowFullScreen>
                                        </iframe>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <form className="theme-form mt-4">
                                    <div className="form-row">
                                        {/* <div className="col-md-12 ">
                                            <div className="media m-0">
                                                <label>Đánh giá</label>
                                                <div className="media-body ml-3">
                                                    <div className="rating three-star">
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="col-md-6">
                                            <label htmlFor="name">Tên</label>
                                            <input type="text" className="form-control" id="name" placeholder="Tên"
                                                required
                                                name="username"
                                                value={this.state.username}
                                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                onBlur={() => this.validator.showMessageFor('username')}
                                            />
                                            {this.validator.message('username', this.state.username, 'required', { className: 'text-danger' })}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" id="email" placeholder="Email"
                                                required
                                                name="email"
                                                value={this.state.email}
                                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                onBlur={() => this.validator.showMessageFor('email')}
                                            />
                                            {this.validator.message('email', this.state.email, 'required|email', { className: 'text-danger' })}
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="review">Tiêu đề</label>
                                            <input type="text" className="form-control" id="review"
                                                placeholder="Chủ đề đánh giá" required
                                                name="title"
                                                value={this.state.title}
                                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                onBlur={() => this.validator.showMessageFor('title')}
                                            />
                                            {this.validator.message('title', this.state.title, 'required', { className: 'text-danger' })}
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="review">Nội dung</label>
                                            <textarea className="form-control" placeholder="Đánh giá"
                                                id="exampleFormControlTextarea1" rows="6"
                                                placeholder="Chủ đề đánh giá" required
                                                name="content"
                                                value={this.state.content}
                                                onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
                                                onBlur={() => this.validator.showMessageFor('content')}
                                            ></textarea>
                                            {this.validator.message('content', this.state.content, 'required', { className: 'text-danger' })}
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" onClick={(e) => this.sendComment(e)}>Gửi</button>
                                        </div>
                                    </div>
                                </form>
                                <div className="mt-2">
                                    Tất cả bình luận
                                </div>
                                <div className="card">
                                    <div className="bg-light">
                                        {
                                            (comment && comment.items.length > 0) ?
                                                (
                                                    comment.items.map((item, index) => {
                                                        return (
                                                            <div className="card p-4 mb-1" key={index}>
                                                                <div>
                                                                    <div className="d-flex justify-content-start align-items-center">
                                                                        <div className="rounded-circle" style={styles.boxImg}>
                                                                            {/* <img style={styles.image} src="https://react.pixelstrap.com/assets/images/fashion/product/59.jpg" className="rounded-circle" alt="..." /> */}
                                                                            <div className="bg-light" style={styles.avatarName}>{item.user.username.charAt(0)}</div>
                                                                        </div>
                                                                        <p className="font-weight-bold ml-2">{item.user.username}</p>
                                                                    </div>
                                                                    <div className="pl-5 mt-2 d-flex justify-content-between align-items-center">
                                                                        <p>{item.content}</p>
                                                                        <p>Ngày tạo: {moment(item.created_at).format("DD/MM/YYYY")}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                )
                                                :
                                                (
                                                    <p>Không có bình luận nào</p>
                                                )
                                        }
                                    </div>
                                </div>
                                <div>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </section>
        )
    }
}

export default connect(DetailsTopTabs, state => ({
    login: state.login,
    product: state.productHome
}), actions);