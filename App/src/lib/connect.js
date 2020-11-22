import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

export default (Component, mapStateToProps, actions) => {

    function mapDispatchToProps(dispatch) {
        if (actions) {
            return {
                actions: bindActionCreators(actions, dispatch)
            }
        }
        return null;
    }

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(Component)
}
