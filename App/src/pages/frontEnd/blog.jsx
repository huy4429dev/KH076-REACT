import React, { Component } from 'react';
import Breadcrumb from "./../../components/frontEnd/home/breadcrumb";
import { Link } from 'react-router-dom';
import Loading from './../../components/loadding2';
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/blog';
import moment from 'moment';

class Blog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.setState({ loading: true });
        Promise.all([
            this.props.actions.getList(),
            this.props.actions.getRecent()
        ]).then(ok => this.setState({ loading: false }))
            .catch(er => this.setState({ loading: false }))
    }

    render() {
        const { items, recent } = this.props.blog;
        return (
            <div>
                <Breadcrumb title={'Bài viết'} />
                <Loading show={this.state.loading} type="full" />
                {/*Blog Right Sidebar section*/}
                <section className="section-b-space  blog-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-8 col-md-7 ">
                                {
                                    items.length > 0 && items.map((item, index) => {
                                        return (
                                            <div className="row blog-media" key={index}>
                                                <div className="col-xl-6">
                                                    <div className="blog-left">
                                                        <Link to={`/blog/${item.id}`} >
                                                            <img src={item.image} className="img-fluid" alt=""
                                                                style={{ width: "100%", maxHeight: "290px" }}
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6">
                                                    <div className="blog-right">
                                                        <div>
                                                            <h6>Đăng ngày:{moment(item.created_at).format('d/MM/YYYY')}</h6>
                                                            <Link to={`/blog/${item.id}`} >
                                                                <h4>
                                                                    {item.title}
                                                                </h4>
                                                            </Link>
                                                            <ul className="post-social">
                                                                <li>Đăng bởi : {item.user.username}</li>
                                                                {/* <li><i className="fa fa-heart"></i> 5 Hits</li>
                                                                <li><i className="fa fa-comments"></i> 10 Comment</li> */}
                                                            </ul>
                                                            <p>{item.disception}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>



                            <div className="col-xl-3 col-lg-4 col-md-5">
                                <div className="blog-sidebar">
                                    <div className="theme-card">
                                        <h4>Bài viết hiện tại</h4>
                                        <ul className="recent-blog">
                                            {
                                                recent.length > 0 && recent.map((item, index) => {
                                                    return (
                                                        <Link to={`/blog/${item.id}`} key={index}>
                                                            <li key={index}>
                                                                <div className="media">
                                                                    <img className="img-fluid" src={item.image} alt="Generic placeholder image" />
                                                                    <div className="media-body align-self-center">
                                                                        <h6>{moment(item.created_at).format('d//MM/YYYY')}</h6>
                                                                        <p className="text-truncate" style={{ maxWidth: "80px" }}>{item.title}</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    {/* <div className="theme-card">
                                        <h4>Popular Blog</h4>
                                        <ul className="popular-blog">
                                            <li>
                                                <div className="media">
                                                    <div className="blog-date">
                                                        <span>03 </span>
                                                        <span>may</span>
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <h6>Injected humour the like</h6>
                                                        <p>0 hits</p>
                                                    </div>
                                                </div>
                                                <p>it look like readable English. Many desktop publishing text. </p>
                                            </li>
                                            <li>
                                                <div className="media">
                                                    <div className="blog-date">
                                                        <span>03 </span>
                                                        <span>may</span>
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <h6>Injected humour the like</h6>
                                                        <p>0 hits</p>
                                                    </div>
                                                </div>
                                                <p>it look like readable English. Many desktop publishing text. </p>
                                            </li>
                                            <li>
                                                <div className="media">
                                                    <div className="blog-date">
                                                        <span>03 </span>
                                                        <span>may</span>
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <h6>Injected humour the like</h6>
                                                        <p>0 hits</p>
                                                    </div>
                                                </div>
                                                <p>it look like readable English. Many desktop publishing text. </p>
                                            </li>
                                            <li>
                                                <div className="media">
                                                    <div className="blog-date">
                                                        <span>03 </span>
                                                        <span>may</span>
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <h6>Injected humour the like</h6>
                                                        <p>0 hits</p>
                                                    </div>
                                                </div>
                                                <p>it look like readable English. Many desktop publishing text. </p>
                                            </li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </div>
        )
    }
}

export default connect(Blog, state => ({
    blog: state.blogHome
}), actions)