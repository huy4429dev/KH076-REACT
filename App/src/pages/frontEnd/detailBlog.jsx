import React, { Component } from 'react';
import Breadcrumb from "./../../components/frontEnd/home/breadcrumb";
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/blog';
import Loading from './../../components/loadding2';
import moment from "moment";

class BlogDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({ loading: true });
        this.props.actions.getDetailBlog(id)
            .then(() => {
                this.setState({ loading: false })
            }).catch(() => this.setState({ loading: false }));
    }

    render() {
        const { detail } = this.props.blog;
        console.log(detail, "abc");
        return (
            <div>
                <Breadcrumb title={"Bài viết"} />
                {/*Blog Details section*/}
                <Loading show={this.state.loading} type="full" />
                <section className="blog-detail-page section-b-space">
                    {
                        detail && (
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 blog-detail">
                                        <img src={`https://react.pixelstrap.com/multikart/assets/images/about/about%20us.jpg`} className="img-fluid" alt="" />
                                        <h3>{detail.title}</h3>
                                        <ul className="post-social">
                                            <li>Đăng ngày {moment(detail?.created_at).format("d/MM/YYYY")}</li>
                                            <li>Đăng bởi : {detail.user.username}</li>
                                            {/* <li><i className="fa fa-heart"></i> 5 Hits</li>
                                    <li><i className="fa fa-comments"></i> 10 Comment</li> */}
                                        </ul>
                                        <div>
                                            <div dangerouslySetInnerHTML={{ __html: detail.content }} />
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="row section-b-space">
                            <div className="col-sm-12">
                                <ul className="comment-section">
                                    <li>
                                        <div className="media">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/avtar.jpg`} alt="Generic placeholder image" />
                                            <div className="media-body">
                                                <h6>Mark Jecno <span>( 12 Jannuary 2018 at 1:30AM )</span></h6>
                                                <p>Donec rhoncus massa quis nibh imperdiet dictum. Vestibulum id est
                                                sit amet felis fringilla bibendum at at leo. Proin molestie ac
                                                nisi eu laoreet. Integer faucibus enim nec ullamcorper tempor.
                                                Aenean nec felis dui. Integer tristique odio mi, in volutpat
                                                metus posuere eu. Aenean suscipit ipsum nunc, id volutpat lorem
                                                hendrerit ac. Sed id elit quam. In ac mauris arcu. Praesent eget
                                                lectus sit amet diam vestibulum varius. Suspendisse dignissim
                                                mattis leo, nec facilisis erat tempor quis. Vestibulum eu
                                                        vestibulum ex. </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="media">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/2.jpg`} alt="Generic placeholder image" />
                                            <div className="media-body">
                                                <h6>Mark Jecno <span>( 12 Jannuary 2018 at 1:30AM )</span></h6>
                                                <p>Donec rhoncus massa quis nibh imperdiet dictum. Vestibulum id est
                                                sit amet felis fringilla bibendum at at leo. Proin molestie ac
                                                nisi eu laoreet. Integer faucibus enim nec ullamcorper tempor.
                                                Aenean nec felis dui. Integer tristique odio mi, in volutpat
                                                metus posuere eu. Aenean suscipit ipsum nunc, id volutpat lorem
                                                hendrerit ac. Sed id elit quam. In ac mauris arcu. Praesent eget
                                                lectus sit amet diam vestibulum varius. Suspendisse dignissim
                                                mattis leo, nec facilisis erat tempor quis. Vestibulum eu
                                                        vestibulum ex. </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="media">
                                            <img src={`${process.env.PUBLIC_URL}/assets/images/20.jpg`} alt="Generic placeholder image" />
                                            <div className="media-body">
                                                <h6>Mark Jecno <span>( 12 Jannuary 2018 at 1:30AM )</span></h6>
                                                <p>Donec rhoncus massa quis nibh imperdiet dictum. Vestibulum id est
                                                sit amet felis fringilla bibendum at at leo. Proin molestie ac
                                                nisi eu laoreet. Integer faucibus enim nec ullamcorper tempor.
                                                Aenean nec felis dui. Integer tristique odio mi, in volutpat
                                                metus posuere eu. Aenean suscipit ipsum nunc, id volutpat lorem
                                                hendrerit ac. Sed id elit quam. In ac mauris arcu. Praesent eget
                                                lectus sit amet diam vestibulum varius. Suspendisse dignissim
                                                mattis leo, nec facilisis erat tempor quis. Vestibulum eu
                                                        vestibulum ex. </p>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div> */}
                                {/* <div className="row blog-contact">
                            <div className="col-sm-12">
                                <h2>Leave Your Comment</h2>
                                <form className="theme-form">
                                    <div className="form-row">
                                        <div className="col-md-12">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" className="form-control" id="name"
                                                placeholder="Enter Your name" required="" />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" id="email" placeholder="Email"
                                                required="" />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="exampleFormControlTextarea1">Comment</label>
                                            <textarea className="form-control" placeholder="Write Your Comment"
                                                id="exampleFormControlTextarea1" rows="6"></textarea>
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-solid" type="submit">Post Comment</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div> */}
                            </div>
                        )
                    }
                </section>
            </div>
        )
    }
}

export default connect(BlogDetails, state => ({
    blog: state.blogHome
}), actions);