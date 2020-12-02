import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import loadingImage from './../../assets/images/fb-loading.gif';

const styles = {
    full: {
        position: "fixed",
        zIndex: 100,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: " 100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: " rgb(0, 0, 0,0.1)",
    },
    loading: {
        top: "50%",
        left: "50%",
        position: "absolute",
        zIndex: "10000000",
        transform: "translate(-50%, -50%)"
    }
}
export default class Loading extends React.Component {
    render() {
        const { type, padding: pad, background, show, className, ...props } = this.props;
        const classes = classNames(className, {
            'page-loader': type == 'full',
            'card-loader': type == 'card',
            'box-loader': type == 'block',
            'inline-loader': type == 'inline'
        });

        let backgroundColor = background;

        if (!background) {
            if (type == 'full') backgroundColor = 'rgba(0,0,0,.1)';
            if (type == 'card') backgroundColor = 'rgba(0,0,0,.01)';
        }
        const padding = pad || (type == 'block' ? 60 : 10);

        if (show) {
            if (type == 'full') {
                return (
                    <div style={styles.full}>
                        <div className="loading-cls" style={styles.loading}>
                        </div>
                    </div>
                )
            }
            else if (type == 'card') {
                return (
                    <div className={classes} style={{ backgroundColor }}>
                        <svg viewBox="25 25 50 50">
                            <circle cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"></circle>
                        </svg>
                    </div>
                )
            }
            else if (type == 'block') {
                return (
                    <div className="loading-cls">
                    </div>
                )
            }
            else {
                return (
                    <img src={""} className={classes} style={{ padding }} />
                )
            }
        }
        return null;
    }
}

Loading.propTypes = {
    type: PropTypes.oneOf(['block', 'inline', 'card', 'full']),
    background: PropTypes.string,
    padding: PropTypes.number,
    show: PropTypes.bool
}

Loading.defaultProps = {
    type: 'block'
}