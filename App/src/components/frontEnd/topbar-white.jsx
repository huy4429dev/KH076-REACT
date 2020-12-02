import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { withTranslate } from 'react-redux-multilingual'

class TopBarWhite extends Component {

    render() {
        const { translate } = this.props;
        return (
            <div>
                <div className="top-header white-bg border-bottom-grey">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="header-contact">
                                    <ul>
                                        {/* <li>{('topbar_title', { theme_name: ' Multikart' })}</li> */}
                                        <li><i className="fa fa-phone" aria-hidden="true"></i>{('call_us')}:  123 - 456 - 7890</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 text-right">
                                <ul className="header-dropdown">
                                    <li className="mobile-wishlist compare-mobile"><Link to={`/compare`}><i className="fa fa-random" aria-hidden="true"></i>{translate('compare')}</Link></li>
                                    <li className="mobile-wishlist"><Link to={`/wishlist`}><i className="fa fa-heart" aria-hidden="true"></i>{translate('wishlist')}</Link></li>
                                    <li className="onhover-dropdown mobile-account">
                                        <i className="fa fa-user" aria-hidden="true"></i> {('my_account')}
                                        <ul className="onhover-show-div">
                                            <li>
                                                <Link to={`/pages/login`} data-lng="en">Đăng nhập</Link>
                                            </li>
                                            <li>
                                                <Link to={`/pages/register`} data-lng="en">Đăng ký</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default TopBarWhite;