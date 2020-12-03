import React, { Component } from 'react';
import TopBar from './../../../components/frontEnd/topbar';
import LogoImage from './../../../components/frontEnd/logo';
import NavBar from './../../../components/frontEnd/navbar';
import CartContainer from './../../../components/frontEnd/cart';
import SideBar from './../../../components/frontEnd/sidebar';
import { Link } from 'react-router-dom';
import SiderBar from './../../../components/frontEnd/sidebar';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navClose: { right: '0px' }
        }
    }
    componentWillMount() {
        if (window.innerWidth < 750) {
            this.setState({ navClose: { right: '-410px' } })
        }
        if (window.innerWidth < 1199) {
            this.setState({ navClose: { right: '-300px' } })
        }
    }
    changeLanguage = () => {

    }
    openNav = () => {
        this.setState({ navClose: { right: '410px' } })
    }
    closeNav = () => {
        this.setState({ navClose: { right: '-410px' } })
    }
    onMouseEnterHandler() {
        if (window.innerWidth > 1199) {
            document.querySelector("#main-menu").classList.add("hover-unset");
        }
    }

    handleSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if (event.target.nextElementSibling.classList.contains('opensubmenu'))
            event.target.nextElementSibling.classList.remove('opensubmenu')
        else {
            document.querySelectorAll('.nav-submenu').forEach(function (value) {
                value.classList.remove('opensubmenu');
            });
            document.querySelector('.mega-menu-container').classList.remove('opensubmenu')
            event.target.nextElementSibling.classList.add('opensubmenu')
        }
    }

    handleMegaSubmenu = (event) => {
        if (event.target.classList.contains('sub-arrow'))
            return;

        if (event.target.parentNode.nextElementSibling.classList.contains('opensubmegamenu'))
            event.target.parentNode.nextElementSibling.classList.remove('opensubmegamenu')
        else {
            document.querySelectorAll('.menu-content').forEach(function (value) {
                value.classList.remove('opensubmegamenu');
            });
            event.target.parentNode.nextElementSibling.classList.add('opensubmegamenu')
        }
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
                                            <SiderBar />


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
                                                    {/* <li className="onhover-div mobile-setting">
                                                        <div><img src={`${process.env.PUBLIC_URL}/assets/images/icon/setting.png`} className="img-fluid" alt="" />
                                                            <i className="fa fa-cog"></i></div>
                                                        <div className="show-div setting">
                                                            <h6>language</h6>
                                                         
                                                        </div>
                                                    </li> */}
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