import React, { Component } from 'react';
import TopBar from './../../../components/frontEnd/topbar';
import LogoImage from './../../../components/frontEnd/logo';
import NavBar from './../../../components/frontEnd/navbar';
import CartContainer from './../../../components/frontEnd/cart-header';
import SideBar from './../../../components/frontEnd/sidebar';

class Header extends Component {
    changeLanguage = () => {

    }
    render() {
        return (
            <div>
                <header id="sticky" className="sticky">
                    {/* {this.state.isLoading ? <Pace color="#27ae60" /> : null} */}
                    <div className="mobile-fix-option"></div>
                    {/*Top Header Component*/}
                    <TopBar />

                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="main-menu">
                                    <div className="menu-left">
                                        <div className="navbar">
                                            <a href="javascript:void(0)" onClick={this.openNav}>
                                                <div className="bar-style"> <i className="fa fa-bars sidebar-bar" aria-hidden="true"></i></div>
                                            </a>
                                            {/*SideBar Navigation Component*/}
                                            <SideBar />
                                        </div>
                                        <div className="brand-logo">
                                            <LogoImage logo={this.props.logoName} />
                                        </div>
                                    </div>
                                    <div className="menu-right pull-right">
                                        {/*Top Navigation Bar Component*/}
                                        <NavBar />

                                        <div>
                                            <div className="icon-nav">
                                                <ul>
                                                    <li className="onhover-div mobile-search">
                                                        <div><img src={`${process.env.PUBLIC_URL}/assets/images/icon/search.png`} onClick={this.openSearch} className="img-fluid" alt="" />
                                                            <i className="fa fa-search" onClick={this.openSearch}></i></div>
                                                    </li>
                                                    <li className="onhover-div mobile-setting">
                                                        <div><img src={`${process.env.PUBLIC_URL}/assets/images/icon/setting.png`} className="img-fluid" alt="" />
                                                            <i className="fa fa-cog"></i></div>
                                                        <div className="show-div setting">
                                                            <h6>language</h6>
                                                            {/* <ul>
                                                                <li><a href={null} onClick={() => this.changeLanguage('en')}>English</a> </li>
                                                                <li><a href={null} onClick={() => this.changeLanguage('fn')}>French</a> </li>
                                                            </ul>
                                                            <h6>currency</h6>
                                                            <ul className="list-inline">
                                                                <li><a href={null} onClick={() => this.props.changeCurrency('€')}>euro</a> </li>
                                                                <li><a href={null} onClick={() => this.props.changeCurrency('₹')}>rupees</a> </li>
                                                                <li><a href={null} onClick={() => this.props.changeCurrency('£')}>pound</a> </li>
                                                                <li><a href={null} onClick={() => this.props.changeCurrency('$')}>doller</a> </li>
                                                            </ul> */}
                                                        </div>
                                                    </li>
                                                    {/*Header Cart Component */}
                                                    <CartContainer />
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div id="search-overlay" className="search-overlay">
                    <div>
                        <span className="closebtn" onClick={this.closeSearch} title="Close Overlay">×</span>
                        <div className="overlay-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <form>
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Search a Product" />
                                            </div>
                                            <button type="submit" className="btn btn-primary"><i className="fa fa-search"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default Header;