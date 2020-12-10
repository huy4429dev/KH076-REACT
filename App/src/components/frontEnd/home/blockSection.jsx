import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import connect from './../../../lib/connect';
import * as actions from './../../../actions/frontEnd/blog';
import { Slider3 } from "./../../../services/script"
import moment from 'moment';

class BlogSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        Promise.all([
            this.props.actions.getList(),
        ])
    }
    render() {
        const { items } = this.props.blog;
        const settings = {
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        console.log(items, "adsakj");
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Slider {...settings} className="slide-3 no-arrow ">
                            {
                                items.length > 0 && items.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="col-md-4">
                                                <Link to={`/blog/${item.id}`} >
                                                    <div className="classic-effect">
                                                        <img src={item.image} className="img-fluid" alt="" />
                                                        <span></span>
                                                    </div>
                                                </Link>
                                                <div className="blog-details">
                                                    <h4>{moment(item.created_at).format('d//MM/YYYY')}</h4>
                                                    <Link to={`/blog/${item.id}`} >
                                                        <p>{item.title}</p></Link>
                                                    <hr className="style1" />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(BlogSection, state => ({
    blog: state.blogHome
}), actions);