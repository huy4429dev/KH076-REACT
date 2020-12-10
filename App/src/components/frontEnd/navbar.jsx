import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { withTranslate } from 'react-redux-multilingual'''

class NavBar extends Component {
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

    openNav = () => {
        this.setState({ navClose: { right: '0px' } })
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
        // const { translate } = this.props;
        return (
            <div>
                <div className="main-navbar">
                    <div id="mainnav" >
                        {/* <div className="toggle-nav" onClick={this.openNav} >
                            <i className="fa fa-bars sidebar-bar"></i>
                        </div> */}
                        <ul className="nav-menu" style={this.state.navClose}>
                            <li className="back-btn" onClick={this.closeNav} >
                                <div className="mobile-back text-right">
                                    <span >Back</span>
                                    <i className="fa fa-angle-right pl-2" aria-hidden="true"></i>
                                </div>
                            </li>
                            <li >
                                <Link to="/" className="nav-link">
                                    {'Trang chủ'}
                                </Link>
                            </li>
                            <li >
                                <Link to="/shop" className="nav-link" >
                                    {'Sản Phẩm'}
                                </Link>
                            </li>
                            {/* <li >
                                <Link to="/product" className="nav-link">
                                    {'Sản phẩm'}
                                </Link>
                            </li> */}
                            <li >
                                <Link to="/blog" className="nav-link">
                                    {'Tin tức'}
                                </Link>
                            </li>
                            <li >
                                <Link to="/contact" className="nav-link">
                                    {'Liên hệ'}
                                </Link>
                            </li>
                            {/* <li >
                                <Link to="/about" className="nav-link">
                                    {'Giới thiệu'}
                                </Link>
                            </li> */}
                        </ul >
                    </div >
                </div >
            </div >
        )
    }
}
export default NavBar;

// export default withTranslate(NavBar);