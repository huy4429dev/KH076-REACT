import React, { Component } from 'react'
import * as actions from './../../actions/frontEnd/login';
import connect from './../../lib/connect';
var APP_ID = '3280772448608779';
var SDK_VERSION = 'v6.0';


class Facebook extends Component {

    componentDidMount() {
        // Load the SDK asynchronously
        if (!document.getElementById('facebook-jssdk')) {
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/vi_VN/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
        if (!window.fbAsyncInit) {
            window.fbAsyncInit = () => {
                window.FB.init({
                    appId: APP_ID.toLowerCase(),
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: SDK_VERSION.toLowerCase()
                });

                this.checkLoginState();
            };
        } else {
            window.FB.XFBML.parse();
            this.checkLoginState();
        }
    }

    // Kiểm tra trạng thái đăng nhập
    checkLoginState() {
        console.log('checking facebook login state')
        window.FB.getLoginStatus(response => {
            if (response.status === 'connected' && response.authResponse.accessToken) {
            }
            else {
            }
        });
    }
    login = () => {
        const { loginFacebook } = this.props.actions;
        window.FB.login(response => {
            if (response.status === 'connected' && response.authResponse.accessToken) {
                // window.notify("Đăng nhập thành công");
                console.log(response);
                window.FB.api(
                    response.authResponse.userID,
                    function (response) {
                        if (response && !response.error) {
                            loginFacebook({ ...response, role: "user" }).then(data => {
                                if (data.user && data.token) {
                                    window.notify("Đăng nhập thành công");
                                } else {
                                    window.notify("Đăng nhập không thành công", "danger");
                                }
                            }).catch(err => window.notify("Đăng nhập không thành công", "danger"));
                        }
                    }
                );
                // this.props.actions.loginFacebook();
                // this.props.actions.getList()
                //     .then(data => {
                //         this.props.actions.checkConnectPagesForMergePages(data);
                //     })
                //     .catch(() => console.log("loi get danh sach pages"));
                // lấy danh sách trang và cho người dùng chọn trang
                // this.props.actions.getConnectedPages({
                //     userId: response.authResponse.userID,
                //     accessToken: response.authResponse.accessToken
                // })
                //     .then(data => {
                //         if (data.connectedPages.length > 1) {
                //             this.setState({
                //                 showChoosingBox: true,
                //                 userId: data.userId,
                //                 accessToken: response.authResponse.accessToken,
                //                 userName: data.userName,
                //                 connectedPages: data.connectedPages,
                //                 checkedPages: data.connectedPages.map(item => item.pageId)
                //             })
                //         }
                //         else {
                //             this.setState({
                //                 userId: data.userId,
                //                 accessToken: response.authResponse.accessToken,
                //                 userName: data.userName,
                //                 connectedPages: data.connectedPages,
                //                 checkedPages: data.connectedPages.map(item => item.pageId)
                //             }, this.updatePage)
                //         }
                //     })
                //     .catch((error) => {
                //         alert('Đăng nhập và cấp quyền lỗi', error.message)
                //         this.setState({ updating: false })
                //         console.warn(error)
                //     })
            }
            else {
                console.log('Đăng nhập facebook không thành công', response)
            }
        });
    }
    render() {
        console.log(this.props, "dsda");
        return (
            <div>
                <div className="btn text-white ml-2" style={{ background: "#007bff" }} onClick={this.login}>Facebook</div>
            </div>
        )
    }
}

export default connect(Facebook, state => ({

}), actions);