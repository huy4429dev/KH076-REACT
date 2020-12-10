import React, { Component } from 'react'
import connect from './../../lib/connect';
import * as actions from './../../actions/frontEnd/product';
import Loading from './../../components/loadding2';
import { debounce, } from "lodash";
import { Link } from 'react-router-dom';
import queryString from 'query-string';

const styles = {
    card: {
        position: "absolute",
        top: "72px",
        right: 0,
        minWidth: "30rem",
        boxShadow: "0 4px 5px rgba(0,0,0,0.19)",
        transition: "all .2s ease-in-out",
        animation: "animationComponent 0.2s",
        transformOrigin: "top right",
        zIndex: "10000",
        backgroundColor: "white",
        borderRadius: "4px",
        height: "auto"
    },
    item: {
        cursor: "pointer",
    },
    imgBox: {
        width: "50px",
        height: "50px",
        borderRadius: "4px",
        overflow: "hidden",
        cursor: "pointer",
        marginRight: "0.5rem",
    },
    img: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    }
}
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            products: [],
            filter: {
                search: "",
            }
        }
        this.insideContainer = React.createRef();
        this.search = debounce(this.search, 1000);
    }
    componentDidMount() {
        document.querySelector('body').addEventListener("click", this.handleClick, false);
    }
    componentWillUnmount() {
        document.querySelector('body').removeEventListener("click", this.handleClick, false);
    }
    handleClick = (e) => {
        if (this.insideContainer.current && !this.insideContainer.current.contains(e.target)) {
            e.preventDefault();
            e.stopPropagation();
            this.props.hide();
        }
    };
    change = (e) => {
        this.setState({
            filter: {
                ...this.state.filter,
                [e.target.name]: e.target.value,
            }
        }, () => {
            this.search();
        })
    }
    search = () => {
        if (this.state.filter.search) {
            this.setState({ loading: true });
            const param = queryString.stringify(this.state.filter);
            this.props.actions.search(param)
                .then((data) => {
                    this.setState({ loading: false });
                    if (data.success) {
                        this.setState({ products: data.data.items })
                    }
                })
                .catch(() => this.setState({ loading: true }));
        } else {
            this.setState({ products: [] })
        }

    }
    render() {
        const { loading, products, filter } = this.state;
        const { show } = this.props;
        if (show) {
            return (
                <div ref={this.insideContainer}
                    className=""
                    style={styles.card}
                >
                    <h6 className="text-center text-dark">Tìm kiếm sản phẩm</h6>
                    <Loading type="card" show={loading} />
                    {/* <div id="search-overlay" className="search-overlay"> */}
                    <div>
                        <div className="overlay-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input
                                                value={filter.search}
                                                name="search"
                                                onChange={(e) => this.change(e)}
                                                type="text" className="form-control"
                                                placeholder="Tìm kiếm sản phẩm..."
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        {
                                            !loading && products.length > 0 && products.map((item, index) => {
                                                return (
                                                    <Link to={`/product/${item.id}`}>
                                                        <div key={index} className="d-flex mb-1" style={styles.item}>
                                                            <div style={styles.imgBox}>
                                                                <img src={item.images[0].url} style={styles.img} />
                                                            </div>
                                                            <div>
                                                                <h6>{item.name}  </h6>
                                                            </div>
                                                        </div>
                                                    </Link>

                                                )
                                            })

                                        }
                                        {
                                            (!loading && products.length == 0 && filter.search) &&
                                            <div className="d-flex justify-content-center w-100">
                                                <p >Không tìm thấy sản phẩm nào</p>
                                            </div>

                                        }
                                        <div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div >)
        } else {
            return null;
        }
    }
}
export default connect(Search, state => ({
    product: state.productHome
}), actions);